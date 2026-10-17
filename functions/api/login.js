/**
 * 登录校验接口 · Cloudflare Pages Function
 * 路由: POST /api/login  body: { username, password }
 *
 * 需要在 Cloudflare Pages 项目的环境变量中配置：
 *   FEISHU_APP_ID      飞书自建应用 App ID
 *   FEISHU_APP_SECRET  飞书自建应用 App Secret
 *   AUTH_SECRET        会话签名密钥（任意足够长的随机字符串）
 * 可选（已内置默认值，对应老师的学生账号表）：
 *   BASE_TOKEN         多维表格 app_token
 *   TABLE_ID           数据表 table_id
 *
 * 多维表格字段约定：账号(文本) / 密码(文本) / 姓名(文本) / 状态(单选: 启用|停用)
 */

const DEFAULT_BASE_TOKEN = 'QSyHbnLnXaWlKZsESrKcQzS2ndd';
const DEFAULT_TABLE_ID = 'tbloJteApNNCEh91';
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 会话 7 天有效

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function textOf(cell) {
  // 文本字段在 API 里可能是字符串或富文本片段数组
  if (cell == null) return '';
  if (typeof cell === 'string') return cell;
  if (Array.isArray(cell)) return cell.map(seg => (seg && seg.text) || '').join('');
  return String(cell);
}

function selectOf(cell) {
  if (cell == null) return '';
  if (typeof cell === 'string') return cell;
  if (Array.isArray(cell)) return cell.join(',');
  return String(cell);
}

function base64url(str) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmacHex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
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

async function findAccount(token, baseToken, tableId, username) {
  // 多维表格 API 文本 is 匹配为精确匹配；账号统一按小写录入与比较
  const body = {
    filter: {
      conjunction: 'and',
      conditions: [{ field_name: '账号', operator: 'is', value: [username] }],
    },
    page_size: 5,
  };
  const resp = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${baseToken}/tables/${tableId}/records/search`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify(body),
    }
  );
  const data = await resp.json();
  if (data.code !== 0) {
    throw new Error('读取账号表失败（' + (data.msg || data.code) + '）');
  }
  const items = (data.data && data.data.items) || [];
  return items.length ? items[0].fields : null;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.FEISHU_APP_ID || !env.FEISHU_APP_SECRET || !env.AUTH_SECRET) {
    return json({ ok: false, message: '登录服务未配置完成，请联系老师' }, 500);
  }
  const baseToken = env.BASE_TOKEN || DEFAULT_BASE_TOKEN;
  const tableId = env.TABLE_ID || DEFAULT_TABLE_ID;

  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return json({ ok: false, message: '请求格式错误' }, 400);
  }
  const username = String(payload.username || '').trim();
  const password = String(payload.password || '');
  if (!username || !password) {
    return json({ ok: false, message: '请输入账号和密码' }, 400);
  }

  try {
    const token = await getTenantToken(env.FEISHU_APP_ID, env.FEISHU_APP_SECRET);
    const fields = await findAccount(token, baseToken, tableId, username);
    if (!fields) {
      return json({ ok: false, message: '账号不存在，请核对后重试' }, 401);
    }
    if (selectOf(fields['状态']) === '停用') {
      return json({ ok: false, message: '该账号已被停用，请联系老师' }, 403);
    }
    if (textOf(fields['密码']) !== password) {
      return json({ ok: false, message: '密码不正确，请重试' }, 401);
    }

    const name = textOf(fields['姓名']) || username;
    const sessionPayload = base64url(JSON.stringify({ u: username, n: name, exp: Date.now() + TOKEN_TTL_MS }));
    const signature = await hmacHex(env.AUTH_SECRET, sessionPayload);
    return json({ ok: true, token: sessionPayload + '.' + signature, name });
  } catch (e) {
    return json({ ok: false, message: '登录服务异常：' + e.message }, 500);
  }
}

export async function onRequestGet() {
  return json({ ok: false, message: 'Method Not Allowed' }, 405);
}
