# Dimensional Weight Calculator 对标站深验

## 基本信息

- 日期：2026-06-10
- 主关键词：`dimensional weight calculator`
- 目标市场：US / EN
- 当前阶段：第一个 MVP 候选深验

## 本轮结论

`Dimensional Weight Calculator` 的对标 SERP 不是空白市场，但竞争结构对新站并非完全不利。

页面类型主要分为四类：

1. 官方承运商工具：FedEx、USPS、UPS/DHL 相关官方页面。
2. 泛工具站：Omni Calculator。
3. 物流履约服务商：Red Stag、ShippingEasy、ShipMonk。
4. 货代/物流服务商：Pegasus、Amerijet、Cole International 等。

新站不适合做一个普通通用计算器。更合理的切入口是：

```text
Multi-carrier dimensional weight calculator
支持 UPS / FedEx / USPS / DHL
同时支持 inches/lbs 与 cm/kg
把公式来源和更新时间写清楚
围绕 kg / cm / inches / UPS / FedEx / DHL / USPS 做长尾页面
```

## 对标站拆解

| 网站 | 页面类型 | 已观察到的输入/功能 | 商业化/CTA | 可学习点 | 可超越点 |
|---|---|---|---|---|---|
| Red Stag Fulfillment | 3PL 服务商 + 计算器 | 公开搜索结果显示其标题强调 FedEx / UPS / USPS，页面定位为多承运商 DIM weight rates | 3PL fulfillment 导流 | 多承运商是正确方向；服务商页面可用工具获客 | 需要进一步确认移动端体验、单位支持、公式来源和是否只服务 3PL 获客 |
| Omni Calculator | 泛工具站 | 页面定位为解释 dimensional weight，并说明 FedEx / USPS / UPS 的计算方式 | 泛工具站广告/内链 | 内容解释能力强，适合学习 FAQ 和公式解释结构 | 可以做更垂直的跨境卖家体验、更清晰承运商比较、更少泛内容干扰 |
| FedEx | 官方工具 | 页面标题为 Dimensional Weight Calculator，提示输入包裹信息计算 dimensional weight | FedEx 官方服务入口 | 官方可信度最高，适合校验 FedEx 公式和字段 | 官方页面通常只服务 FedEx，不会比较其他承运商；我们可以做跨承运商解释和对比 |
| ShippingEasy | SaaS / 发货工具服务商 | 搜索结果显示支持 USPS / UPS Domestic 与 FedEx / International 维度计算，并提供 DIMENSIONAL WEIGHT 结果 | ShippingEasy SaaS 注册/试用导流 | `USPS/UPS Domestic` 与 `FedEx/International` 分组值得借鉴 | 可做更透明的公式表、更好的单位切换和更直接的长尾 SEO 页面 |
| ShipMonk | 3PL 服务商 + 计算器 | 页面说明测量 length / width / height 后计算 cubic size，再用 DIM factor 得到 dimensional weight | fulfillment 服务导流 | 适合学习履约服务商如何把免费工具转服务线索 | 可做多承运商、单位切换、公式来源和结果解释，避免只停留在 3PL 获客 |
| USPS | 官方邮政规则/工具 | USPS DMM 页面显示 Ground Advantage、Parcel Select、Priority Mail 对超过 1 cubic foot 的包裹用 L x W x H / 166 计算 dimensional weight | 官方邮政服务 | 官方规则可作为 USPS 公式来源之一 | 2026 年有第三方/新闻提到可能改 139，必须继续找 USPS 官方更新来源，不能贸然写死 |
| Pegasus Logistics | 物流服务商 + 简单工具 | 搜索摘要显示输入 pieces、length、width、height、actual weight、DIM factor | 物流服务导流 | 简单字段覆盖实际货运场景 | 可以做更现代的界面、更明确的 carrier presets，而不是要求用户自己填 DIM factor |

## 初步字段清单

第一版工具至少需要：

| 字段 | 必要性 | 说明 |
|---|---|---|
| Length | 必填 | 支持 inch / cm |
| Width | 必填 | 支持 inch / cm |
| Height | 必填 | 支持 inch / cm |
| Actual weight | 必填 | 支持 lb / kg，用于比较 billable weight |
| Carrier / formula preset | 必填 | UPS / FedEx / USPS / DHL / Custom |
| DIM divisor / volumetric divisor | 自动 + 可编辑 | 默认按 carrier preset，允许用户自定义 |
| Unit system | 必填 | US: inches/lbs；Metric: cm/kg |
| Package count | 可选 | Pegasus 这类货运工具会用到，MVP 可暂缓 |

## 结果区要求

第一版结果区至少输出：

| 输出项 | 说明 |
|---|---|
| Dimensional weight | 根据所选公式计算 |
| Actual weight | 用户输入的实际重量 |
| Billable weight | 取 dimensional weight 和 actual weight 的较大值 |
| Carrier formula note | 显示当前使用的 divisor 和单位 |
| Formula | 例如 `L x W x H / divisor` |
| Rounding note | 提醒承运商可能会对尺寸和重量取整 |

## 公式来源状态

| 承运商 | 当前公式线索 | 来源状态 | 风险 |
|---|---|---|---|
| FedEx | 搜索结果和 FedEx 官方工具均指向 dimensional weight calculator；FedEx Service Guide PDF 可作为后续官方校验来源 | 待官方 PDF / 页面二次确认 | 中 |
| UPS | 搜索摘要和对标页常见 139 / 166 差异 | 待 UPS 官方页面或 rate guide 确认 | 中 |
| USPS | USPS DMM 页面显示 `/ 166`；但 2026 年存在第三方/新闻提到改 139 的冲突信号 | 必须以 USPS 官方最新页面为准 | 高 |
| DHL | 常见国际公式为 cm / 5000 或 cm / 6000，不同 DHL 服务可能不同 | 待 DHL 官方页面确认 | 中 |

## MVP 产品判断

可以继续做第一个 MVP，但产品定位要改成：

```text
Free Multi-Carrier Dimensional Weight Calculator
```

不要只写：

```text
Dimensional Weight Calculator
```

原因：

- 泛主词已有强站和服务商站。
- 多承运商比较是 SERP 中反复出现但仍可做得更清晰的需求。
- `in kg`、`in cm`、`in inches`、`UPS`、`FedEx`、`DHL`、`USPS` 都能自然拆成长尾页面。
- 工具本身低风险、公式清晰、适合先跑通 SEO + AdSense + 服务导流闭环。

## 下一步

1. 官方公式验证：
   - FedEx dimensional weight / DIM divisor
   - UPS dimensional weight / DIM divisor
   - USPS dimensional weight / divisor
   - DHL volumetric weight / divisor
2. 输出 MVP Brief：
   - 页面定位
   - 功能范围
   - 公式库
   - SEO 页面结构
   - 内容区块
   - 风险声明
3. 决定是否建立第一个实际工具站工程目录。
