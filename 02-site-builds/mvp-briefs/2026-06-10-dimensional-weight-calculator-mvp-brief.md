# MVP Brief：Free Multi-Carrier Dimensional Weight Calculator

## 1. 产品定位

### 推荐名称

```text
Free Multi-Carrier Dimensional Weight Calculator
```

### 一句话定位

帮助电商卖家、跨境卖家和发货人员快速比较实际重量与体积重量，估算 UPS / FedEx / USPS / DHL 等承运商可能使用的计费重量。

### 不采用的定位

```text
Generic Dimensional Weight Calculator
```

原因：

- 泛主词已有 Red Stag、Omni Calculator、FedEx、ShippingEasy、ShipMonk 等结果。
- 单一公式计算器差异化弱。
- 多承运商、双单位、公式来源和可更新配置才是第一版能胜出的角度。

## 2. 目标用户

| 用户 | 场景 | 核心问题 |
|---|---|---|
| Shopify / WooCommerce 卖家 | 发大件但轻的商品 | 为什么实际重量很轻，运费却很高 |
| Amazon / marketplace 卖家 | 评估包装尺寸 | 改包装尺寸能不能降低计费重量 |
| 跨境卖家 | 比较国际运输规则 | cm/kg 和 inch/lb 怎么换算 |
| 仓库/运营人员 | 日常打包发货 | 哪个重量会被承运商用来收费 |
| 新手发货用户 | 第一次遇到 DIM weight | 公式是什么，怎么算，为什么要除以某个 divisor |

## 3. 核心用户任务

用户来到页面后，应该能在 30 秒内完成：

1. 输入包裹长、宽、高。
2. 输入实际重量。
3. 选择单位体系。
4. 选择承运商或自定义 divisor。
5. 得到 dimensional weight 和 billable weight。
6. 看懂当前公式来源和注意事项。

## 4. MVP 功能范围

### 必做

| 模块 | 要求 |
|---|---|
| 输入尺寸 | Length / Width / Height |
| 输入实际重量 | Actual weight |
| 单位切换 | inches/lbs 与 cm/kg |
| 承运商预设 | FedEx / UPS / USPS / DHL / Custom |
| Divisor 显示 | 选择承运商后显示 divisor，Custom 可编辑 |
| 结果 | Dimensional weight、Actual weight、Billable weight |
| 公式解释 | 显示当前公式，例如 `L x W x H / 139` |
| 取整说明 | 提醒承运商可能会 round up 尺寸和重量 |
| 来源说明 | 每个 preset 显示 source date / source link / confidence |
| 移动端体验 | 输入框和结果不能挤压，结果区优先可读 |

### 暂缓

| 功能 | 暂缓原因 |
|---|---|
| 实时运费报价 | 需要承运商 API、账号、费率协议，超出第一个 MVP |
| 用户账号 | 第一版无需保存历史记录 |
| 批量 CSV 上传 | 有价值，但会增加开发和测试复杂度 |
| 包装推荐算法 | 可作为第二阶段增长功能 |
| 真实 UPS / FedEx / DHL 价格比较 | 涉及费率、账号折扣、API 和准确性风险 |

## 5. 公式库要求

公式不能硬编码在 UI 组件里。第一版应使用可维护配置。

```text
carrier
label
service_scope
unit_system
divisor
formula
rounding_note
source_url
source_date
confidence
notes
```

### 初始配置策略

| Carrier | MVP 状态 | 原因 |
|---|---|---|
| FedEx | 可作为高置信 preset | 2026 FedEx Service Guide 可核验常用 `/ 139`，但要写明例外 |
| UPS | 可作为中高置信 preset | UPS Rate Guide 可核验 `/ 139`，上线前需复核最新年份 |
| USPS | 谨慎 preset | 当前 USPS DMM 页面显示 `/ 166`，但存在 2026 变更信号，需写 source date |
| DHL | 先放 Custom / common international | 暂未拿到稳定官方来源，避免强承诺 |
| Custom | 必做 | 解决不同承运商、不同地区、不同合约 divisor 的变化 |

