# S2 建站工作站设计

日期：2026-06-12

> 以 dim-weight-calculator MVP 实际构建经验反推设计。
> 升版自 v0.1 骨架：目标/输入/输出/步骤/质量门槛 → 完整模块化设计。

## 1. 定位

S2 建站工作站是 ToolSite OS 五站串联的第二站。

它不是"拿到 Brief 就开始写代码"的作坊模式，而是一个**约束驱动的建造管线**：

```text
MVP Brief（S1 输出）
→ 项目骨架生成
→ 纯函数逻辑层（红-绿测试）
→ 数据层（来源、配置、常量）
→ UI 组件层（交互 + 可访问性）
→ 页面组装层（路由 + SEO + 内容）
→ 质量验证（测试 + 构建 + 可访问性）
→ 输出给 S3 上线工作站的已构建站点
```

核心原则：**先让逻辑正确，再让界面好看。先让测试通过，再让页面完整。**

## 2. 第一版边界

### 技术栈锁定

| 层 | 选型 | 锁定原因 |
|---|------|---------|
| 框架 | Astro 5 (static mode) | 零 JS 默认输出，按需 hydration |
| UI 交互 | React 19 | 组件化交互，`client:visible` 懒加载 |
| 样式 | Tailwind CSS 4 | 原子化，无命名冲突，构建时 tree-shaking |
| 类型 | TypeScript 5 strict | Astro 原生支持，编译期错误拦截 |
| 测试 | Vitest 4 + @testing-library/react + jsdom | 纯逻辑 + 组件测试统一运行器 |
| 包管理 | npm | 零额外依赖 |

### 功能边界

- ✅ 单页工具型站点（一个核心计算/转换/生成功能）。
- ✅ 纯前端逻辑，不需要账号、支付、API、数据库。
- ✅ 静态输出，可直接部署到任何静态托管（Vercel/Netlify/Cloudflare Pages）。
- ❌ 不做用户系统、后台、实时数据、第三方 API 集成。
- ❌ 不做多页营销站（那是 S4 的内容工作站的职责）。
- ❌ 不做 A/B 测试或多语言（那是上线后迭代的事）。

### 多页面策略

从 MVP 经验反推：一个 React 组件 + 不同 carrier prop = 5 个 SEO 页面。

```text
dim-weight-calculator 案例：
  1 个 React 组件 × 5 个 carrier 配置
  → 1 个通用页 + 4 个品牌页
  → 覆盖 "dimensional weight calculator" + "[carrier] dimensional weight calculator" 关键词
```

建站工作站必须识别 MVP Brief 中是否存在类似的**品牌/变体参数化机会**，并在页面生成前规划多页面结构。

## 3. 项目骨架标准

### 3.1 目录结构（从 MVP 反推）

```text
02-site-builds/<project-slug>/
├── astro.config.mjs          # site + base 环境变量入口
├── package.json              # 标准脚本集
├── tsconfig.json             # extends astro/tsconfigs/strict
├── vitest.config.ts          # jsdom environment
├── .gitignore                # node_modules, dist, .astro, .env
├── public/
│   └── favicon.svg
└── src/
    ├── components/           # Astro 布局 + React 交互组件
    │   ├── ToolLayout.astro  # 共享布局（header + nav + SEO meta）
    │   └── <Calculator>.tsx  # 核心交互组件
    ├── content/              # 静态数据、配置、公式来源
    │   └── <formulaSources>.ts
    ├── lib/                  # 纯函数：计算、验证、单位转换、数值处理
    │   ├── <calculation>.ts  # 核心计算逻辑
    │   ├── validation.ts     # 输入解析与校验
    │   ├── rounding.ts       # 数值精度控制
    │   └── units.ts          # 单位转换
    ├── pages/                # Astro 路由页面
    │   ├── index.astro       # 通用工具页
    │   └── <variant>.astro   # 品牌/变体页
    ├── styles/
    │   └── global.css        # Tailwind 入口 + 全局重置
    └── tests/                # Vitest 测试
        ├── <calculation>.test.ts
        ├── <validation>.test.ts
        ├── <units>.test.ts
        └── <Calculator>.test.tsx
```

### 3.2 `package.json` 锁定脚本

