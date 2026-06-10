# ToolSite OS 全局插件与 Skill 调用地图

## 目的

本文档站在整个 ToolSite OS 大工作流的立场，定义插件与 skill 的全局调用规则。

每个具体工作站仍应在自己的设计文档中维护模块级调用规则。

层级关系：

```text
08-knowledge/plugin-skill-map.md
→ 全局地图：覆盖选题、建站、SEO、推广、复盘、服务化

docs/superpowers/specs/*-design.md
→ 模块地图：只描述该工作站需要调用什么
```

原则：

```text
先判断任务性质
→ 再选择最合适的插件 / skill
→ 不为调用而调用
→ 需要实时信息时优先用搜索或浏览
→ 需要可视化验证时必须实际打开和检查
```

## 当前可用插件

| 插件 | 最适合的用途 | ToolSite OS 中的使用时机 |
|---|---|---|
| Browser | 打开、检查、截图和验证本地网站或 localhost | 工具站 MVP 开发、移动端 QA、页面检查 |
| Chrome | 依赖用户已登录状态的网站操作 | Google Trends、Search Console、Google Ads、AdSense 等账号内操作 |
| Computer Use | 操作本地 Mac 应用 | 浏览器外的桌面应用、文件、需要 UI 操作的场景 |
| Documents | 生成或编辑 Word / docx 文档 | 服务交付报告、客户版选题验证包 |
| Spreadsheets | 创建和维护表格、评分表、台账 | 选题评分表、关键词台账、成本收益表 |
| Presentations | 创建 PPT / deck | 服务提案、客户汇报、阶段复盘 |
| Product Design | 产品 UI brief、原型、截图转代码 | 工作站 UI、客户工具面板、交互原型 |
| Creative Production | moodboard、广告方向、品牌视觉探索 | 自媒体素材、服务推广、客户品牌资产 |
| HyperFrames by HeyGen | HTML 视频、字幕、转场、网站转视频 | 自媒体视频、工具站演示、网站 promo |

当前执行说明：

- Product Design 插件文件已安装在本机插件缓存中。
- 2026-06-10 排查发现：`~/.codex/config.toml` 原本只启用了 `browser@openai-bundled` 和 `chrome@openai-bundled`，没有启用 `product-design@openai-curated-remote`，因此当时会话没有暴露 Product Design skills。
- 已追加配置：

```toml
[plugins."product-design@openai-curated-remote"]
enabled = true
```

- 2026-06-10 后续会话已验证：Product Design skills 已进入当前可用 skill 列表，包括 `product-design:index`、`get-context`、`ideate`、`image-to-code`、`audit`、`design-qa` 等。
- 如果未来会话里 Product Design 再次未出现，不能假装已直接调用；此时继续优先用 `impeccable` 执行产品 UI/UX 设计、审查和打磨，并继续排查插件加载机制。
- Product Design 的 skill 文档仍可作为流程参考，尤其是 `get-context`、`audit`、`design-qa` 的设计闸门思想。

## 插件可用性预检

每进入一个关键工作站前，先做插件可用性预检，避免再次出现“流程里写了调用，但实际没有介入”的问题。

预检分三层：

```text
插件是否已下载到本机缓存
→ 插件是否在配置或当前运行环境中启用
→ 当前会话是否真正暴露出对应 skill / MCP tool / app surface
```

最低检查项：

- 查看当前会话可用 skill 列表，确认目标插件的 skill 名称实际存在。
- 对有 MCP 的插件，确认当前工具列表里有可调用工具。
- 对只有 skill、没有 MCP 的插件，例如 Product Design，重点确认 skill 是否出现在当前会话。
- 对需要登录态的网站操作，优先确认 Browser / Chrome 是否可用。
- 如果插件未暴露，先记录原因和替代方案，再继续推进，不能在文档中写“已调用”。

当前状态判断：

