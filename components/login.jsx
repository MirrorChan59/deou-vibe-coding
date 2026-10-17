/* 登录页 + 会话管理
 * 后端为 Cloudflare Pages Function: functions/api/login.js
 * 账号数据来自飞书多维表格（由老师录入）
 */

const SESSION_KEY = 'vibe-coding-session';

function parseSessionToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload || !payload.u || !payload.exp) return null;
    if (Date.now() > payload.exp) return null; // 已过期
    return payload;
  } catch (e) {
    return null;
  }
}

function getValidSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session || !session.token) return null;
    const payload = parseSessionToken(session.token);
    if (!payload) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch (e) {
    return null;
  }
}

function saveSession(session) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) {}
}

function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
}

function LoginPage({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPwd, setShowPwd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const doLogin = async () => {
    const u = username.trim();
    if (!u || !password) {
      setError('请输入账号和密码');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password }),
      });
      const result = await resp.json().catch(() => ({}));
      if (!resp.ok || !result.ok) {
        setError(result.message || '登录失败，请稍后重试');
        setLoading(false);
        return;
      }
      const session = { token: result.token, user: u, name: result.name || u };
      saveSession(session);
      onLogin(session);
    } catch (e) {
      setError('网络异常，请检查网络后重试');
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) doLogin();
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-brand">
          <img src="assets/logo.jpg" alt="得欧 IDO" className="login-logo" />
          <div className="login-brand-text">
            <span className="login-brand-name">得欧 Vibe Coding</span>
            <span className="login-brand-sub">创意梳理工作台</span>
          </div>
        </div>

        <h1 className="login-title">同学，欢迎回来 👋</h1>
        <p className="login-subtitle">使用老师发放的账号密码登录，开始梳理你的创意</p>

        <div className="login-field">
          <label className="login-label">账号</label>
          <input
            className="login-input"
            type="text"
            placeholder="请输入老师发放的账号"
            value={username}
            autoFocus
            autoComplete="username"
            onChange={e => setUsername(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>

        <div className="login-field">
          <label className="login-label">密码</label>
          <div className="login-pwd-row">
            <input
              className="login-input"
              type={showPwd ? 'text' : 'password'}
              placeholder="请输入密码"
              value={password}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              type="button"
              className="login-pwd-toggle"
              onClick={() => setShowPwd(!showPwd)}
              tabIndex={-1}
            >
              {showPwd ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        {error && <div className="login-error">⚠️ {error}</div>}

        <button
          className="btn btn-primary login-submit"
          disabled={loading}
          onClick={doLogin}
        >
          {loading ? '登录中…' : '登 录'}
        </button>

        <div className="login-tip">
          还没有账号？请联系老师获取
        </div>
      </div>
    </div>
  );
}