## 6. 页面结构

### H1

```text
Free Multi-Carrier Dimensional Weight Calculator
```

### 首屏

- 左侧或顶部：计算器输入区。
- 右侧或下方：结果区。
- 结果区默认显示：
  - Dimensional weight
  - Actual weight
  - Billable weight
  - Selected carrier / divisor

### 内容区块

1. What is dimensional weight?
2. Dimensional weight formula
3. How billable weight is chosen
4. UPS vs FedEx vs USPS vs DHL DIM factors
5. Inches/lbs vs cm/kg
6. Examples
7. FAQ
8. Source notes and update log

## 7. SEO 页面矩阵

### 首发页面

| 页面 | URL 建议 | 目标 |
|---|---|---|
| 主工具页 | `/dimensional-weight-calculator/` | 主词和品牌入口 |

### 第一批长尾页面

| 页面 | URL 建议 | 关键词 |
|---|---|---|
| FedEx | `/fedex-dimensional-weight-calculator/` | fedex dimensional weight calculator |
| UPS | `/ups-dimensional-weight-calculator/` | ups dimensional weight calculator |
| USPS | `/usps-dimensional-weight-calculator/` | usps dimensional weight calculator |
| DHL | `/dhl-volumetric-weight-calculator/` | dhl volumetric weight calculator |
| KG | `/dimensional-weight-calculator-kg/` | dimensional weight calculator in kg |
| CM | `/dimensional-weight-calculator-cm/` | dimensional weight calculator in cm |
| Inches | `/dimensional-weight-calculator-inches/` | dimensional weight calculator in inches |

### 第二批观察页面

- `/amazon-dimensional-weight-calculator/`
- `/air-freight-dimensional-weight-calculator/`
- `/ocean-freight-dimensional-weight-calculator/`
- `/pallet-dimensional-weight-calculator/`
- `/ltl-dimensional-weight-calculator/`

## 8. 商业化设计

### 第一阶段

- AdSense：工具页和 FAQ 区域。
- 内链：引导到包装优化、shipping cost、cross-border seller tools。
- 邮件收集可暂缓，不要影响工具体验。

### 第二阶段

- 跨境物流/3PL 服务导流。
- 包装优化 checklist 下载。
- Shopify / Amazon seller 工具矩阵。
- Affiliate：shipping software、label tools、fulfillment services。

## 9. 风险声明

页面必须包含简短说明：

```text
This calculator provides an estimate based on publicly available dimensional weight formulas. Carrier rules, rates, rounding methods, and contract terms may change. Always verify the final billable weight and shipping cost with your carrier.
```

中文理解：

```text
我们算的是估算计费重量，不承诺等于最终运费账单。
```

## 10. 验收标准

第一版上线前必须满足：

| 项目 | 标准 |
|---|---|
| 计算正确 | 已用至少 10 组手算样例验证 |
| 单位正确 | inches/lbs 与 cm/kg 不混乱 |
| 公式可维护 | carrier preset 不是硬编码在组件里 |
| 来源清楚 | 每个承运商 preset 有 source URL / source date / confidence |
| 移动端可用 | 手机端输入和结果不重叠 |
| SEO 基础 | H1、title、description、FAQ、schema 初版具备 |
| 免责声明 | 明确说明 estimate，不承诺真实运费 |

## 11. 当前决策

推荐继续进入建站准备阶段。

下一步不是继续找新选题，而是：

1. 确定技术栈和站点目录。
2. 设计第一版数据结构。
3. 画出页面信息架构。
4. 开始实现主工具页。

## 12. 关联资料

- 深度验证任务卡：`01-research/deep-validation/2026-06-09-dimensional-weight-calculator.md`
- 对标站深验：`01-research/competitor-audits/2026-06-10-dimensional-weight-competitor-audit.md`
- 官方公式核验：`01-research/official-sources/2026-06-10-dimensional-weight-formula-sources.md`
- 五个候选汇总：`01-research/validation-summary-2026-06-10.md`