| 插件 | 当前风险 | 判断 |
|---|---:|---|
| Product Design | 低到中 | 已启用并在后续会话暴露 skill；但它是 skill-only 插件，没有 MCP tool，因此每个关键 UI 节点前仍需确认 skill 存在 |
| Creative Production | 低 | 当前会话已暴露 Creative Production skills，并且有 `render_moodboard_board_widget` 等 MCP 工具，不属于 Product Design 当时那类问题 |
| Browser / Chrome | 低 | 已在配置中启用，适合本地页面 QA 和登录态网站操作 |
| HyperFrames | 低 | 已有独立 skills，同时插件缓存存在；使用前按视频任务类型选择对应 skill |
| Documents / Spreadsheets / Presentations | 中 | 插件缓存存在，但当前是否暴露为直接工具取决于桌面运行环境；进入文档、表格、PPT 工作站前需要单独预检 |

## 全量 Skill 盘点

说明：

- `主线`：ToolSite OS 大工作流中高概率会用。
- `可选`：特定阶段、特定交付物或特定媒介才用。
- `维护`：用于扩展 Codex 能力、插件、skill 或记忆系统。
- `暂缓`：当前项目不是主场景，但保留索引。

### 核心流程与项目治理

| Skill | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| using-superpowers | 主线 | 每次会话启动 | 检查和遵守可用 skill 规则 |
| brainstorming | 主线 | 新工作站、新功能、新流程设计前 | 先澄清目标、方案、边界 |
| writing-plans | 主线 | 设计确认后 | 把 spec 拆成实施计划 |
| executing-plans | 主线 | 已有计划后 | 按计划执行并做检查点 |
| verification-before-completion | 主线 | 每次关键完成前 | 用证据确认结果 |
| test-driven-development | 主线 | 代码功能或 bugfix | 先写测试再实现 |
| systematic-debugging | 主线 | 遇到 bug、异常、测试失败 | 先定位再修复 |
| requesting-code-review | 主线 | 主要功能完成后 | 主动审查风险 |
| receiving-code-review | 主线 | 收到 review 反馈后 | 严谨处理反馈 |
| subagent-driven-development | 谨慎可选 | 明确、短闭环、低耦合的旁路任务 | 用子代理拆解执行；关键路径不直接交给子 agent |
| self-learning | 维护 | 用户要求记忆、复盘、沉淀时 | 更新记忆和经验模式 |

### 搜索、研究与浏览验证

| Skill / 能力 | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| anysearch | 主线 | 选题、竞品、资料抽取 | 实时搜索、URL 内容抽取 |
| browser:control-in-app-browser | 主线 | 本地网站验证 | 打开 localhost、截图、交互检查 |
| chrome:control-chrome | 主线 | 登录态工具 | Google Trends、Search Console、Ads、AdSense |
| computer-use:computer-use | 可选 | 本地 App 操作 | 需要操作 Mac 桌面应用时 |
| playwright | 主线 | QA、页面验证、自动化测试 | 浏览器自动化、截图、核心流程检查 |
| openai-docs | 可选 | OpenAI API / Codex / 模型问题 | 查官方 OpenAI 文档 |
| pdf | 可选 | PDF 报告或资料 | 阅读、生成、视觉检查 PDF |

### 产品设计、前端与网站体验

| Skill | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| impeccable | 主线 | 工具站 UI / 工作站 UI | 产品体验、视觉层级、可用性改进 |
| product-design:index | 可选 | 不确定 Product Design 能力时 | 发现 Product Design 具体 skill |
| product-design:get-context | 主线 | 产品设计、原型、UI 工作前 | 设计 brief gate |
| product-design:ideate | 可选 | 多个 UI 方向探索 | 生成视觉/交互方向 |
| product-design:image-to-code | 可选 | 有截图或 mockup 时 | 把图片实现为前端 |
| imagegen | 可选 | 需要位图素材 | 生成图片、图标草案、宣传图 |

### 文档、表格、演示交付

| Skill / 插件 | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| spreadsheets:Spreadsheets | 主线 | 选题评分、关键词、成本收益 | 创建和维护表格 |
| documents:documents | 主线 | 服务报告、客户交付 | 创建和编辑 docx / 文档 |
| presentations:Presentations | 可选 | 提案、复盘、销售材料 | 生成 PPT / deck |

### HyperFrames、视频与动画

