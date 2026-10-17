// 步骤组件集合

// ========== 步骤1：灵感起源 ==========
function StepIdea({ data, setData }) {
  const [title, setTitle] = React.useState(data.projectName || '');
  const [problem, setProblem] = React.useState(data.problem || '');
  const [inspiration, setInspiration] = React.useState(data.inspiration || '');

  React.useEffect(() => {
    setTitle(data.projectName || '');
    setProblem(data.problem || '');
    setInspiration(data.inspiration || '');
  }, [data]);

  const update = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const ideaTags = [
    '效率工具', '生活助手', '学习教育', '娱乐休闲',
    '社交互动', '创意工具', '数据可视化', 'AI 应用',
    '游戏化', '信息聚合', '健康管理', '财务管理'
  ];

  return (
    <div>
      <div className="step-header">
        <div className="step-eyebrow">Step 01 · 灵感起源</div>
        <h1 className="step-title">
          你的<span className="scribble-underline">创意种子</span>是什么？
        </h1>
        <p className="step-subtitle">
          每个伟大的项目都始于一个模糊的想法。把它写下来，越具体越好——哪怕只是"我想做一个很酷的网站"。
        </p>
      </div>

      <div className="tip-bubble">
        <div className="tip-label">💡 灵感提示</div>
        <div>想想你日常生活中有什么痛点？或者什么事情让你觉得"要是有个工具就好了"？最好的创意往往来自真实的需求。</div>
      </div>

      <div className="sticky-card blue">
        <div className="sticky-label">项目名称</div>
        <input
          type="text"
          className="form-input"
          placeholder="给你的项目起个名字吧..."
          value={title}
          onChange={e => { setTitle(e.target.value); update('projectName', e.target.value); }}
          style={{ background: 'rgba(255,255,255,0.5)', border: 'none', borderBottom: '2px solid rgba(0,0,0,0.1)', borderRadius: 0, padding: '8px 0', fontSize: '20px', fontWeight: 600 }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          这个项目想解决什么问题？
          <span className="hint">用一两句话说清楚核心痛点</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="例如：我发现自己总是忘记喝水，想做一个提醒喝水的小工具..."
          value={problem}
          onChange={e => { setProblem(e.target.value); update('problem', e.target.value); }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          灵感来源
          <span className="hint">是什么触发了这个想法？</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="例如：上周连续加班忘了喝水导致喉咙痛，或者看到某个 App 觉得可以做得更好..."
          value={inspiration}
          onChange={e => { setInspiration(e.target.value); update('inspiration', e.target.value); }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          项目类型标签
          <span className="hint">选择最贴切的 2-3 个</span>
        </label>
        <div className="tag-group">
          {ideaTags.map(tag => (
            <div
              key={tag}
              className={`tag-item ${data.categories?.includes(tag) ? 'selected' : ''}`}
              onClick={() => {
                const current = data.categories || [];
                const next = current.includes(tag)
                  ? current.filter(t => t !== tag)
                  : [...current, tag];
                setData(prev => ({ ...prev, categories: next }));
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== 步骤2：目标用户 ==========
function StepAudience({ data, setData }) {
  const [targetUser, setTargetUser] = React.useState(data.targetUser || '');
  const [scenario, setScenario] = React.useState(data.scenario || '');
  const [userPain, setUserPain] = React.useState(data.userPain || '');

  React.useEffect(() => {
    setTargetUser(data.targetUser || '');
    setScenario(data.scenario || '');
    setUserPain(data.userPain || '');
  }, [data]);

  const update = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const userTypes = [
    '学生党', '上班族', '自由职业者', '创作者',
    '开发者', '设计师', '产品经理', '运营人员',
    '创业者', '家长', '老年人', '青少年'
  ];

  return (
    <div>
      <div className="step-header">
        <div className="step-eyebrow">Step 02 · 用户画像</div>
        <h1 className="step-title">
          谁会<span className="scribble-underline">用</span>你的产品？
        </h1>
        <p className="step-subtitle">
          清晰的用户画像能帮你做更好的设计决策。想象一个具体的人，而不是模糊的"大家"。
        </p>
      </div>

      <div className="tip-bubble">
        <div className="tip-label">🎯 用户思维</div>
        <div>试着回答：用户在什么场景下会打开你的网站？TA 当时的心情是怎样的？TA 最想完成的一件事是什么？</div>
      </div>

      <div className="form-group">
        <label className="form-label">
          目标用户群体
          <span className="hint">选择主要的 1-2 类人群</span>
        </label>
        <div className="tag-group">
          {userTypes.map(type => (
            <div
              key={type}
              className={`tag-item ${data.userTypes?.includes(type) ? 'selected' : ''}`}
              onClick={() => {
                const current = data.userTypes || [];
                const next = current.includes(type)
                  ? current.filter(t => t !== type)
                  : [...current, type];
                setData(prev => ({ ...prev, userTypes: next }));
              }}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      <div className="sticky-card pink">
        <div className="sticky-label">👤 典型用户画像</div>
        <textarea
          className="form-textarea large"
          placeholder="描述一个典型用户：年龄、职业、日常习惯、为什么会用你的产品...&#10;&#10;例如：小明，22岁，大学生，每天刷手机4小时以上，经常忘记做作业的截止日期，需要一个能提醒他的工具..."
          value={targetUser}
          onChange={e => { setTargetUser(e.target.value); update('targetUser', e.target.value); }}
          style={{ background: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: 8 }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          使用场景
          <span className="hint">用户在什么情况下会使用？</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="例如：早上起床后查看今日待办 / 通勤路上刷内容 / 晚上睡前记录一天..."
          value={scenario}
          onChange={e => { setScenario(e.target.value); update('scenario', e.target.value); }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          用户痛点
          <span className="hint">他们现在遇到了什么困难？</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="例如：现有工具太复杂 / 没有中文界面 / 收费太贵 / 功能太多用不上..."
          value={userPain}
          onChange={e => { setUserPain(e.target.value); update('userPain', e.target.value); }}
        />
      </div>
    </div>
  );
}

// ========== 步骤3：核心功能 ==========
function StepFeatures({ data, setData }) {
  const [features, setFeatures] = React.useState(
    data.features?.length ? data.features : [
      { id: 1, name: '', desc: '', mvp: true }
    ]
  );

  React.useEffect(() => {
    if (data.features?.length) {
      setFeatures(data.features);
    }
  }, [data]);

  const addFeature = () => {
    const newFeatures = [...features, { id: Date.now(), name: '', desc: '', mvp: false }];
    setFeatures(newFeatures);
    setData(prev => ({ ...prev, features: newFeatures }));
  };

  const updateFeature = (id, field, value) => {
    const newFeatures = features.map(f =>
      f.id === id ? { ...f, [field]: value } : f
    );
    setFeatures(newFeatures);
    setData(prev => ({ ...prev, features: newFeatures }));
  };

  const deleteFeature = (id) => {
    if (features.length <= 1) return;
    const newFeatures = features.filter(f => f.id !== id);
    setFeatures(newFeatures);
    setData(prev => ({ ...prev, features: newFeatures }));
  };

  const featureSuggestions = [
    '用户注册/登录', '数据展示列表', '搜索/筛选', '收藏/点赞',
    '分享功能', '数据统计图表', '消息通知', '主题切换',
    '个人中心', '数据导出', '评论互动', '标签分类'
  ];

  return (
    <div>
      <div className="step-header">
        <div className="step-eyebrow">Step 04 · 核心功能</div>
        <h1 className="step-title">
          你的产品能<span className="scribble-underline">做什么</span>？
        </h1>
        <p className="step-subtitle">
          列出产品的核心功能模块。先聚焦 MVP（最小可行产品），把最关键的功能做精做透。
        </p>
      </div>

      <div className="tip-bubble">
        <div className="tip-label">⚡ MVP 原则</div>
        <div>做 3 个核心功能，每个做到 100 分，远胜过做 10 个功能每个只有 60 分。勾选 ★ 标记 MVP 必备功能。</div>
      </div>

      <div className="form-group">
        <label className="form-label">
          快速添加常见功能
          <span className="hint">点击即可添加到列表</span>
        </label>
        <div className="tag-group">
          {featureSuggestions.map(suggestion => (
            <div
              key={suggestion}
              className="tag-item"
              onClick={() => {
                const exists = features.some(f => f.name === suggestion);
                if (!exists) {
                  const newFeatures = [...features, { id: Date.now(), name: suggestion, desc: '', mvp: false }];
                  setFeatures(newFeatures);
                  setData(prev => ({ ...prev, features: newFeatures }));
                }
              }}
            >
              + {suggestion}
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">功能清单</label>
        <div className="feature-list">
          {features.map((feature, index) => (
            <div key={feature.id} className="feature-item">
              <div className="feature-num">{index + 1}</div>
              <div className="feature-content">
                <input
                  type="text"
                  className="feature-input"
                  placeholder="功能名称，如：任务列表"
                  value={feature.name}
                  onChange={e => updateFeature(feature.id, 'name', e.target.value)}
                />
                <textarea
                  className="feature-desc"
                  placeholder="简单描述这个功能做什么..."
                  rows={2}
                  value={feature.desc}
                  onChange={e => updateFeature(feature.id, 'desc', e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <button className="feature-delete" onClick={() => deleteFeature(feature.id)}>×</button>
                <div
                  style={{
                    fontSize: '12px',
                    padding: '3px 8px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: feature.mvp ? 'var(--blue)' : 'transparent',
                    color: feature.mvp ? 'white' : 'var(--ink-faint)',
                    border: feature.mvp ? 'none' : '1px solid var(--line)',
                    fontWeight: 500,
                    userSelect: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => updateFeature(feature.id, 'mvp', !feature.mvp)}
                  title="MVP 必备功能"
                >
                  {feature.mvp ? '★ MVP' : '☆ MVP'}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="add-feature-btn" onClick={addFeature} style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
          <span style={{ fontSize: '18px' }}>+</span> 添加新功能
        </button>
      </div>

      <div className="sticky-card green">
        <div className="sticky-label">📝 一句话价值主张</div>
        <textarea
          className="form-textarea"
          placeholder="用一句话说清楚：这个产品为谁、解决了什么问题、带来什么价值？&#10;&#10;模板：为[目标用户]提供[产品功能]，帮助他们[解决的问题/获得的好处]。"
          value={data.valueProp || ''}
          onChange={e => setData(prev => ({ ...prev, valueProp: e.target.value }))}
          style={{ background: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: 8 }}
        />
      </div>
    </div>
  );
}

// ========== 步骤4：技术选型 ==========
function StepTech({ data, setData }) {
  const stacks = [
    { id: 'html-css', name: 'HTML + CSS + JS', desc: '纯前端三件套，适合简单静态页面', level: '入门' },
    { id: 'react-basic', name: 'React 基础', desc: '组件化开发，适合交互式应用', level: '进阶' },
    { id: 'react-tailwind', name: 'React + Tailwind', desc: '快速搭建美观 UI，AI 友好度高', level: '进阶' },
    { id: 'nextjs', name: 'Next.js', desc: '全栈 React 框架，支持 SSR/API', level: '高级' },
    { id: 'vue', name: 'Vue.js', desc: '渐进式框架，上手友好', level: '进阶' },
  ];

  const features = [
    '响应式布局', '暗黑模式', '数据持久化 (localStorage)', '图表可视化',
    'AI API 集成', '第三方登录', '文件上传', '搜索功能',
    '动画效果', 'PWA 离线可用', '多语言', '实时协作'
  ];

  const deployOptions = [
    { id: 'netlify', name: 'Netlify', desc: '拖拽部署，免费好用' },
    { id: 'vercel', name: 'Vercel', desc: 'Next.js 官方推荐，一键部署' },
    { id: 'github-pages', name: 'GitHub Pages', desc: '静态页面免费托管' },
    { id: 'cloudflare', name: 'Cloudflare Pages', desc: '全球 CDN，速度快' },
  ];

  return (
    <div>
      <div className="step-header">
        <div className="step-eyebrow">Step 04 · 技术选型</div>
        <h1 className="step-title">
          用什么<span className="scribble-underline">技术</span>来实现？
        </h1>
        <p className="step-subtitle">
          Vibe Coding 的核心是选择 AI 擅长的技术栈。选得好，事半功倍；选得不好，你会花大量时间在调试上。
        </p>
      </div>

      <div className="tip-bubble">
        <div className="tip-label">🤖 AI 友好度</div>
        <div>React + Tailwind CSS 是目前 AI 生成代码效果最好的组合——社区资料多、模式清晰，AI 犯错少。</div>
      </div>

      <div className="form-group">
        <label className="form-label">技术栈选择</label>
        <div className="tech-cards">
          {stacks.map(stack => (
            <div
              key={stack.id}
              className={`tech-card ${data.techStack === stack.id ? 'selected' : ''}`}
              onClick={() => setData(prev => ({ ...prev, techStack: stack.id }))}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="tech-card-name">{stack.name}</div>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  background: stack.level === '入门' ? 'var(--mint-soft)' :
                              stack.level === '进阶' ? 'var(--blue-soft)' :
                              'var(--blue-soft)',
                  color: stack.level === '入门' ? '#3A7A5A' :
                         stack.level === '进阶' ? '#8A5A20' :
                         'white',
                  fontWeight: 500
                }}>{stack.level}</span>
              </div>
              <div className="tech-card-desc">{stack.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          需要哪些特性支持？
          <span className="hint">选择你计划实现的功能特性</span>
        </label>
        <div className="checkbox-grid">
          {features.map(feature => (
            <div
              key={feature}
              className={`checkbox-item ${data.techFeatures?.includes(feature) ? 'checked' : ''}`}
              onClick={() => {
                const current = data.techFeatures || [];
                const next = current.includes(feature)
                  ? current.filter(f => f !== feature)
                  : [...current, feature];
                setData(prev => ({ ...prev, techFeatures: next }));
              }}
            >
              <div className="checkbox-box"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">部署方式</label>
        <div className="tech-cards">
          {deployOptions.map(opt => (
            <div
              key={opt.id}
              className={`tech-card ${data.deploy === opt.id ? 'selected' : ''}`}
              onClick={() => setData(prev => ({ ...prev, deploy: opt.id }))}
            >
              <div className="tech-card-name">{opt.name}</div>
              <div className="tech-card-desc">{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky-card blue">
        <div className="sticky-label">💭 技术笔记</div>
        <textarea
          className="form-textarea"
          placeholder="记录你对技术选型的思考、可能遇到的问题、需要学习的知识点..."
          value={data.techNotes || ''}
          onChange={e => setData(prev => ({ ...prev, techNotes: e.target.value }))}
          style={{ background: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: 8 }}
        />
      </div>
    </div>
  );
}

// ========== 步骤5：视觉风格 ==========
function StepStyle({ data, setData }) {
  const styles = [
    {
      id: 'minimal',
      name: '极简风格',
      desc: '大量留白、简洁线条、强调内容',
      colors: ['#FFFFFF', '#2B2B2B', '#E8E8E8', '#666666']
    },
    {
      id: 'neo-brutalism',
      name: '新野兽派',
      desc: '粗边框、鲜明色彩、几何感强',
      colors: ['#FFE66D', '#2B2B2B', '#FF6B6B', '#4ECDC4']
    },
    {
      id: 'glassmorphism',
      name: '玻璃拟态',
      desc: '半透明毛玻璃、朦胧高级感',
      colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
    },
    {
      id: 'retro',
      name: '复古怀旧',
      desc: '暖色调、像素感、80/90年代风',
      colors: ['#F4A261', '#E76F51', '#264653', '#E9C46A']
    },
    {
      id: 'cyberpunk',
      name: '赛博朋克',
      desc: '霓虹灯光、暗色背景、科技感',
      colors: ['#0F0F1A', '#00FFF5', '#FF00FF', '#FFFF00']
    },
    {
      id: 'natural',
      name: '自然有机',
      desc: '大地色系、柔和曲线、舒适温馨',
      colors: ['#F5F0E8', '#8B7355', '#A8B5A0', '#D4A574']
    },
  ];

  const fontPairs = [
    { id: 'sans', name: '现代无衬线', desc: '干净利落，科技产品首选' },
    { id: 'serif', name: '优雅衬线体', desc: '文艺气质，内容类产品' },
    { id: 'mono', name: '等宽字体', desc: '极客风格，开发者工具' },
    { id: 'handwriting', name: '手写体', desc: '亲和力强，创意类产品' },
  ];

  return (
    <div>
      <div className="step-header">
        <div className="step-eyebrow">Step 05 · 视觉风格</div>
        <h1 className="step-title">
          你的产品<span className="scribble-underline">长什么样</span>？
        </h1>
        <p className="step-subtitle">
          好的视觉风格能让用户第一眼就爱上你的产品。选择一个与你项目气质匹配的方向。
        </p>
      </div>

      <div className="tip-bubble">
        <div className="tip-label">🎨 风格即性格</div>
        <div>视觉风格应该服务于产品定位：工具类选极简清晰，游戏类选活泼鲜艳，艺术类选有个性的风格。</div>
      </div>

      <div className="form-group">
        <label className="form-label">选择一个视觉风格方向</label>
        <div className="style-grid">
          {styles.map(style => (
            <div
              key={style.id}
              className={`style-card ${data.style === style.id ? 'selected' : ''}`}
              onClick={() => setData(prev => ({ ...prev, style: style.id }))}
            >
              <div className="style-preview" style={{
                background: `linear-gradient(135deg, ${style.colors[0]} 0%, ${style.colors[1]} 100%)`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  right: 12,
                  display: 'flex',
                  gap: 6
                }}>
                  {style.colors.map((c, i) => (
                    <div key={i} style={{
                      flex: 1,
                      height: 16,
                      borderRadius: 4,
                      background: c,
                      border: style.id === 'neo-brutalism' ? '2px solid #2B2B2B' : 'none',
                      boxShadow: style.id === 'glassmorphism' ? '0 2px 8px rgba(255,255,255,0.3)' : 'none'
                    }}></div>
                  ))}
                </div>
                {style.id === 'cyberpunk' && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#00FFF5',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px #00FFF5'
                  }}>● REC</div>
                )}
                {style.id === 'retro' && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)'
                  }}></div>
                )}
              </div>
              <div className="style-info">
                <div className="style-name">{style.name}</div>
                <div className="style-desc">{style.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">字体气质</label>
        <div className="tech-cards">
          {fontPairs.map(font => (
            <div
              key={font.id}
              className={`tech-card ${data.fontStyle === font.id ? 'selected' : ''}`}
              onClick={() => setData(prev => ({ ...prev, fontStyle: font.id }))}
            >
              <div className="tech-card-name" style={{
                fontFamily: font.id === 'serif' ? "'Noto Serif SC', serif" :
                           font.id === 'mono' ? 'monospace' :
                           font.id === 'handwriting' ? "'Caveat', cursive" :
                           "'Noto Sans SC', sans-serif",
                fontSize: '18px'
              }}>{font.name}</div>
              <div className="tech-card-desc">{font.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky-card orange">
        <div className="sticky-label">✨ 设计关键词</div>
        <textarea
          className="form-textarea"
          placeholder="用 3-5 个关键词描述你想要的视觉感觉...&#10;例如：温暖、有活力、年轻、手写感、毛茸茸的..."
          value={data.styleKeywords || ''}
          onChange={e => setData(prev => ({ ...prev, styleKeywords: e.target.value }))}
          style={{ background: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: 8 }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          参考灵感
          <span className="hint">有没有类似风格的网站或 App 可以参考？</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="例如：我喜欢 Linear 的简洁风格 / Notion 的排版 / Awwwards 上的创意网站..."
          value={data.styleReferences || ''}
          onChange={e => setData(prev => ({ ...prev, styleReferences: e.target.value }))}
        />
      </div>
    </div>
  );
}

// ========== 步骤6：创意输出 ==========
function StepOutput({ data }) {
  const [showToast, setShowToast] = React.useState(false);

  const mvpFeatures = (data.features || []).filter(f => f.mvp && f.name);
  const extraFeatures = (data.features || []).filter(f => !f.mvp && f.name);

  const generateMarkdown = () => {
    const lines = [];
    lines.push(`# ${data.projectName || '未命名项目'} — Vibe Coding 创意方案`);
    lines.push('');
    lines.push(`> 生成机构：得欧 Vibe Coding | 生成时间：${new Date().toLocaleDateString('zh-CN')} | 项目类型：${(data.categories || []).join(' / ') || '未分类'}`);
    lines.push('');
    lines.push('## 🎯 项目概述');
    lines.push('');
    lines.push(`**解决的问题：** ${data.problem || '（待补充）'}`);
    lines.push('');
    lines.push(`**灵感来源：** ${data.inspiration || '（待补充）'}`);
    lines.push('');
    if (data.valueProp) {
      lines.push(`**价值主张：** ${data.valueProp}`);
      lines.push('');
    }
    lines.push('## 👤 目标用户');
    lines.push('');
    lines.push(`**用户群体：** ${(data.userTypes || []).join('、') || '（待补充）'}`);
    lines.push('');
    lines.push(`**典型画像：** ${data.targetUser || '（待补充）'}`);
    lines.push('');
    lines.push(`**使用场景：** ${data.scenario || '（待补充）'}`);
    lines.push('');
    lines.push(`**用户痛点：** ${data.userPain || '（待补充）'}`);
    lines.push('');
    lines.push('## 🔍 商业调研');
    lines.push('');
    if ((data.researchMethods || []).length) {
      lines.push(`**调研方法：** ${(data.researchMethods || []).join('、')}`);
      lines.push('');
    }
    if (data.competitorAnalysis) {
      lines.push(`**竞品分析：** ${data.competitorAnalysis}`);
      lines.push('');
    }
    if (data.marketSize) {
      lines.push(`**市场规模：** ${data.marketSize}`);
      lines.push('');
    }
    if (data.researchNotes) {
      lines.push(`**关键发现：** ${data.researchNotes}`);
      lines.push('');
    }
    if (!(data.researchMethods || []).length && !data.competitorAnalysis && !data.marketSize && !data.researchNotes) {
      lines.push('（待补充调研内容）');
      lines.push('');
    }
    lines.push('## ✨ 核心功能');
    lines.push('');
    if (mvpFeatures.length) {
      lines.push('### MVP 必备功能');
      lines.push('');
      mvpFeatures.forEach((f, i) => {
        lines.push(`**${i + 1}. ${f.name}** — ${f.desc || '（暂无描述）'}`);
      });
      lines.push('');
    }
    if (extraFeatures.length) {
      lines.push('### 扩展功能');
      lines.push('');
      extraFeatures.forEach((f, i) => {
        lines.push(`- ${f.name}${f.desc ? ` — ${f.desc}` : ''}`);
      });
      lines.push('');
    }
    if (!mvpFeatures.length && !extraFeatures.length) {
      lines.push('（待补充功能列表）');
      lines.push('');
    }
    lines.push('---');
    lines.push('');
    lines.push('_本文档由得欧 Vibe Coding 创意梳理工作台生成_');
    return lines.join('\n');
  };

  const copyToClipboard = () => {
    const text = generateMarkdown();
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  const downloadMarkdown = () => {
    const text = generateMarkdown();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.projectName || 'vibe-coding-idea'}-创意方案.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="step-header">
        <div className="step-eyebrow">Step 06 · 创意输出</div>
        <h1 className="step-title">
          你的<span className="scribble-underline">创意方案</span>出炉了！
        </h1>
        <p className="step-subtitle">
          一份完整的项目创意文档已经生成。你可以复制到飞书文档、下载 Markdown 文件，或者直接开始 vibe coding！
        </p>
      </div>

      <div className="top-bar" style={{ marginTop: 0 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={copyToClipboard}>
            📋 复制 Markdown
          </button>
          <button className="btn btn-secondary" onClick={downloadMarkdown}>
            ⬇ 下载文件
          </button>
        </div>
      </div>

      <div className="output-doc">
        <h2 className="output-title">{data.projectName || '未命名项目'}</h2>
        <div className="output-meta">
          项目类型：{(data.categories || []).length ? (
            <span className="output-tags" style={{ display: 'inline-flex', marginLeft: 8 }}>
              {(data.categories || []).map(cat => (
                <span key={cat} className="output-tag">{cat}</span>
              ))}
            </span>
          ) : '未分类'}
          <span style={{ margin: '0 12px', color: 'var(--line)' }}>|</span>
          生成日期：{new Date().toLocaleDateString('zh-CN')}
        </div>

        <div className="output-section">
          <div className="output-section-title">🎯 项目概述</div>
          <div className="output-text">
            <p style={{ marginBottom: 8 }}>
              <strong>解决的问题：</strong>{data.problem || '（点击左侧步骤去补充）'}
            </p>
            <p style={{ marginBottom: 8 }}>
              <strong>灵感来源：</strong>{data.inspiration || '（点击左侧步骤去补充）'}
            </p>
            {data.valueProp && (
              <p style={{ marginTop: 12, padding: '12px 16px', background: 'var(--blue-faint)', borderRadius: 8, borderLeft: '4px solid var(--blue)' }}>
                <strong>💡 价值主张：</strong>{data.valueProp}
              </p>
            )}
          </div>
        </div>

        <div className="output-section">
          <div className="output-section-title">👤 目标用户</div>
          <div className="output-text">
            <p style={{ marginBottom: 8 }}>
              <strong>用户群体：</strong>{(data.userTypes || []).join('、') || '（待补充）'}
            </p>
            <p style={{ marginBottom: 8 }}>
              <strong>使用场景：</strong>{data.scenario || '（待补充）'}
            </p>
            <p>
              <strong>用户痛点：</strong>{data.userPain || '（待补充）'}
            </p>
            {data.targetUser && (
              <div style={{ marginTop: 12, padding: '12px 16px', background: 'var(--sticky-pink)', borderRadius: 8 }}>
                <strong>典型画像：</strong>{data.targetUser}
              </div>
            )}
          </div>
        </div>

        <div className="output-section">
          <div className="output-section-title">🔍 商业调研</div>
          <div className="output-text">
            {(data.researchMethods && data.researchMethods.length) ? (
              <p style={{ marginBottom: 8 }}>
                <strong>调研方法：</strong>{data.researchMethods.join('、')}
              </p>
            ) : null}
            {data.competitorAnalysis ? (
              <p style={{ marginBottom: 8 }}>
                <strong>竞品分析：</strong>{data.competitorAnalysis}
              </p>
            ) : null}
            {data.marketSize ? (
              <p style={{ marginBottom: 8 }}>
                <strong>市场规模：</strong>{data.marketSize}
              </p>
            ) : null}
            {data.researchNotes ? (
              <p>
                <strong>关键发现：</strong>{data.researchNotes}
              </p>
            ) : null}
            {!(data.researchMethods || []).length && !data.competitorAnalysis && !data.marketSize && !data.researchNotes && (
              <p style={{ color: 'var(--ink-faint)' }}>（点击左侧「商业调研」步骤去补充）</p>
            )}
          </div>
        </div>

        <div className="output-section">
          <div className="output-section-title">✨ 核心功能</div>
          {mvpFeatures.length > 0 && (
            <>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--blue)', marginBottom: 8 }}>
                ★ MVP 必备功能（{mvpFeatures.length} 项）
              </div>
              <ul className="output-features">
                {mvpFeatures.map((f, i) => (
                  <li key={f.id}>
                    <span className="output-feature-name">{i + 1}. {f.name}</span>
                    <span className="output-feature-desc">{f.desc || '（暂无描述）'}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {extraFeatures.length > 0 && (
            <>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-soft)', margin: '16px 0 8px' }}>
                扩展功能（{extraFeatures.length} 项）
              </div>
              <ul className="output-features">
                {extraFeatures.map((f, i) => (
                  <li key={f.id}>
                    <span className="output-feature-name">{f.name}</span>
                    <span className="output-feature-desc">{f.desc || '（暂无描述）'}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {!mvpFeatures.length && !extraFeatures.length && (
            <div className="empty-hint">还没有添加功能，回到上一步补充吧～</div>
          )}
        </div>
      </div>

      <div className="sticky-card orange" style={{ marginTop: 32 }}>
        <div className="sticky-label">🚀 下一步：开始 Vibe Coding！</div>
        <div className="sticky-content" style={{ fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ marginBottom: 10 }}>现在，拿着这份创意文档，你可以：</p>
          <ol style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>打开 Cursor / Bolt / Lovable 等 AI 编程工具</li>
            <li style={{ marginBottom: 6 }}>把你的创意方案作为初始 prompt 输入</li>
            <li style={{ marginBottom: 6 }}>先让 AI 生成项目骨架，再逐步添加功能</li>
            <li>记住：迭代验证，小步快跑！</li>
          </ol>
        </div>
      </div>

      <div className={`copy-toast ${showToast ? 'show' : ''}`}>
        ✓ 已复制到剪贴板
      </div>
    </div>
  );
}

window.StepIdea = StepIdea;
window.StepAudience = StepAudience;
window.StepFeatures = StepFeatures;
window.StepOutput = StepOutput;
