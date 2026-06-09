# Dimensional Weight Calculator 技术设计

## 1. 背景

本设计对应第一个 MVP：

```text
Free Multi-Carrier Dimensional Weight Calculator
```

研究来源：

- `01-research/deep-validation/2026-06-09-dimensional-weight-calculator.md`
- `01-research/competitor-audits/2026-06-10-dimensional-weight-competitor-audit.md`
- `01-research/official-sources/2026-06-10-dimensional-weight-formula-sources.md`
- `02-site-builds/mvp-briefs/2026-06-10-dimensional-weight-calculator-mvp-brief.md`

当前目标不是做完整工具平台，而是做第一个可上线、可收录、可验证流量的英文工具页。

## 2. 技术栈决策

### 采用

```text
Astro + React Islands + TypeScript + Tailwind + Vitest
```

### 选择理由

- Astro 适合 SEO 内容页和长尾页面矩阵。
- React Island 适合把计算器作为局部交互组件挂载，不让整页都变成重客户端应用。
- TypeScript 适合维护公式配置、单位换算和计算逻辑，降低公式错误风险。
- Tailwind 适合快速构建一致的工具页界面。
- Vitest 适合给公式、单位换算、取整和 billable weight 写测试。

### 暂不采用 Next.js

Next.js 更适合复杂 SaaS、登录、后台、API 和重交互应用。第一个 MVP 以 SEO + 计算器为主，用 Next.js 会增加不必要复杂度。

### 暂不采用纯静态 HTML

纯静态 HTML 实现快，但不利于后续多工具复用、测试、类型约束和长尾页面模板化。

## 3. 工程目录

站点工程目录：

```text
02-site-builds/dim-weight-calculator/
```

项目根目录继续作为 ToolSite OS 的经营、研究和自动化工作区。第一个实际站点作为子工程存在，避免把研究文档和站点源码混在一起。

建议目录：

```text
02-site-builds/dim-weight-calculator/
  astro.config.mjs
  package.json
  tsconfig.json
  src/
    components/
      DimensionalWeightCalculator.tsx
      FormulaSourceNote.astro
      ToolLayout.astro
    content/
      carrierPages.ts
      formulaSources.ts
    lib/
      dimensionalWeight.ts
      units.ts
      validation.ts
    pages/
      dimensional-weight-calculator.astro
      fedex-dimensional-weight-calculator.astro
      ups-dimensional-weight-calculator.astro
      usps-dimensional-weight-calculator.astro
      dhl-volumetric-weight-calculator.astro
    styles/
      global.css
    tests/
      dimensionalWeight.test.ts
      units.test.ts
```

## 4. 功能范围

### 第一版必须实现

| 模块 | 内容 |
|---|---|
| 主工具页 | `/dimensional-weight-calculator/` |
| 输入 | length、width、height、actual weight |
| 单位 | inches/lbs 与 cm/kg |
| 承运商 | FedEx、UPS、USPS、DHL、Custom |
| 计算结果 | dimensional weight、actual weight、billable weight |
| 公式说明 | 显示公式、divisor、单位、来源状态 |
| 风险说明 | 说明结果是 estimate，不等于最终运费账单 |
| SEO 内容 | What is dimensional weight、formula、examples、FAQ |
| 测试 | 覆盖公式、单位换算、billable weight 和错误输入 |

### 第一版暂缓

| 功能 | 原因 |
|---|---|
| 实时运费报价 | 需要承运商 API 和账号费率 |
| 用户账号 | MVP 不需要 |
| 批量 CSV | 增加开发复杂度 |
| 包装推荐 | 第二阶段增长功能 |
| 真实承运商价格比较 | 容易误导，且数据源复杂 |

## 5. 数据模型

公式配置必须是数据，不应写死在组件里。

```ts
export type UnitSystem = "imperial" | "metric";

export type FormulaConfidence = "high" | "medium" | "low";

export interface CarrierFormula {
  carrier: "fedex" | "ups" | "usps" | "dhl" | "custom";
  label: string;
  serviceScope: string;
  unitSystem: UnitSystem;
  divisor: number;
  formulaLabel: string;
  roundingNote: string;
  sourceUrl?: string;
  sourceDate?: string;
  confidence: FormulaConfidence;
  notes: string;
}
```