| Skill | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| hyperframes | 可选 | 自媒体、演示视频 | 创建 HTML 视频、字幕、动画 |
| hyperframes-cli | 可选 | HyperFrames 项目执行 | 初始化、预览、检查、渲染 |
| hyperframes-media | 可选 | 视频素材预处理 | TTS、转录、字幕、背景移除 |
| hyperframes-registry | 可选 | 复用视频组件 | 安装字幕、转场、组件 |
| website-to-hyperframes | 可选 | 已有网站转视频 | 从 URL 生成 promo / product tour |
| remotion-to-hyperframes | 暂缓 | 迁移 Remotion 项目时 | 仅显式迁移时使用 |
| gsap / hyperframes:gsap | 可选 | HyperFrames 动画 | GSAP 动画模式 |
| animejs | 可选 | HyperFrames 动画 | Anime.js 动画模式 |
| css-animations | 可选 | HyperFrames 动画 | CSS 动画确定性适配 |
| waapi | 可选 | HyperFrames 动画 | Web Animations API 适配 |
| lottie | 可选 | HyperFrames 动画 | Lottie / dotLottie 适配 |
| three | 可选 | 3D 视频或网页元素 | Three.js / WebGL |
| typegpu | 可选 | GPU 视觉 | WebGPU / shader / particles |
| tailwind | 可选 | HyperFrames Tailwind 项目 | Tailwind v4 HyperFrames 模式 |

### Creative Production

| Skill | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| creative-production:explore | 可选 | 商业创意入口 | 选择定位、moodboard、广告、logo 等方向 |
| creative-production:positioning-explorer | 可选 | 服务定位或客户项目 | 探索商业定位路线 |
| creative-production:moodboard-explorer | 可选 | 品牌/视觉方向 | 生成 moodboard |
| creative-production:scene-explorer | 可选 | 产品或服务场景 | 生成商业场景方向 |
| creative-production:shot-explorer | 可选 | 已有图片变体 | 产品图角度、裁切、细节探索 |
| creative-production:ads-explorer | 可选 | 自媒体/广告素材 | 广告方向和 prompt 探索 |
| creative-production:offer-explorer | 可选 | 服务或产品 offer | 生成 offer-led 创意方向 |
| creative-production:logo-explorer | 可选 | 品牌包装 | logo 和身份系统探索 |
| creative-production:generative-polish | 可选 | 已有资产优化 | 保持文字和数据的视觉增强 |

### 商业化与 OPC

| Skill | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| opc-commercial-closure | 可选 | 服务化和报价设计 | 从模糊需求转成 offer、销售、交付循环 |

### Skill / Plugin 自身维护

| Skill | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| skill-creator | 维护 | 创建新 skill | 把稳定流程沉淀成 Codex skill |
| writing-skills | 维护 | 编辑和验证 skill | 写有效 skill |
| skill-installer | 维护 | 安装外部 skill | 从 curated 或 GitHub 安装 skill |
| plugin-creator | 维护 | 创建本地插件 | 建立 Codex plugin |
| contribute-catalog | 暂缓 | 贡献 HyperFrames 公共目录 | 仅明确要上游贡献时使用 |

### 社媒与外部分发工具

| Skill / 工具 | 优先级 | 可能使用阶段 | 用途 |
|---|---|---|---|
| Douyin search / automation / download tools | 暂缓 | 中文自媒体或抖音运营 | 搜索、下载、发布、评论管理 |
| speech_recognition | 可选 | 视频/音频转文字 | 转录访谈、教程、素材 |
| node_repl | 可选 | JS 快速计算或原型 | 快速脚本、数据处理、图表预览 |

## 重点插件：Product Design

Product Design 不是选题研究插件，它适合在“需要把流程变成可用产品界面”时介入。

最适合的 ToolSite OS 场景：

- 设计选题工作站的交互界面。
- 把表格式流程变成可视化 dashboard。
- 设计客户自助工具的输入表单、结果页、评分卡和报告预览。
- 根据已有截图或参考站，生成可交互前端原型。
- 对工具站页面做产品体验审查。

优先调用的 skill：

| Skill | 使用时机 |
|---|---|
| product-design:get-context | 任何产品设计、原型、UI 工作开始前 |
| product-design:ideate | 需要探索多个界面方向 |
| product-design:image-to-code | 已有截图、Image Gen 图或明确 mockup，需要实现为前端 |
| product-design:index | 不确定 Product Design 内哪个能力最适合时 |