```json
{
  "scripts": {
    "dev": "ASTRO_TELEMETRY_DISABLED=1 astro dev",
    "build": "ASTRO_TELEMETRY_DISABLED=1 astro check && ASTRO_TELEMETRY_DISABLED=1 astro build",
    "preview": "ASTRO_TELEMETRY_DISABLED=1 astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

关键约束：
- `build` 必须包含 `astro check`（类型检查前置），不允许跳过。
- `ASTRO_TELEMETRY_DISABLED=1` 降低外部依赖风险。

### 3.3 `astro.config.mjs` 锁定模式

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  base: process.env.BASE_PATH ?? "/",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

约束：
- `site` 和 `base` 必须走环境变量，不写死域名。
- 本地开发默认 `localhost:4321`。

### 3.4 依赖锁定

```json
{
  "dependencies": {
    "@astrojs/react": "^4",
    "@tailwindcss/vite": "^4",
    "astro": "^5",
    "react": "^19",
    "react-dom": "^19",
    "tailwindcss": "^4"
  },
  "devDependencies": {
    "@astrojs/check": "^0",
    "@testing-library/react": "^16",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "jsdom": "^29",
    "typescript": "^5",
    "vitest": "^4"
  }
}
```

## 4. 工作流模块

### 4.0 输入契约：MVP Brief 验收

建站工作站不是拿到任何 Brief 都开工。先验收 S1 输出的 MVP Brief 是否包含建站所需全部信息：

| 必须字段 | 来源 | 缺失时的处理 |
|---------|------|------------|
| 工具名称 + slug | S1 Brief | 退回 S1 |
| 主关键词 + 3-5 长尾词 | S1 Brief | 退回 S1 |
| 输入字段定义（字段名、类型、单位、范围） | S1 Brief | 可推断，但需标注"从用例反推，未在 Brief 中明确" |
| 输出结果定义（结果名、类型、单位） | S1 Brief | 同上 |
| 计算公式或数据来源链接 | S1 Brief | **阻塞** — 无公式不可建站 |
| 对标网站 URL（≥1 个） | S1 Brief | 警告，但不阻塞 |
| 风险等级 + 免责声明要点 | S1 Brief | 警告，但不阻塞 |
| SEO title / description / H1 | S1 Brief | 可自行生成，但需标注"未经验证" |
| FAQ（≥3 条） | S1 Brief | 可自行生成 |

Stop-loss：如果计算公式/数据来源缺失且无法从公开渠道补充 → **退回 S1，不建站。**

### 4.1 项目初始化

```
输入：MVP Brief（已验收）
输出：可运行的空项目骨架（dev server 可启动）
```

步骤：
1. 创建项目目录 `02-site-builds/<slug>/`。
2. 写入 `package.json`、`tsconfig.json`、`astro.config.mjs`、`vitest.config.ts`、`.gitignore`。
3. `npm install`。
4. 创建 `src/` 子目录结构（components/content/lib/pages/styles/tests）。
5. 创建 `public/favicon.svg`。
6. 写入 `src/styles/global.css`（Tailwind 入口 + 全局重置）。
7. 创建最小 `src/pages/index.astro`（仅 ToolLayout + 占位文字）。
8. `npm run dev` → 确认 localhost 可访问。

质量检查：dev server 启动成功 + 0 TypeScript 错误。

### 4.2 纯函数逻辑层（先写测试）

```
输入：MVP Brief 中的计算公式/转换规则
输出：通过测试的纯函数模块（lib/）
```

**这是建站工作站的核心模块。逻辑层不依赖 React、不依赖 DOM、不依赖 Astro。**

步骤：
1. 识别 Brief 中的计算规则。
2. 设计函数签名（输入类型 → 输出类型）。
3. **先写测试**（红阶段）：
   - 正常输入 → 预期输出。
   - 边界值（0、负数、极大值、NaN、Infinity）。
   - 精度要求（如 10.075 → 10.08）。
4. 实现纯函数（绿阶段）。
5. 提取共享工具（rounding、validation、units）。
6. 跑 `npm run test` → 全部通过。

必须覆盖的纯函数模块：

| 模块 | 职责 | 从 MVP 反推的模板 |
|------|------|-----------------|
| `calculation.ts` | 核心计算逻辑 | `dimensionalWeight.ts` |
| `validation.ts` | 输入解析 + 校验 | `parsePositiveNumber` pattern |
| `rounding.ts` | 精度控制（10.075→10.08） | e2/e-2 乘除取整法 |
| `units.ts` | 单位转换（如需要） | inch↔cm, lb↔kg |

纯函数必须满足：
- 输入无效时 `throw new Error("field must be greater than 0")`，不返回 `null`/`undefined`。
- 所有数值输出经过 `roundToTwo`。
- 不依赖任何外部状态或环境变量。

### 4.3 数据层

```
输入：MVP Brief 中的公式来源、配置参数、常量
输出：content/ 目录下的类型安全数据模块
```

步骤：
1. 定义 TypeScript 类型（如 `CarrierFormula` interface）。
2. 将 Brief 中的公式来源、参数、常量转为 typed const 数据。
3. 每个配置项必须包含 `sourceUrl`、`sourceDate`、`confidence` 字段。
4. 提供 lookup 函数（如 `getFormulaByCarrier`）。

约束：
- 不允许在组件中硬编码公式参数。
- 不允许编造 `sourceUrl` 或 `sourceDate`。
- 来源缺失时标记 `confidence: "low"`，`sourceDate: "Needs source review before launch"`。

### 4.4 交互组件层

```
输入：纯函数模块 + 数据模块
输出：可交互的 React 组件（通过组件测试）
```

步骤：
1. 设计表单状态（useState）。
2. 用 useMemo 包裹计算逻辑。
3. 实现表单字段（input/select），绑定状态。
4. 实现结果展示区。
5. **写组件测试**：
   - HTML 约束与 JS 校验一致性（`min`、`step` 属性）。
   - ARIA 标记（`role="status"`、`aria-live="polite"`）。
   - 辅助技术可感知结果变化。
6. 跑 `npm run test` → 全部通过。

必须遵守的交互层契约：

| 规则 | 理由 | 从 MVP 验证 |
|------|------|-----------|
| 所有数字输入 `type="number"` | 移动端弹出数字键盘 | ✅ |
| 所有数字输入 `min="0.01"` `step="any"` | 允许小数，禁止零/负数 | ✅ 组件测试断言 |
| 结果区 `role="status"` `aria-live="polite"` | 屏幕阅读器自动播报结果变化 | ✅ 组件测试断言 |
| `client:visible` 非 `client:load` | 不影响首屏渲染 | ✅ 5 页全部验证 |
| `inputMode="decimal"` | 移动端优化 | ✅ |
| 禁用态 `disabled:cursor-not-allowed disabled:bg-slate-100` | 自定义 carrier 时才可编辑 divisor | ✅ |

### 4.5 页面组装层

```
输入：通过测试的组件 + 数据模块
输出：包含 SEO 元信息、内容、交互组件的完整 Astro 页面
```

步骤：
1. 创建 `ToolLayout.astro`（共享布局）：
   - `<head>` 中动态 `title` + `description`。
   - `<header>` 导航（Calculator / Formula / Sources / Disclaimer 锚点）。
   - `<nav aria-label="Page sections">`。
2. 创建通用工具页 `index.astro`：
   - H1 + 工具描述 + carrier 标签。
   - `<Calculator client:visible />`。
   - 公式说明 section。
   - 免责声明 section。
3. 创建品牌/变体页（如 Brief 中有参数化机会）：
   - 每页 `<Calculator client:visible defaultCarrier="xxx" />`。
   - 独立 SEO title/description/H1。
4. 创建 `FormulaSourceNote.astro`（来源展示组件）：
   - 显示公式、置信度、来源日期、来源链接。
   - `confidence: "low"` 时视觉降级。

SEO 检查清单（每页）：
- [ ] `<title>` 含主关键词。
- [ ] `<meta name="description">` 含主关键词 + 行动召唤。
- [ ] H1 含主关键词。
- [ ] 页面至少 1 个 `<section>` 有 `id` 锚点。
- [ ] 免责声明在独立 `<section id="disclaimer">`。
- [ ] 来源链接 `rel="noreferrer" target="_blank"`。

### 4.6 质量验证

```
输入：已构建的完整站点
输出：验证报告（通过/不通过 + 具体问题清单）
```

步骤：
1. `npm run test` → 所有测试必须通过。
2. `npm run build` → 0 errors，0 warnings。
3. 手动检查（或用浏览器工具）：
   - 移动端布局不溢出。
   - 表单可正常输入并得到结果。
   - 结果变化时屏幕阅读器可感知（VoiceOver 验证）。
   - 所有来源链接可点击。
   - 免责声明可见。
4. 对照 MVP Brief 核对：
   - 输入字段是否与 Brief 一致。
   - 输出结果是否与 Brief 一致。
   - 公式/数据来源是否正确标注。

## 5. 质量门槛（详细版）

> 从 v0.1 骨架的 4 条基础门槛扩展为 12 条可验证规则。

### 真实性

| # | 规则 | 验证方式 |
|---|------|---------|
| Q1 | 不编造公式、搜索量、收益、来源 URL | 代码审查：`sourceUrl` 必须是真实可访问的 URL |
| Q2 | 数据来源标注 `sourceDate` 和 `confidence` | `content/` 下所有配置记录必须包含这两个字段 |
| Q3 | `confidence: "low"` 的来源必须在 UI 中视觉降级 | 组件测试或截图对比 |

### 正确性

| # | 规则 | 验证方式 |
|---|------|---------|
| Q4 | 纯函数测试覆盖正常输入、边界值、无效输入 | 测试文件必须 `it.each` 覆盖 0/-1/NaN/Infinity |
| Q5 | HTML `min`/`step` 约束与 JS `parsePositiveNumber` 校验一致 | 组件测试断言 `getAttribute("min")` 和 `getAttribute("step")` |
| Q6 | 精度：半美分值向上取整（10.075 → 10.08） | 测试用例覆盖半美分场景 |

### 可访问性

| # | 规则 | 验证方式 |
|---|------|---------|
| Q7 | 结果变化对辅助技术可感知（`role="status"` + `aria-live="polite"`） | 组件测试断言 |
| Q8 | 导航标记 `aria-label` | 代码审查 |
| Q9 | 表单 label-input 正确关联 | HTML 结构审查 |

### 性能

| # | 规则 | 验证方式 |
|---|------|---------|
| Q10 | 非首屏核心交互使用 `client:visible`，非 `client:load` | grep 确认零 `client:load` |
| Q11 | 构建输出 `dist/` 不包含 `.astro/` 或 `node_modules/` | `npm run build` 后检查 `dist/` |

### 部署就绪

| # | 规则 | 验证方式 |
|---|------|---------|
| Q12 | `astro.config.mjs` 中 `site` 和 `base` 使用环境变量，不写死域名 | 代码审查 |

## 6. Prompt 库

### 6.1 项目骨架生成 Prompt

```text
你是一个 Astro 5 项目初始化工具。请基于以下信息生成完整的项目骨架文件。

