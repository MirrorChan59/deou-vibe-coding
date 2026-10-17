/**
 * 创意方案上报接口 · Cloudflare Pages Function
 * 路由: POST /api/submit  body: { token, projectName, categories, score, markdown }
 *
 * 学生在第 6 步点击「提交给老师」时调用：
 *   1. 校验 /api/login 签发的会话 token（HMAC 签名 + 有效期）
 *   2. 把创意方案写入「学生创意方案」数据表，老师在多维表格中统一查看
 *
 * 需要的环境变量（与 /api/login 相同）：
 *   FEISHU_APP_ID / FEISHU_APP_SECRET / AUTH_SECRET
 * 可选（已内置默认值，对应老师的多维表格）：
 *   BASE_TOKEN          多维表格 app_token
 *   SUBMIT_TABLE_ID     「学生创意方案」数据表 table_id
 *
 * 注意：飞书自建应用需要开通多维表格「读写」权限（bitable:app），
 * 仅只读权限（bitable:app:readonly）会导致写入失败。
 */

const DEFAULT_BASE_TOKEN = 'QSyHbnLnXaWlKZsESrKcQzS2ndd';
const DEFAULT_SUBMIT_TABLE_ID = 'tbl6Em4qndmPCIl9';
const MAX_MARKDOWN_LEN = 90000; // 多维表格文本字段安全上限内的保守值

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

async function hmacHex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function parseTokenPayload(token) {
  try {
    const parts = String(token || '').split('.');
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
    const payload = JSON.parse(decodeURIComponent(escape(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))));
    if (!payload || !payload.u || !payload.exp) return null;
    return { payload, signingInput: parts[0], signature: parts[1] };
  } catch (e) {
    return null;
  }
}

async function verifySessionToken(token, secret) {
  const parsed = parseTokenPayload(token);
  if (!parsed) return null;
  const expected = await hmacHex(secret, parsed.signingInput);
  // 长度一致时做常量时间比较，避免时序侧信道
  if (expected.length !== parsed.signature.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ parsed.signature.charCodeAt(i);
  }
  if (diff !== 0) return null;
  if (Date.now() > parsed.payload.exp) return null;
  return parsed.payload; // { u: 账号, n: 姓名, exp }
}

async function getTenantToken(appId, appSecret) {
  const resp = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  const data = await resp.json();
  if (data.code !== 0 || !data.tenant_access_token) {
    throw new Error('飞书应用凭证校验失败（' + (data.msg || 'unknown') + '）');
  }
  return data.tenant_access_token;
}

async function createSubmissionRecord(token, baseToken, tableId, fields) {
  const resp = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${baseToken}/tables/${tableId}/records`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ fields }),
    }
  );
  const data = await resp.json();
  if (data.code !== 0) {
    throw new Error('写入方案表失败（' + (data.msg || data.code) + '）');
  }
  return data.data && data.data.record;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.FEISHU_APP_ID || !env.FEISHU_APP_SECRET || !env.AUTH_SECRET) {
    return json({ ok: false, message: '提交服务未配置完成，请联系老师' }, 500);
  }
  const baseToken = env.BASE_TOKEN || DEFAULT_BASE_TOKEN;
  const tableId = env.SUBMIT_TABLE_ID || DEFAULT_SUBMIT_TABLE_ID;

  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return json({ ok: false, message: '请求格式错误' }, 400);
  }

  const session = await verifySessionToken(payload.token, env.AUTH_SECRET);
  if (!session) {
    return json({ ok: false, message: '登录已过期，请退出后重新登录再提交' }, 401);
  }

  const projectName = String(payload.projectName || '未命名项目').slice(0, 200);
  const categories = String(payload.categories || '').slice(0, 200);
  const score = Number(payload.score);
  const markdown = String(payload.markdown || '');
  if (!markdown.trim()) {
    return json({ ok: false, message: '方案内容为空，请先完善各步骤内容再提交' }, 400);
  }

  try {
    const tenantToken = await getTenantToken(env.FEISHU_APP_ID, env.FEISHU_APP_SECRET);
    await createSubmissionRecord(tenantToken, baseToken, tableId, {
      '项目名称': projectName,
      '姓名': session.n || session.u,
      '账号': session.u,
      '综合评分': Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : null,
      '项目类型': categories,
      '创意方案': markdown.slice(0, MAX_MARKDOWN_LEN),
    });
    return json({ ok: true, message: '已提交给老师' });
  } catch (e) {
    return json({ ok: false, message: '提交服务异常：' + e.message }, 500);
  }
}

export async function onRequestGet() {
  return json({ ok: false, message: 'Method Not Allowed' }, 405);
}