在选题工作站中的位置：

```text
第一版：不必调用，先用 Markdown / 表格跑通流程。
第二版：当选题工作站要做成内部 dashboard 时调用。
第三版：当客户自助工具需要原型或 UI 实现时调用。
```

使用原则：

- 没有产品界面需求时不调用。
- 当表格流程开始阻碍效率时调用。
- 客户自助化前必须调用，用来设计输入、输出、解释和信任感。

## 重点插件：HyperFrames by HeyGen

HyperFrames 不是建站插件，它适合把已有内容、网站或流程变成视频资产。

最适合的 ToolSite OS 场景：

- 把已上线工具站做成 30-60 秒演示视频。
- 把“从选题到上线”的过程做成 build-in-public 视频。
- 为自媒体账号生成教程、复盘、案例短视频。
- 把客户案例或工具站成果做成服务销售视频。
- 把网站页面捕获后转成 promo 或 product tour。

优先调用的 skill：

| Skill | 使用时机 |
|---|---|
| hyperframes | 从零创建 HTML 视频、动画、字幕、配音、转场 |
| website-to-hyperframes | 基于已有 URL 或网站生成视频 |
| hyperframes-cli | 初始化、预览、检查、渲染 HyperFrames 项目 |
| hyperframes-media | TTS、转录、字幕、背景移除等素材预处理 |
| hyperframes-registry | 安装和复用字幕、转场、组件 |

在 ToolSite OS 中的位置：

```text
选题阶段：通常不调用。
MVP 上线后：用于工具站演示视频。
复盘阶段：用于自媒体内容。
服务化阶段：用于客户案例视频和销售素材。
```

使用原则：

- 没有可展示的网站、流程或案例时不急着调用。
- 一旦有 MVP，上线复盘应考虑调用。
- 如果用户只给一个 URL 并希望做视频，优先使用 `website-to-hyperframes`。

### OpenAI 与技术文档类

| Skill | 使用时机 | 说明 |
|---|---|---|
| openai-docs | OpenAI API、模型、Codex、ChatGPT 产品问题 | 必须优先官方文档 |
| systematic-debugging | 遇到 bug、测试失败、异常行为 | 先定位再修复 |
| test-driven-development | 实现功能或修 bug 前 | 适合代码功能开发 |

## 全局阶段调用地图

### 阶段一：选题验证

优先调用：

- `brainstorming`：设计选题工作站。
- `anysearch`：读取外部文章、竞品页面、教程。
- `web search`：验证当前工具政策、价格、规则和 SEO 资料。
- `spreadsheets`：生成选题评分表和研究台账。
- `chrome:control-chrome`：需要登录 Google Trends / Ads / Search Console 时使用。

不优先调用：

- HyperFrames、Creative Production、Product Design，除非需要内容或可视化交付。

### 阶段二：建站 MVP

优先调用：

- `brainstorming`：确认 MVP 设计。
- `writing-plans`：拆实施计划。
- `test-driven-development`：核心工具函数和计算逻辑。
- `impeccable`：工具站 UI/UX 设计。
- `product-design:get-context`：需要把工具站或工作站做成产品原型时使用。
- `Browser`：本地打开验证。
- `playwright`：核心流程、移动端、死链、截图验证。
- `verification-before-completion`：完成前检查。

设计闸门：

```text
MVP Brief
→ 技术实现
→ impeccable / Product Design 语境确认
→ 设计诊断，不直接大改
→ 每轮 4-5 个 UI 目标小批次修复
→ 桌面端 / 移动端浏览器验收
→ 反 AI 味检查
→ 再进入部署
```

注意：

- 功能测试通过不等于可上线。
- 页面类项目必须真实打开浏览器查看。
- 设计修复必须写清不可破坏约束，例如核心计算逻辑、SEO 页面矩阵、桌面端布局和移动端可用性。

### 阶段三：SEO 与上线

优先调用：

- `web search`：查官方 SEO / Search Console / AdSense 要求。
- `chrome:control-chrome`：登录 Search Console、Google Ads、AdSense。
- `playwright`：检查 sitemap、robots、canonical、表单、移动端。
- `spreadsheets`：记录收录、关键词、impressions、CTR。

