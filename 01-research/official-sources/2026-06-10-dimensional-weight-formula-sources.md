# Dimensional Weight 官方公式来源核验

## 基本信息

- 日期：2026-06-10
- 用途：为第一个 MVP 的公式库、页面免责声明、内容区块提供依据。
- 原则：搜索摘要、AI Overview、第三方博客只能作为线索，不能作为最终公式来源。

## 已核验来源

| 承运商 | 来源 | 核心规则 | 当前可用性 | 产品处理 |
|---|---|---|---|---|
| FedEx | `https://www.fedex.com/content/dam/fedex/us-united-states/services/Service_Guide_2026.pdf` | 2026 Service Guide 中说明 dimensional weight 通常按 `length x width x height / 139`，并提示 FedEx International Deferred Freight 使用 166；fractional inch 向上取整 | 高 | 可以进入公式库，但要区分常规服务和 Deferred Freight 例外 |
| UPS | `https://www.ups.com/assets/resources/webcontent/en_US/daily_rates.pdf` | 2025 UPS Rate & Service Guide 显示 package dimensional weight 用 cubic inches / 139；air freight matrix 中同时出现 139/5000 与 166/6000 | 中高 | 可以作为 UPS 初始公式依据，但上线前要复核是否已有 2026 最新 PDF |
| USPS | `https://pe.usps.com/text/dmm300/123.htm` | USPS DMM 当前页面显示 Priority Mail 超过 1 cubic foot 的 rectangular parcels 使用 `/ 166`，并 round up 到下一个 whole number | 中 | 暂不把 USPS 写死为 139；产品中应标注 USPS source date，并保留公式可更新 |
| DHL | 暂未找到足够稳定的 DHL 官方 US 页面 | 常见第三方资料显示 DHL Express global 常用 cm/kg `/ 5000`，但不能作为最终来源 | 低 | MVP 可先提供 DHL 为 `Custom / common international formula`，上线前补官方来源 |

## 公式库设计建议

第一版公式库不要只存一个 divisor，要存成结构化配置：

```text
carrier
service_scope
unit_system
divisor
rounding_rule
source_url
source_date
notes
confidence
```

示例：

| carrier | service_scope | unit_system | divisor | rounding_rule | confidence |
|---|---|---|---:|---|---|
| FedEx | common US / international package services | inches/lbs | 139 | dimensions and weight may round up depending on FedEx rules | High |
| FedEx | International Deferred Freight | inches/lbs | 166 | see FedEx Service Guide exception | Medium |
| UPS | package daily rates | inches/lbs | 139 | round measurements to nearest whole inch; fractional pound up | Medium-High |
| UPS | air freight matrix | cm/kg | 5000 or 6000 | depends on service row | Medium |
| USPS | Priority Mail retail, >1 cubic foot | inches/lbs | 166 | round off dimensions; round weight up | Medium |
| DHL | common international volumetric formula | cm/kg | 5000 | pending official source | Low |

## 风险和决策

### 1. USPS 不能直接写成 139

Google AI Overview 和新闻/第三方页面提到 USPS 可能在 2026 年改为 139，但 USPS DMM 当前页面仍显示 166。产品上线前必须再核验：

- USPS DMM 是否已更新。
- USPS Postal Bulletin 是否发布正式变更。
- USPS Notice 123 / Federal Register 是否同步修改。

### 2. DHL 先不作为强承诺

DHL 的 `/ 5000` 很常见，但本轮没有拿到稳定官方页面。第一版可以：

- 支持 `Custom divisor`。
- 提供 `International metric common formula`。
- 在 DHL 专属页面上线前补 DHL 官方来源。

### 3. MVP 可以先做，但公式区要留更新机制

这个工具站的长期可信度来自：

- 公式来源链接。
- 更新时间。
- 对例外服务的说明。
- 允许用户自定义 divisor。

## 下一步

1. 输出 MVP Brief。
2. 在 Brief 中把 `Formula source date` 做成产品需求。
3. 在工程实现时把公式配置写成可维护数据，而不是硬编码在组件里。