计算输入：

```ts
export interface DimensionalWeightInput {
  length: number;
  width: number;
  height: number;
  actualWeight: number;
  unitSystem: UnitSystem;
  divisor: number;
}
```

计算输出：

```ts
export interface DimensionalWeightResult {
  dimensionalWeight: number;
  actualWeight: number;
  billableWeight: number;
  cubicSize: number;
  divisor: number;
  unitLabel: "lb" | "kg";
}
```

## 6. 计算规则

核心公式：

```text
dimensional weight = length x width x height / divisor
billable weight = max(dimensional weight, actual weight)
```

第一版计算策略：

- 输入必须大于 0。
- 计算结果保留 2 位小数。
- 页面显示提醒：承运商可能会对尺寸和重量向上取整。
- 不在第一版自动模拟所有承运商取整细节，因为不同服务、地区和合约可能变化。
- Custom divisor 必须允许用户覆盖默认 divisor。

## 7. 页面与 SEO

### 主页面

```text
/dimensional-weight-calculator/
```

H1：

```text
Free Multi-Carrier Dimensional Weight Calculator
```

Title：

```text
Dimensional Weight Calculator for UPS, FedEx, USPS & DHL
```

Description：

```text
Calculate dimensional weight and billable weight for UPS, FedEx, USPS, DHL, and custom DIM factors. Supports inches/lbs and cm/kg.
```

### 首批长尾页面

第一版工程可先创建页面文件，但内容复用主计算器组件：

- `/fedex-dimensional-weight-calculator/`
- `/ups-dimensional-weight-calculator/`
- `/usps-dimensional-weight-calculator/`
- `/dhl-volumetric-weight-calculator/`

每个长尾页面默认选中对应 carrier，并在内容区解释对应公式来源状态。

## 8. UI 结构

页面优先做工具，不做营销首页。

首屏结构：

```text
Header
Tool title
Short explanation
Calculator panel
Result panel
Formula source note
```

内容结构：

```text
What is dimensional weight?
Formula
Carrier comparison
Examples
FAQ
Source notes
Disclaimer
```

视觉要求：

- 工具区要稳定，不因结果变化跳动。
- 移动端先显示输入，再显示结果。
- CTA 不要盖过工具体验。
- 不使用夸张 hero，不做营销落地页风格。

## 9. 错误处理

| 错误 | 行为 |
|---|---|
| 空输入 | 显示字段级提示，不计算 |
| 0 或负数 | 显示 `Enter a value greater than 0` |
| 非数字 | 输入控件限制为 number，仍在计算层校验 |
| divisor 无效 | Custom divisor 小于等于 0 时不计算 |
| 公式来源低置信度 | 显示 `Verify with carrier before shipping` |

## 10. 测试策略

### 单元测试

`dimensionalWeight.ts`：

- 正常计算 dimensional weight。
- billable weight 取 actual 和 dimensional 的较大值。
- 小数结果保留 2 位。
- 0、负数、NaN 输入抛出明确错误。

`units.ts`：

- inch/cm 换算。
- lb/kg 换算。
- 单位标签正确。

### 手工验收

- 桌面端：1440px。
- 平板端：768px。
- 手机端：390px。
- Calculator 输入和结果不重叠。
- carrier 切换后 divisor 和 source note 正确变化。

## 11. 部署策略

第一版优先静态部署：

- Cloudflare Pages 或 Vercel 均可。
- 不接数据库。
- 不接用户账号。
- 不接承运商 API。

部署前必须完成：

- `npm run build`
- 单元测试
- 移动端截图检查
- 页面 title / description 检查

## 12. 后续扩展

第二阶段可增加：

- 包装尺寸优化建议。
- 批量 CSV 计算。
- Amazon dimensional weight 页面。
- LTL / pallet / air freight / ocean freight 页面。
- shipping software affiliate 或服务导流。

## 13. 决策

本设计建议进入实施计划阶段。

实施前必须先完成：

1. 初始化 Git 仓库。
2. 提交本设计文档。
3. 写实施计划。
4. 再开始脚手架和代码实现。