### 阶段四：推广与内容

优先调用：

- `hyperframes` 或 `website-to-hyperframes`：把工具站做成演示视频、教程视频或复盘视频。
- `creative-production:ads-explorer`：广告方向和素材探索。
- `presentations`：做复盘 deck 或服务提案。
- `documents`：做客户报告或服务说明。

### 阶段五：服务化

优先调用：

- `documents`：生成选题验证报告。
- `spreadsheets`：生成客户版评分表。
- `presentations`：生成提案 deck。
- `creative-production`：客户品牌或广告视觉探索。
- `self-learning`：把服务交付经验沉淀成可复用模式。

## 模块级调用地图：选题工作站

| 流程步骤 | 推荐插件 / skill | 调用理由 |
|---|---|---|
| 赛道设定 | brainstorming | 明确目标、边界和方案 |
| 候选生成 | 无需插件，使用结构化 Prompt | 先生成候选，不需要外部数据 |
| 风险分层 | web search / anysearch | 高风险领域需查官方政策或可信资料 |
| 搜索词拆解 | 无需插件，使用结构化 Prompt | 主要是语言和搜索意图拆解 |
| 免费数据采集 | Chrome / Browser / anysearch | Google 工具、竞品页面、SERP 观察 |
| 对标网站分析 | anysearch / web search / Browser | 读取竞品页面、提取页面结构和弱点 |
| 商业价值验证 | spreadsheets | 汇总评分、收益潜力、置信度 |
| 推荐 MVP Brief | documents 或 Markdown | 自用用 Markdown，客户交付用 docx |
| 复盘沉淀 | self-learning / 08-knowledge | 提炼可复用经验 |

说明：

- 上表是第一个模块级地图，用于和选题工作站设计文档保持一致。
- 后续建站工作站、SEO 工作站、上线体检工作站、30 天复盘工作站，都应在各自 spec 中维护模块级调用地图。
- 全局地图只负责说明“哪个阶段通常用什么”，不替代具体模块的调用设计。

## 调用原则

- 能用项目文档解决的，不强行调用插件。
- 需要当前信息的，必须搜索或浏览验证。
- 需要登录态的，优先用 Chrome，而不是普通网页抓取。
- 需要本地前端验证的，优先用 Browser，再用 Playwright 自动化。
- 面向客户交付时，优先使用 Documents、Spreadsheets、Presentations。
- 面向自媒体传播时，优先使用 HyperFrames 和 Creative Production。
- 每次完成关键产出前，使用 `verification-before-completion` 做证据检查。

## 工具缺口发现机制

流程设计过程中，如果发现当前插件或 skill 不能很好覆盖某个关键环节，必须主动做工具缺口分析。

步骤：

```text
1. 说明当前缺口是什么
2. 判断是一次性问题，还是未来会反复出现的问题
3. 提炼 GitHub 搜索关键词
4. 搜索相关开源项目、CLI、MCP、Codex skill 或可集成工具
5. 比较候选工具的维护状态、使用成本、集成难度和风险
6. 给出是否补充工具的建议
```

常见搜索关键词模式：

| 缺口 | GitHub 搜索关键词 |
|---|---|
| SERP 数据采集 | `serp api cli`, `google serp scraper`, `serp mcp` |
| 关键词研究 | `keyword research cli`, `google trends python`, `keyword planner api` |
| SEO 检查 | `seo audit cli`, `lighthouse seo report`, `sitemap validator` |
| Search Console | `google search console api`, `search console cli`, `gsc mcp` |
| AdSense / 广告估算 | `adsense api`, `rpm estimator`, `display ads revenue calculator` |
| 站点 QA | `playwright website audit`, `broken link checker`, `accessibility audit cli` |
| 报告生成 | `markdown to docx report`, `docx template cli`, `pdf report generator` |
| 工作流自动化 | `mcp server`, `codex skill`, `agent workflow cli` |

补充原则：

- 先用现有工具完成验证，再考虑新增工具。
- 新工具必须解决高频、关键、可复用问题。
- 不为了自动化而牺牲合规、稳定性和可解释性。
- 需要账号、API key、付费或外部服务时，必须先向用户说明成本和风险。
