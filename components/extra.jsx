// 商业调研步骤
function StepResearch({ data, setData }) {
  const methods = [
    {
      id: 'interview',
      name: '用户访谈',
      icon: '💬',
      desc: '一对一深度访谈目标用户，挖掘真实需求和痛点',
      time: '2-5 天',
      difficulty: '中等',
      steps: [
        '确定访谈目标和核心问题（10-15个问题）',
        '找到 5-8 位符合目标画像的用户',
        '进行 30-45 分钟一对一访谈，做好录音和笔记',
        '整理访谈记录，用亲和图法归类关键发现',
        '输出用户痛点清单和需求优先级'
      ],
      pros: ['深入理解用户动机', '发现隐藏需求', '建立用户同理心'],
      cons: ['样本量小，可能有偏差', '耗时较长', '对访谈技巧要求高']
    },
    {
      id: 'survey',
      name: '问卷调查',
      icon: '📋',
      desc: '大规模收集用户反馈，量化需求强度和市场规模',
      time: '3-7 天',
      difficulty: '简单',
      steps: [
        '设计问卷，控制在 10-15 题，5 分钟内完成',
        '通过社群、朋友圈、问卷平台分发',
        '收集至少 100 份有效样本',
        '用 Excel/飞书表格做交叉分析',
        '输出数据报告，识别核心人群和需求'
      ],
      pros: ['样本量大，数据客观', '成本低，速度快', '易于量化对比'],
      cons: ['深度不够', '受问卷设计影响大', '回收率不稳定']
    },
    {
      id: 'competitor',
      name: '竞品分析',
      icon: '🏆',
      desc: '研究现有解决方案，找差异化机会和空白市场',
      time: '2-4 天',
      difficulty: '简单',
      steps: [
        '列出 3-5 个直接竞品和 2-3 个间接竞品',
        '从功能、体验、定价、用户群等维度对比',
        '制作竞品功能矩阵图',
        '分析竞品用户评价，找到吐槽点和机会点',
        '输出竞品分析报告和差异化定位建议'
      ],
      pros: ['快速了解市场格局', '找到差异化切入点', '避免重复踩坑'],
      cons: ['容易陷入模仿思维', '竞品数据可能不全', '需要持续跟踪']
    },
    {
      id: 'landing-page',
      name: '落地页验证',
      icon: '🎯',
      desc: '做一个介绍页面，测试用户付费意愿和真实需求',
      time: '1-2 周',
      difficulty: '中等',
      steps: [
        '用 AI 工具快速做一个产品介绍页',
        '写清楚核心价值、功能、价格',
        '加上「预约体验」或「立即购买」按钮',
        '投放少量广告或在社群推广',
        '统计转化率和留资率，验证需求强度'
      ],
      pros: ['最真实的需求验证', '可以提前积累种子用户', '成本可控'],
      cons: ['需要一定推广能力', '周期稍长', '文案和设计影响结果']
    },
    {
      id: 'reddit-research',
      name: '社群舆情分析',
      icon: '🌐',
      desc: '在 Reddit/小红书/知乎等平台挖掘用户讨论和痛点',
      time: '1-3 天',
      difficulty: '简单',
      steps: [
        '确定 5-10 个相关社群和关键词',
        '浏览高赞帖子和评论，记录高频痛点',
        '用标签法归类问题类型和需求场景',
        '关注用户主动求推荐的帖子',
        '输出需求洞察和热门话题清单'
      ],
      pros: ['真实用户声音', '免费且快速', '能发现意外需求'],
      cons: ['样本可能偏科', '需要筛选有效信息', '不能代表全部用户']
    },
    {
      id: 'mvp-test',
      name: 'MVP 原型测试',
      icon: '🚀',
      desc: '用最小可用版本让用户真实使用，收集反馈',
      time: '2-4 周',
      difficulty: '较难',
      steps: [
        '确定 MVP 的 1-2 个核心功能',
        '用 AI 编程工具快速开发原型',
        '邀请 10-20 位种子用户试用',
        '观察使用行为，收集体验反馈',
        '迭代 2-3 轮后判断是否值得投入'
      ],
      pros: ['最接近真实使用场景', '反馈最直接', '可以边做边验证'],
      cons: ['开发成本较高', '需要招募测试用户', '周期较长']
    }
  ];

  const [selectedMethod, setSelectedMethod] = React.useState(
    (data.researchMethods && data.researchMethods.length) ? data.researchMethods[0] : null
  );

  const toggleMethod = (methodId) => {
    const current = data.researchMethods || [];
    const next = current.includes(methodId)
      ? current.filter(m => m !== methodId)
      : [...current, methodId];
    setData(prev => ({ ...prev, researchMethods: next }));
    if (!current.includes(methodId)) {
      setSelectedMethod(methodId);
    }
  };

  const activeMethod = methods.find(m => m.id === selectedMethod);

  return (
    <div>
      <div className="step-header">
        <div className="step-eyebrow">Step 03 · 商业调研</div>
        <h1 className="step-title">
          用<span className="scribble-underline">正确的方法</span>验证需求
        </h1>
        <p className="step-subtitle">
          好的创意需要经过验证。选择适合你的调研方法，了解目标用户的真实需求和市场竞争格局，让你的产品方向更清晰。
        </p>
      </div>

      <div className="tip-bubble">
        <div className="tip-label">为什么要做调研？</div>
        <div>据统计，约 42% 的创业项目失败是因为「没有市场需求」。在动手写代码之前，花 3-7 天做调研，可以帮你省下几个月的弯路。</div>
      </div>

      <div className="form-group">
        <label className="form-label">
          选择你打算用的调研方法
          <span className="hint">可以多选，推荐组合使用</span>
        </label>
        <div className="research-method-grid">
          {methods.map(method => (
            <div
              key={method.id}
              className={`research-method-card ${(data.researchMethods || []).includes(method.id) ? 'selected' : ''}`}
              onClick={() => toggleMethod(method.id)}
              onMouseEnter={() => setSelectedMethod(method.id)}
            >
              <div className="research-method-icon">{method.icon}</div>
              <div className="research-method-name">{method.name}</div>
              <div className="research-method-desc">{method.desc}</div>
              <div className="research-method-meta">
                <span>⏱ {method.time}</span>
                <span>📊 难度：{method.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeMethod && (
        <div className="research-detail-panel">
          <div className="research-detail-title">
            <span style={{ fontSize: 20 }}>{activeMethod.icon}</span>
            {activeMethod.name} · 实施步骤
          </div>
          <ul className="research-steps">
            {activeMethod.steps.map((step, i) => (
              <li key={i}>
                <span className="research-step-num">{i + 1}</span>
                <span className="research-step-text">{step}</span>
              </li>
            ))}
          </ul>
          <div className="research-pros-cons">
            <div className="research-pros">
              <div className="research-pros-title">✓ 优势</div>
              {activeMethod.pros.map((p, i) => (
                <div key={i}>· {p}</div>
              ))}
            </div>
            <div className="research-cons">
              <div className="research-cons-title">⚠ 注意</div>
              {activeMethod.cons.map((c, i) => (
                <div key={i}>· {c}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="form-group" style={{ marginTop: 28 }}>
        <label className="form-label">
          竞品分析
          <span className="hint">列出主要竞品和你的差异化</span>
        </label>
        <textarea
          className="form-textarea large"
          placeholder="例如：&#10;主要竞品：A产品 - 功能全面但操作复杂，价格偏高&#10;间接竞品：B工具 - 轻量但功能不足&#10;我的差异化：更简洁的交互 + AI 智能推荐，定位学生人群"
          value={data.competitorAnalysis || ''}
          onChange={e => setData(prev => ({ ...prev, competitorAnalysis: e.target.value }))}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          市场规模估算
          <span className="hint">目标用户大概有多少人？</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="例如：全国大学生约 4000 万，其中有编程学习需求的约 500 万，我们的目标人群是其中的初学者约 200 万。"
          value={data.marketSize || ''}
          onChange={e => setData(prev => ({ ...prev, marketSize: e.target.value }))}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          调研笔记
          <span className="hint">记录调研过程中的关键发现和洞察</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="把你在调研中发现的用户痛点、意外需求、市场机会等都记录下来..."
          value={data.researchNotes || ''}
          onChange={e => setData(prev => ({ ...prev, researchNotes: e.target.value }))}
        />
      </div>
    </div>
  );
}

// 方案评分步骤
function StepScoring({ data }) {
  const dimensions = [
    {
      id: 'demand',
      label: '需求强度',
      description: '用户是否真的需要这个产品？痛点有多痛？',
      score: calculateDemandScore(data),
      feedback: getDemandFeedback(data)
    },
    {
      id: 'market',
      label: '市场空间',
      description: '目标用户群体有多大？增长潜力如何？',
      score: calculateMarketScore(data),
      feedback: getMarketFeedback(data)
    },
    {
      id: 'differentiation',
      label: '差异化程度',
      description: '和现有解决方案相比有什么独特优势？',
      score: calculateDiffScore(data),
      feedback: getDiffFeedback(data)
    },
    {
      id: 'feasibility',
      label: '实现可行性',
      description: '以你的能力和资源能否做出来？',
      score: calculateFeasibilityScore(data),
      feedback: getFeasibilityFeedback(data)
    },
    {
      id: 'profit',
      label: '商业潜力',
      description: '用户是否愿意付费？盈利模式清晰吗？',
      score: calculateProfitScore(data),
      feedback: getProfitFeedback(data)
    }
  ];

  const totalScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length
  );

  const getGrade = (score) => {
    if (score >= 85) return { label: '🌟 优秀项目', desc: '创意扎实，可以全力推进' };
    if (score >= 70) return { label: '💪 良好潜力', desc: '方向正确，补充细节后启动' };
    if (score >= 55) return { label: '🤔 需要打磨', desc: '部分维度薄弱，建议深入调研' };
    return { label: '⚠️ 风险较高', desc: '建议重新思考方向或验证需求' };
  };

  const grade = getGrade(totalScore);

  const getScoreClass = (score) => {
    if (score >= 75) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  return (
    <div>
      <div className="step-header">
        <div className="step-eyebrow">Step 05 · 方案评分</div>
        <h1 className="step-title">
          给你的创意做一次<span className="scribble-underline">体检</span>
        </h1>
        <p className="step-subtitle">
          从五个维度客观评估你的创意方案。分数只是参考，更重要的是看清哪些地方需要补强，帮助你在下一阶段少走弯路。
        </p>
      </div>

      <div className="total-score-box">
        <div className="total-score-label">综合创意评分</div>
        <div className="total-score-number">
          {totalScore}<span> / 100</span>
        </div>
        <div className="total-score-grade">{grade.label}</div>
        <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>{grade.desc}</div>
        <div className="score-legend">
          <div className="score-legend-item">
            <span className="score-legend-dot" style={{ background: '#5DBDA8' }}></span>
            优秀 (≥75)
          </div>
          <div className="score-legend-item">
            <span className="score-legend-dot" style={{ background: '#E0B540' }}></span>
            中等 (50-74)
          </div>
          <div className="score-legend-item">
            <span className="score-legend-dot" style={{ background: '#E8726A' }}></span>
            待加强 (＜50)
          </div>
        </div>
      </div>

      {dimensions.map((dim, index) => (
        <div className="score-card" key={dim.id}>
          <div className="score-header">
            <div>
              <div className="score-dimension">
                {index + 1}. {dim.label}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 2 }}>
                {dim.description}
              </div>
            </div>
            <div className="score-value">{dim.score}分</div>
          </div>
          <div className="score-bar">
            <div
              className={`score-fill ${getScoreClass(dim.score)}`}
              style={{ width: `${dim.score}%` }}
            />
          </div>
          <div className="score-feedback">
            💡 {dim.feedback}
          </div>
        </div>
      ))}

      <div className="sticky-card blue" style={{ marginTop: 24 }}>
        <div className="sticky-label">📝 评分说明</div>
        <div style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--ink)' }}>
          <p style={{ marginBottom: 8 }}>本评分基于你填写的内容自动计算，仅供参考：</p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 4 }}>填写越完整，评分越准确；空白项会拉低分数</li>
            <li style={{ marginBottom: 4 }}>低分不等于坏创意，可能是你还没想清楚某些方面</li>
            <li>高分也不保证成功，市场和执行才是关键！</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// 评分辅助函数
function calculateDemandScore(data) {
  let score = 20; // 基础分
  if (data.problem && data.problem.length > 30) score += 15;
  else if (data.problem) score += 8;
  if (data.userPain && data.userPain.length > 30) score += 15;
  else if (data.userPain) score += 8;
  if (data.targetUser && data.targetUser.length > 30) score += 15;
  else if (data.targetUser) score += 8;
  if ((data.userTypes || []).length >= 2) score += 10;
  else if ((data.userTypes || []).length === 1) score += 5;
  if (data.scenario && data.scenario.length > 30) score += 15;
  else if (data.scenario) score += 8;
  if (data.researchNotes && data.researchNotes.length > 50) score += 10;
  return Math.min(score, 100);
}

function getDemandFeedback(data) {
  const score = calculateDemandScore(data);
  if (score >= 80) return '需求描述清晰，用户画像明确，继续保持！建议通过用户访谈进一步验证。';
  if (score >= 60) return '需求方向基本明确，但用户画像和使用场景可以再具体一些。';
  return '需求描述还比较模糊。建议多问几个「谁在什么场景下遇到了什么具体问题？」';
}

function calculateMarketScore(data) {
  let score = 30;
  if (data.marketSize && data.marketSize.length > 30) score += 25;
  else if (data.marketSize) score += 12;
  if ((data.userTypes || []).length >= 2) score += 15;
  if ((data.categories || []).length >= 2) score += 10;
  if (data.competitorAnalysis && data.competitorAnalysis.length > 50) score += 20;
  else if (data.competitorAnalysis) score += 10;
  return Math.min(score, 100);
}

function getMarketFeedback(data) {
  const score = calculateMarketScore(data);
  if (score >= 80) return '市场分析充分，对竞争格局有清晰认知。继续深挖差异化机会。';
  if (score >= 55) return '有一定市场认知，但竞争分析和市场规模估算可以再深入一些。';
  return '市场还不够清晰。建议先做竞品分析，了解你的目标用户群体有多大。';
}

function calculateDiffScore(data) {
  let score = 30;
  if (data.valueProp && data.valueProp.length > 30) score += 25;
  else if (data.valueProp) score += 12;
  if (data.competitorAnalysis && data.competitorAnalysis.length > 80) score += 20;
  else if (data.competitorAnalysis) score += 10;
  if ((data.features || []).filter(f => f.name).length >= 3) score += 15;
  if (data.inspiration && data.inspiration.length > 30) score += 10;
  return Math.min(score, 100);
}

function getDiffFeedback(data) {
  const score = calculateDiffScore(data);
  if (score >= 75) return '差异化优势明确，价值主张清晰。继续打磨核心亮点功能。';
  if (score >= 50) return '有一定差异化思路，但价值主张可以更锐利、更具体。';
  return '差异化还不明显。想想：用户为什么放弃现有产品选择你的？一句话说清楚核心价值。';
}

function calculateFeasibilityScore(data) {
  let score = 40;
  const featureCount = (data.features || []).filter(f => f.name).length;
  if (featureCount >= 3) score += 15;
  else if (featureCount >= 1) score += 8;
  const mvpCount = (data.features || []).filter(f => f.mvp && f.name).length;
  if (mvpCount >= 2 && mvpCount <= 4) score += 15;
  else if (mvpCount > 4) score += 8;
  if (data.problem && data.problem.length > 20) score += 15;
  if ((data.researchMethods || []).length >= 1) score += 10;
  return Math.min(score, 100);
}

function getFeasibilityFeedback(data) {
  const score = calculateFeasibilityScore(data);
  if (score >= 80) return '功能规划清晰，MVP 范围合理，可以快速启动开发。';
  if (score >= 55) return '基本可行，但建议先收敛 MVP 范围，用最小功能验证核心假设。';
  return '功能规划还不够清晰。建议先列出 2-3 个核心功能，确定 MVP 范围。';
}

function calculateProfitScore(data) {
  let score = 25;
  if (data.marketSize && data.marketSize.length > 30) score += 20;
  else if (data.marketSize) score += 10;
  if (data.targetUser && data.targetUser.length > 40) score += 15;
  else if (data.targetUser) score += 8;
  if ((data.userTypes || []).length >= 1) score += 10;
  if (data.valueProp && data.valueProp.length > 30) score += 15;
  else if (data.valueProp) score += 8;
  if (data.competitorAnalysis && data.competitorAnalysis.length > 50) score += 10;
  return Math.min(score, 100);
}

function getProfitFeedback(data) {
  const score = calculateProfitScore(data);
  if (score >= 75) return '商业潜力良好。可以考虑免费增值、订阅制等模式，提前规划商业化路径。';
  if (score >= 50) return '有一定商业潜力，但付费意愿和付费场景还需要进一步验证。';
  return '商业逻辑还不清晰。建议先验证用户是否愿意为这个解决方案付费。';
}

// 案例库抽屉
function CaseDrawer({ open, onClose, data, setData }) {
  const [activeFilter, setActiveFilter] = React.useState('all');

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'ai', name: 'AI 应用' },
    { id: 'productivity', name: '效率工具' },
    { id: 'lifestyle', name: '生活方式' },
    { id: 'education', name: '教育学习' },
    { id: 'community', name: '社区社交' },
  ];

  const cases = [
    {
      id: 1,
      title: 'Notion AI — 智能写作助手',
      image: 'assets/case-notion-ai.jpeg',
      category: 'ai',
      categoryLabel: 'AI 应用',
      desc: '嵌入 Notion 的 AI 写作工具，一键生成、润色、翻译文档，让知识工作者效率翻倍。',
      highlight: '从现有产品的 AI 增强切入，降低用户迁移成本',
      users: '千万级',
      mvp: '2 个月',
      fullDesc: 'Notion AI 是在 Notion 已有庞大用户基础上推出的 AI 写作功能。用户不需要换工具，直接在文档里调用 AI 生成内容、总结文章、翻译、改语法。',
      keyInsight: '「AI + 已有成熟产品」是低风险切入点，用户不需要为 AI 单独建立使用习惯。',
      business: '按席位订阅，在原有 Notion 套餐基础上加 $8/月/人',
      lesson: '不一定非要做全新产品，把 AI 能力整合进已有场景，用户更容易买单。'
    },
    {
      id: 2,
      title: 'Linear — 优雅的项目管理工具',
      image: 'assets/case-linear.jpeg',
      category: 'productivity',
      categoryLabel: '效率工具',
      desc: '为科技团队设计的下一代 issue 追踪工具，以极致流畅的交互体验著称。',
      highlight: '用体验和性能击败笨重的竞品 Jira',
      users: '数百万团队',
      mvp: '3 个月',
      fullDesc: 'Linear 由前 Airbnb 和 Uber 工程师创立。他们发现 Jira 功能强大但体验糟糕，于是用更现代的设计和更快的速度切入市场。键盘快捷键、丝滑动画、即时响应是他们的核心竞争力。',
      keyInsight: '成熟市场里，「更好的体验」本身就是差异化。用户愿意为每天用的工具付更多钱。',
      business: '按用户数订阅，$8/人/月起',
      lesson: '不要害怕大公司占据的市场，只要你能在体验上做到明显领先，就有机会。'
    },
    {
      id: 3,
      title: 'BeReal — 真实社交应用',
      image: 'assets/case-bereal.jpeg',
      category: 'community',
      categoryLabel: '社区社交',
      desc: '每天随机时间通知用户拍照，前后摄像头同时拍摄，展示真实的自己。',
      highlight: '反滤镜、反完美主义的社交产品创新',
      users: '过亿用户',
      mvp: '1 个月',
      fullDesc: 'BeReal 在 Instagram 追求完美的大环境下，提出「真实」的反命题。每天随机时刻，所有人被通知同时拍照，前后摄像头同时启动，没有滤镜没有修图。一夜之间在年轻人中风靡。',
      keyInsight: '当主流平台走向极端时，反方向的简单创意反而有巨大机会。',
      business: '免费 + 付费会员（更多回忆、额外拍照机会）',
      lesson: '不用追着主流做加法，有时候做减法、反着来，反而能切出一个新市场。'
    },
    {
      id: 4,
      title: 'Duolingo — 游戏化语言学习',
      image: 'assets/case-duolingo.jpeg',
      category: 'education',
      categoryLabel: '教育学习',
      desc: '把学外语变成闯关游戏，用积分、等级、连胜机制让用户上瘾式学习。',
      highlight: '游戏化 + 免费模式颠覆语言学习市场',
      users: '数亿用户',
      mvp: '6 个月',
      fullDesc: 'Duolingo 创始人发现语言学习又贵又枯燥，于是用游戏化的方式彻底重构学习体验。每天几分钟，像玩游戏一样学语言。免费+广告的模式让它获取了海量用户，再通过 Plus 会员变现。',
      keyInsight: '把「痛苦」的事情变得「好玩」，是永远的创业方向。',
      business: '免费 + 订阅会员 + 广告',
      lesson: '教育领域最大的敌人是「坚持不下来」。解决了留存问题，就解决了一切。'
    },
    {
      id: 5,
      title: 'Headspace — 冥想健康 App',
      image: 'assets/case-headspace.jpeg',
      category: 'lifestyle',
      categoryLabel: '生活方式',
      desc: '用可爱动画和引导语降低冥想门槛，让普通人也能拥有内心平静。',
      highlight: '把小众的「冥想」翻译成大众能懂的「心理健康」',
      users: '数千万用户',
      mvp: '4 个月',
      fullDesc: 'Headspace 创始人是前僧侣，他发现冥想对人的帮助很大但门槛太高。于是他用动画、通俗语言和每天 10 分钟的短课程，把冥想包装成一种生活方式产品。',
      keyInsight: '把专业领域的东西「翻译」成普通人能懂的语言，就是巨大的产品机会。',
      business: '订阅制，$12.99/月',
      lesson: '不要觉得「小众需求」没市场，可能只是还没人把它做好做通俗。'
    },
    {
      id: 6,
      title: 'Midjourney — AI 绘画工具',
      image: 'assets/case-midjourney.jpeg',
      category: 'ai',
      categoryLabel: 'AI 应用',
      desc: '通过 Discord 机器人交互的 AI 绘画工具，开启了 AIGC 时代的视觉革命。',
      highlight: '先用 Discord MVP 验证需求，再逐步完善产品',
      users: '千万级用户',
      mvp: '1 个月',
      fullDesc: 'Midjourney 最初只是一个 Discord 服务器里的 Bot，用户用 /imagine 命令输入文字生成图片。极简的产品形态、社区内传播、用户作品自发分享，让它迅速破圈。',
      keyInsight: '好产品不一定需要完整的 App。先用最简单的形式验证需求，再考虑包装。',
      business: '订阅制，$10-60/月不等',
      lesson: 'MVP 不一定要自己写前端，用现有平台（Discord/小程序/飞书机器人）快速验证想法。'
    },
    {
      id: 7,
      title: 'Obsidian — 本地优先笔记工具',
      image: 'assets/case-obsidian.jpeg',
      category: 'productivity',
      categoryLabel: '效率工具',
      desc: '基于本地 Markdown 文件的知识管理工具，以双向链接和图谱视图闻名。',
      highlight: '「反云同步」的差异化定位，主打数据自主',
      users: '数百万用户',
      mvp: '3 个月',
      fullDesc: '在 Notion 等云端笔记大行其道时，Obsidian 反其道而行之：数据完全存在本地，纯 Markdown 文件，用户拥有完全控制权。靠插件生态和免费基础版积累口碑。',
      keyInsight: '当所有人都往一个方向走时，反方向可能有被忽视的强烈需求。',
      business: '核心功能免费 + 付费高级功能（同步/发布等）',
      lesson: '差异化不一定要做加法。定位不同的用户群体，哪怕小一点，忠诚度也很高。'
    },
    {
      id: 8,
      title: 'Strava — 运动社交社区',
      image: 'assets/case-strava.jpeg',
      category: 'lifestyle',
      categoryLabel: '生活方式',
      desc: '跑步骑行爱好者的社交平台，用排行榜和路段挑战让运动更有动力。',
      highlight: '把记录工具做成社区，让运动上瘾',
      users: '上亿用户',
      mvp: '5 个月',
      fullDesc: 'Strava 最初只是一个运动记录 App，但他们发现用户喜欢攀比成绩，于是加入了路段排行榜、挑战活动、好友互动等社交元素。从工具变成社区，留存和粘性大幅提升。',
      keyInsight: '工具型产品的天花板是社区。当用户因为「关系」留下时，就很难离开。',
      business: '免费 + 订阅会员（高级数据分析）',
      lesson: '做工具容易被替代，做社区有护城河。想想你的产品能不能加入社交元素？'
    },
  ];

  const filteredCases = activeFilter === 'all'
    ? cases
    : cases.filter(c => c.category === activeFilter);

  const [selectedCase, setSelectedCase] = React.useState(null);

  const applyToProject = (c) => {
    // 将案例启发填入灵感来源
    const newInspiration = data.inspiration
      ? `${data.inspiration}\n\n参考案例：${c.title}\n启发：${c.keyInsight}`
      : `参考案例：${c.title}\n启发：${c.keyInsight}`;
    setData(prev => ({ ...prev, inspiration: newInspiration }));
    onClose();
  };

  return (
    <>
      <div className={`case-drawer ${open ? 'open' : ''}`}>
        <div className="case-drawer-header">
          <div>
            <div className="case-drawer-title">📚 优秀 Vibe Coding 案例库</div>
            <div className="case-drawer-subtitle">{cases.length} 个成功项目的创意拆解</div>
          </div>
          <button className="case-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="case-filter-row" style={{ display: selectedCase ? 'none' : 'flex' }}>
          {categories.map(cat => (
            <div
              key={cat.id}
              className={`case-filter-chip ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.name}
            </div>
          ))}
        </div>

        <div className="case-list">
          {selectedCase ? (
            <div>
              <button
                onClick={() => setSelectedCase(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--blue)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginBottom: 16,
                  padding: 0,
                  fontWeight: 500
                }}
              >
                ← 返回案例列表
              </button>
              <div className="case-detail-content" style={{ padding: 0 }}>
                <div className="case-detail-image-wrapper">
                  <img src={selectedCase.image} alt={selectedCase.title} className="case-detail-image" />
                </div>
                <div style={{ padding: '24px 0 0' }}>
                  <div className="case-card-tag" style={{ display: 'inline-block', marginBottom: 12 }}>
                  {selectedCase.categoryLabel}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--deep-blue)', marginBottom: 6 }}>
                  {selectedCase.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 20 }}>
                  {selectedCase.fullDesc}
                </p>

                <div className="case-detail-section">
                  <div className="case-detail-label">核心洞察</div>
                  <div className="case-detail-text">{selectedCase.keyInsight}</div>
                </div>

                <div className="case-detail-section">
                  <div className="case-detail-label">亮点特色</div>
                  <div className="case-detail-text">{selectedCase.highlight}</div>
                </div>

                <div className="case-detail-section">
                  <div className="case-detail-label">商业模式</div>
                  <div className="case-detail-text">{selectedCase.business}</div>
                </div>

                <div className="case-detail-section">
                  <div className="case-detail-label">带给你的启发</div>
                  <div className="case-detail-text" style={{
                    padding: '14px 16px',
                    background: 'var(--blue-faint)',
                    borderRadius: 8,
                    borderLeft: '3px solid var(--blue)'
                  }}>
                    {selectedCase.lesson}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => applyToProject(selectedCase)}
                  >
                    💡 应用到我的项目
                  </button>
                </div>
                </div>
              </div>
            </div>
          ) : (
            filteredCases.map(c => (
              <div
                key={c.id}
                className="case-card"
                onClick={() => setSelectedCase(c)}
              >
                <div className="case-card-image-wrapper">
                  <img src={c.image} alt={c.title} className="case-card-image" />
                  <span className="case-card-tag case-card-tag-on-image">{c.categoryLabel}</span>
                </div>
                <div className="case-card-body">
                  <div className="case-card-title">{c.title}</div>
                  <div className="case-card-desc">{c.desc}</div>
                  <div className="case-card-meta">
                    <span>🚀 MVP 周期：{c.mvp}</span>
                    <span>👥 {c.users}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

window.StepResearch = StepResearch;
window.StepScoring = StepScoring;
window.CaseDrawer = CaseDrawer;