工具名称：<从 MVP Brief 填入>
slug：<从 MVP Brief 填入>
描述：<从 MVP Brief 填入>

请生成以下文件（完整内容，不是模板）：

1. package.json — 依赖锁定为 astro^5, react^19, tailwindcss^4, vitest^4, @testing-library/react^16, jsdom^29, typescript^5。
   脚本必须包含：dev/build（含 astro check）/preview/test/test:watch。所有脚本前面加 ASTRO_TELEMETRY_DISABLED=1。

2. tsconfig.json — extends astro/tsconfigs/strict，paths 包含 @components/*、@content/*、@lib/*。

3. astro.config.mjs — site 和 base 走环境变量，默认 localhost:4321。integrations: [react()]，vite plugins: [tailwindcss()]。

4. vitest.config.ts — jsdom environment。

5. .gitignore — node_modules, dist, .astro, .env, .env.*, *.log。

6. src/styles/global.css — @import "tailwindcss" + 全局重置。

7. src/components/ToolLayout.astro — 共享布局，动态 title/description，header 导航，main 插槽。

8. public/favicon.svg — 简单 SVG favicon。

不要跳过任何文件。每个文件输出完整内容，不要写"// ... existing code"。
```

### 6.2 纯函数逻辑设计 Prompt

```text
你是一个 TypeScript 纯函数设计专家。请基于以下工具规则设计计算逻辑。

工具名称：<从 MVP Brief 填入>
计算公式/规则：<从 MVP Brief 填入>
输入字段：<从 MVP Brief 填入>
输出结果：<从 MVP Brief 填入>
精度要求：半美分值向上取整（5 美分的一半 2.5 分，四舍五入到最近的美分）。

请设计：

1. 输入类型 interface。
2. 输出类型 interface。
3. 纯函数签名和实现（不依赖 React/DOM/Astro）。
4. 输入校验逻辑（抛出 Error，不返回 null/undefined）。
5. 所有数值输出经过 roundToTwo（使用 e2/e-2 乘除取整法）。
6. 如需单位转换，独立到 units.ts。

特别要求：
- 无效输入（0、负数、NaN、Infinity）必须 throw Error。
- Error message 格式："<field name> must be greater than 0"。
- 不要写测试——测试会单独由 6.3 Prompt 处理。
```

### 6.3 红-绿测试生成 Prompt

```text
你是一个 Vitest 测试编写专家。请为以下纯函数生成完整的测试文件。

纯函数代码：<粘贴 6.2 输出的纯函数代码>

请生成测试覆盖：

1. 正常输入 → 预期输出（提供具体数值）。
2. it.each 覆盖所有字段的无效输入：
   - 0
   - 负数
   - NaN
   - Infinity
3. 精度测试：半美分值（如 10.075 → 10.08）。
4. 边界测试：极大值、极小正常值。
5. 每个测试用例必须有明确的输入值和预期输出值（不能是"期望不报错"这种模糊断言）。

使用 describe/it/expect 风格。不要使用 test.each 以外的参数化方案。
```

### 6.4 交互组件生成 Prompt

```text
你是一个 React 19 + TypeScript 组件开发专家。请基于以下信息生成工具计算器组件。

纯函数模块：<粘贴 lib/ 下的函数签名>
数据类型：<粘贴 content/ 下的数据模块>
输入字段：<字段名、类型、单位、默认值>
输出结果：<结果名、类型、单位>

组件要求：

1. useState 管理表单状态。
2. useMemo 包裹计算逻辑。
3. 所有 <input type="number"> 必须有：
   - inputMode="decimal"
   - min="0.01"
   - step="any"
4. 所有 <select> 的 onChange 必须正确更新状态。
5. 结果区用 <div role="status" aria-live="polite" aria-label="Calculation result"> 包裹。
6. 无效输入时显示"Check inputs"提示，不乱崩溃。
7. 使用 Tailwind CSS 4 原子类，不使用自定义 CSS。
8. disabled 输入框样式：disabled:cursor-not-allowed disabled:bg-slate-100。
9. 表单用 onSubmit={e => e.preventDefault()} 防止页面刷新。

不要写测试——测试会单独处理。
```

### 6.5 组件测试生成 Prompt

```text
你是一个 @testing-library/react 测试编写专家。请为以下 React 组件生成组件级测试。

组件代码：<粘贴 6.4 输出的组件代码>
默认 props：<如 defaultCarrier="fedex">

请生成测试覆盖：

1. HTML 约束一致性测试：
   - 每个数字输入 getAttribute("min") === "0.01"
   - 每个数字输入 getAttribute("step") === "any"
   - 使用 getByLabelText 按 label 文本查找输入框。

2. ARIA 可访问性测试：
   - 结果区 getByRole("status", { name: "Calculation result" })
   - getAttribute("aria-live") === "polite"

使用 render + screen + describe/it/expect。不要测试计算结果——那属于纯函数测试。
```

### 6.6 页面组装 Prompt

```text
你是一个 Astro 5 页面开发者。请基于以下信息生成工具站页面。

工具名称：<从 MVP Brief 填入>
主关键词：<从 MVP Brief 填入>
SEO title：<从 MVP Brief 填入>
SEO description：<从 MVP Brief 填入>
React 组件：<组件导入路径>
数据模块：<来源配置导入路径>

请生成：

1. 通用工具页（index.astro）：
   - ToolLayout 包裹，动态 title/description。
   - H1 含主关键词。
   - 工具描述段落（2-3 句）。
   - 支持的 carrier/变体标签云。
   - 快速参考卡片（默认公式、输出类型、使用场景）。
   - <Calculator client:visible />。
   - 公式说明 section（id="formula"）。
   - 免责声明 section（id="disclaimer"）。
   - <FormulaSourceNote /> 组件。

2. 品牌/变体页（如有参数化机会，参考 dim-weight-calculator 的 FedEx/UPS/USPS/DHL 页模式）：
   - 独立 SEO title/description/H1。
   - <Calculator client:visible defaultXxx="xxx" />。
   - 独立 FormulaSourceNote。

3. FormulaSourceNote.astro：
   - 显示公式、置信度 badge、来源日期、来源链接。
   - confidence: "low" 时视觉降级（灰色/虚线边框）。
   - 来源链接 rel="noreferrer" target="_blank"。

4. ToolLayout.astro：
   - <nav aria-label="Page sections"> 含 Calculator/Formula/Sources/Disclaimer 锚点链接。
   - <header> 含 logo + 导航。
   - <main> 插槽。

所有页面必须包含完整的 <section> 内容（公式解释、FAQ 区域、免责声明），不要只放组件。
```

## 7. 数据结构

每个建站记录包含以下字段：

| 字段 | 说明 | 来源 |
|------|------|------|
| project_slug | 项目目录名 | S1 Brief |
| tool_name | 工具名称 | S1 Brief |
| primary_keyword | 主关键词 | S1 Brief |
| long_tail_keywords | 长尾关键词列表 | S1 Brief |
| mvp_scope | MVP 功能范围 | S1 Brief |
| input_fields | 输入字段定义 | S1 Brief |
| output_fields | 输出结果定义 | S1 Brief |
| formula_source | 计算公式/数据来源 URL | S1 Brief |
| carrier_variants | 品牌/变体列表（参数化机会） | 建站工作站 4.5 识别 |
| page_count | 生成的页面数 | 建站工作站 |
| test_count | 测试用例数 | npm run test 输出 |
| build_errors | 构建错误数 | npm run build 输出 |
| quality_gates_passed | 质量门槛通过数 / 12 | 建站工作站 4.6 |
| accessibility_verified | 可访问性标记是否通过 | 组件测试 + 手动 |
| source_confidence | 数据来源置信度分布 | content/ 统计 |
| date_built | 建站日期 | 系统 |
| handoff_to_s3 | 是否已交接给 S3 | 布尔 |
| known_issues | 已知但决定不阻塞的问题 | 自由文本 |

## 8. 从 MVP 构建中反推的关键模式

> 以下模式来自 dim-weight-calculator 的实际构建过程，编码为可复用规则。

### Pattern 1: 参数化多页面

```
识别条件：MVP Brief 中存在"品牌/运营商/地区"维度的参数差异。
处理方式：
  1 个 React 组件 + N 个配置实例
  → N+1 个 Astro 页面（1 个通用页 + N 个品牌页）
  → 每页独立 SEO 元信息
```

### Pattern 2: 先测试后实现

```
纯函数层必须 100% TDD。
组件层不强求 TDD，但要求先实现后立即补测试。
不允许"先写完所有代码再补测试"。
```

### Pattern 3: 共享工具优先提取

```
当同一个数值处理逻辑出现在 ≥2 个文件中时：
  → 提取到 lib/rounding.ts（精度）或 lib/units.ts（转换）
  → 不要在各模块中重复实现。
```

### Pattern 4: 环境变量入口

```
所有环境相关配置（域名、base path、API key）必须在 astro.config.mjs 中走 process.env。
本地开发默认值必须可用（localhost）。
```

### Pattern 5: 来源可追溯

```
所有公式参数、常量、配置项必须包含 sourceUrl / sourceDate / confidence 三个字段。
UI 层根据 confidence 调整视觉权重。
```

### Pattern 6: 构建即检查

```
build 脚本 = astro check（类型检查）+ astro build（构建）
类型错误不能等到运行时才发现。
```

## 9. 第一版成功标准

- 从 MVP Brief 到 `npm run build` 成功，全程无人工写代码介入。
- 生成的测试 ≥20 个用例，覆盖正常输入、边界值、无效输入、精度。
- 0 TypeScript 错误，0 构建警告。
- 12 条质量门槛全部通过或被标记为"已知不阻塞"。
- 多页面 SEO 机会被自动识别并生成（如果有参数化空间）。
- 能直接交接给 S3 上线 QA 与 SEO 工作站。

## 10. 与相邻工作站的接口

### 上游：S1 选题验证 → S2

```
S1 输出 MVP Brief（含公式来源、关键词、输入输出定义）
→ S2 验收 Brief 完整性
→ 如缺失关键字段 → 退回 S1
```

### 下游：S2 → S3 上线 QA 与 SEO

```
S2 输出已构建站点（dist/ + 源码 + 测试报告）
→ S3 检查 SEO 元信息、sitemap、移动端、免责声明
→ S3 配置真实域名并部署
```

### 下游：S2 → S4 Product Design QA（可选）

```
如果站点功能正确但视觉/UX 需要提升
→ S4 做产品级 UI 审查和修复
→ 不阻塞 S3 技术上线
```

## 11. 商业化演进

### 人工服务包

```
服务名称：工具站 MVP 建站包

客户输入：
- 工具名称 + 计算公式/规则
- 输入字段 + 输出结果
- SEO 关键词

交付物：
- 可运行的 Astro 5 项目（源码 + dist/）
- 纯函数测试套件
- 组件可访问性测试
- SEO 元信息已配置
- 部署就绪（环境变量入口）
```

### 半自动内部工作站

```
MVP Brief → 项目骨架自动生成 → Prompt 管道执行
→ AI 生成纯函数 + 测试 → AI 生成组件 + 测试
→ AI 生成页面 → 自动验证 → 人工 review
→ 部署
```

### 客户自助工具

暂不设计。等 S1-S5 内部全链路跑通后再考虑产品化。
