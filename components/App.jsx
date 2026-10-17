/*EDITMODE-BEGIN*/
const TWEAK_DEFAULTS = {
  "primaryColor": "#1E5FE0",
  "theme": "paper",
  "handwritingFont": true,
  "stickyRotation": true
}
/*EDITMODE-END*/

const STEPS = [
  { id: 1, label: '灵感起源', desc: '你的创意种子', icon: '💡' },
  { id: 2, label: '用户画像', desc: '谁会用你的产品', icon: '👤' },
  { id: 3, label: '商业调研', desc: '验证需求与市场', icon: '🔍' },
  { id: 4, label: '核心功能', desc: '产品能做什么', icon: '✨' },
  { id: 5, label: '方案评分', desc: '自检创意质量', icon: '📊' },
  { id: 6, label: '创意输出', desc: '生成完整方案', icon: '📝' },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [data, setData] = React.useState(() => {
    try {
      const saved = localStorage.getItem('vibe-coding-idea-data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      projectName: '',
      problem: '',
      inspiration: '',
      categories: [],
      userTypes: [],
      targetUser: '',
      scenario: '',
      userPain: '',
      features: [{ id: 1, name: '', desc: '', mvp: true }],
      valueProp: '',
      researchMethods: [],
      researchNotes: '',
      competitorAnalysis: '',
      marketSize: '',
    };
  });

  // 自动保存到 localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem('vibe-coding-idea-data', JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  // 应用主题色
  React.useEffect(() => {
    document.documentElement.style.setProperty('--blue', t.primaryColor);
    // 调整衍生色
    const hex = t.primaryColor;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const soft = `rgba(${r}, ${g}, ${b}, 0.4)`;
    const faint = `rgba(${r}, ${g}, ${b}, 0.12)`;
    document.documentElement.style.setProperty('--blue-soft', soft);
    document.documentElement.style.setProperty('--blue-faint', faint);
  }, [t.primaryColor]);

  // 应用主题
  React.useEffect(() => {
    if (t.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [t.theme]);

  // 计算完成进度
  const getCompletedSteps = () => {
    const completed = [];
    if (data.projectName || data.problem) completed.push(1);
    if ((data.userTypes || []).length || data.targetUser) completed.push(2);
    if ((data.researchMethods || []).length || data.researchNotes || data.competitorAnalysis) completed.push(3);
    if ((data.features || []).some(f => f.name)) completed.push(4);
    return completed;
  };

  const completedSteps = getCompletedSteps();
  const progress = Math.round((completedSteps.length / 5) * 100);

  // 案例库抽屉
  const [caseDrawerOpen, setCaseDrawerOpen] = React.useState(false);

  const goNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepIdea data={data} setData={setData} />;
      case 2: return <StepAudience data={data} setData={setData} />;
      case 3: return <StepResearch data={data} setData={setData} />;
      case 4: return <StepFeatures data={data} setData={setData} />;
      case 5: return <StepScoring data={data} />;
      case 6: return <StepOutput data={data} />;
      default: return null;
    }
  };

  const resetAll = () => {
    if (confirm('确定要重置所有内容吗？当前填写的信息将会丢失。')) {
      setData({
        projectName: '',
        problem: '',
        inspiration: '',
        categories: [],
        userTypes: [],
        targetUser: '',
        scenario: '',
        userPain: '',
        features: [{ id: 1, name: '', desc: '', mvp: true }],
        valueProp: '',
      });
      setCurrentStep(1);
    }
  };

  return (
    <div className="app-container">
      {/* 侧边栏 */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="assets/logo.jpg" alt="得欧 IDO" className="sidebar-logo-img" />
            <div className="sidebar-logo-text">
              <span className="sidebar-logo-brand">得欧</span>
              <span className="sidebar-logo-en">Vibe Coding</span>
            </div>
          </div>
          <div className="sidebar-title">创意梳理工作台</div>
        </div>

        <nav className="step-list">
          {STEPS.map(step => (
            <div
              key={step.id}
              className={`step-item ${currentStep === step.id ? 'active' : ''} ${completedSteps.includes(step.id) ? 'completed' : ''}`}
              onClick={() => {
                setCurrentStep(step.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="step-num">
                {completedSteps.includes(step.id) ? '✓' : step.id}
              </div>
              <div className="step-text">
                <div className="step-label">{step.label}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="progress-label">
            <span>完成进度</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div style={{
            marginTop: 16,
            fontSize: '12px',
            color: 'var(--ink-faint)',
            textAlign: 'center',
            padding: '8px',
            background: 'var(--paper)',
            borderRadius: 6,
            border: '1px dashed var(--line)'
          }}>
            💾 自动保存到本地
          </div>
          <button
            onClick={resetAll}
            style={{
              marginTop: 12,
              width: '100%',
              padding: '8px',
              background: 'transparent',
              border: '1px solid var(--line)',
              borderRadius: 6,
              color: 'var(--ink-faint)',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--coral)';
              e.target.style.borderColor = 'var(--coral)';
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--ink-faint)';
              e.target.style.borderColor = 'var(--line)';
            }}
          >
            重置所有内容
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="main-content">
        {renderStep()}

        {/* 底部导航按钮 */}
        <div className="btn-row">
          <button
            className="btn btn-secondary"
            onClick={goPrev}
            disabled={currentStep === 1}
          >
            ← 上一步
          </button>
          {currentStep < STEPS.length ? (
            <button className="btn btn-primary" onClick={goNext}>
              下一步 →
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => { setCurrentStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              🔄 重新开始
            </button>
          )}
        </div>
      </main>

      {/* 案例库悬浮按钮 */}
      <button
        className="btn btn-primary case-floating-btn"
        onClick={() => setCaseDrawerOpen(true)}
        style={{ padding: '12px 20px', gap: '6px', fontSize: '14px' }}
      >
        📚 案例库
      </button>

      {/* 案例库抽屉遮罩 */}
      <div
        className={`case-drawer-overlay ${caseDrawerOpen ? 'open' : ''}`}
        onClick={() => setCaseDrawerOpen(false)}
      />

      {/* 案例库抽屉 */}
      <CaseDrawer open={caseDrawerOpen} onClose={() => setCaseDrawerOpen(false)} data={data} setData={setData} />

      {/* Tweaks 面板 */}
      <TweaksPanel>
        <TweakSection label="视觉风格" />
        <TweakColor
          label="主题色"
          value={t.primaryColor}
          options={['#1E5FE0', '#0A2540', '#2E9E8A', '#7A5AE0', '#E8726A', '#D97757']}
          onChange={(v) => setTweak('primaryColor', v)}
        />
        <TweakRadio
          label="背景主题"
          value={t.theme}
          options={[{ label: '草稿纸', value: 'paper' }, { label: '深色', value: 'dark' }]}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakToggle
          label="手写 Logo 字体"
          value={t.handwritingFont}
          onChange={(v) => setTweak('handwritingFont', v)}
        />
        <TweakSection label="关于" />
        <div style={{ fontSize: '12px', color: 'var(--ink-faint)', lineHeight: 1.6, padding: '8px 0' }}>
          得欧 Vibe Coding 创意梳理工作台
          <br />
          帮助学生从模糊想法到完整创意方案
          <br />
          <br />
          数据仅保存在你的浏览器本地
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
