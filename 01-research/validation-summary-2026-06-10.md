# 2026-06-10 五个候选验证汇总

## 验证范围

本轮完成了 5 个初筛方向的 Google Trends / Google SERP 截图验证。

由于多个工具词在 Google Trends 中出现全 0 或异常，本轮以 SERP、Autocomplete、People Also Ask、Related Searches 和对标站结构为主要判断依据。

## 阶段性排序

| 排名 | 选题 | 当前结论 | 核心理由 | 下一步 |
|---:|---|---|---|---|
| 1 | Dimensional Weight Calculator | 进入前三深验 | 搜索需求稳定，场景明确，跨境/物流商业意图清楚，主词和长尾都能展开 | 验证多承运商对比和长尾页面切入口 |
| 2 | Etsy Fee Calculator | 商业化观察池 | 需求和付费意图成立，但主词、pricing、digital products、excel 竞争都密集 | 后续跨境卖家工具矩阵或模板商品化 |
| 3 | Compound Interest Calculator | 金融高竞争观察池 | 需求和广告价值高，但金融强站密集，YMYL 合规成本高 | 暂缓，后续只做公式型教育工具时再考虑 |
| 4 | Image Aspect Ratio Calculator | 低风险内容矩阵候选 | 需求成立、实现轻，但商业价值偏弱，需要大量长尾页面积累 | 后续图片工具矩阵补充 |
| 5 | AI Email Reply Generator | AI 场景长尾候选 | 需求成立且有赞助结果，但泛词同质化严重 | 后续从客服/销售/求职/道歉等场景切入 |

## 是否进入前三深验

### 已确定进入

- Dimensional Weight Calculator

### 暂不进入，但保留商业机会

- Etsy Fee Calculator
- Compound Interest Calculator

### 暂不进入，但保留矩阵机会

- Image Aspect Ratio Calculator
- AI Email Reply Generator

## 关键判断

### 1. Google Trends 异常已成为常态

Etsy、Image Aspect Ratio、Compound Interest、AI Email Reply 多次出现 Google Trends 全 0 或不一致。

处理规则已经固定：

```text
Trends 异常
→ 不淘汰
→ 标记 anomaly
→ 用 SERP / Autocomplete / PAA / Related Searches 交叉验证
```

### 2. 商业价值和当前阶段优先级不是一回事

Etsy 和 Compound Interest 都有明显商业价值，但不适合第一阶段作为最省力 MVP。

原因：

- Etsy：竞争密集，更适合工具 + 模板 + 卖家服务矩阵。
- Compound Interest：金融强站密集，合规成本高。

### 3. 低风险不等于优先做

Image Aspect Ratio 风险低、实现轻，但商业价值偏弱，需要靠内容矩阵积累，不适合作为第一阶段最优突破口。

### 4. AI 工具必须找场景

AI Email Reply 泛词已经高度同质化。后续若做 AI 工具，应从具体场景进入：

- customer service email reply
- sales follow-up email reply
- apology email reply
- polite email reply
- job interview reply
- recruiter / HR reply
- angry customer response

## 当前推荐

继续以 `Dimensional Weight Calculator` 作为第一优先方向进入深验。

推荐深验重点：

1. 是否能做多承运商 DIM weight 对比。
2. 是否能覆盖 UPS / FedEx / DHL / USPS / Amazon / LTL 长尾。
3. 是否能同时支持 inches/lbs 和 cm/kg。
4. 是否能做 `dimensional weight calculator UPS`、`FedEx dim weight calculator` 等长尾页面。
5. 是否能形成服务导流：跨境物流、运费优化、包装建议。

2026-06-10 对标站深验后的更新判断：

- 第一版产品定位建议从普通 `Dimensional Weight Calculator` 升级为 `Free Multi-Carrier Dimensional Weight Calculator`。
- 对标站深验表：`01-research/competitor-audits/2026-06-10-dimensional-weight-competitor-audit.md`
- 官方公式来源核验表：`01-research/official-sources/2026-06-10-dimensional-weight-formula-sources.md`
- MVP Brief：`02-site-builds/mvp-briefs/2026-06-10-dimensional-weight-calculator-mvp-brief.md`
- 关键功能方向：
  - UPS / FedEx / USPS / DHL 多承运商预设。
  - inches/lbs 与 cm/kg 双单位。
  - dimensional weight、actual weight、billable weight 三个结果同时展示。
  - 公式来源、更新时间、rounding note 明确展示。
- 风险提醒：
  - 搜索摘要和 AI Overview 不能作为公式来源。
  - USPS 当前官方 DMM 页面显示 `/ 166`，但存在 2026 年第三方变更信号，必须做官方来源二次确认。
  - DHL 暂未拿到稳定官方来源，第一版应提供 `Custom divisor`，不要过早承诺 DHL 专属公式。

## 需要继续补的证据

- Keyword Planner：搜索量区间、竞争强度、CPC。
- 对标站打开体验：前 3-5 个工具的输入字段、移动端体验、广告布局、可超越点。
- 费率/公式来源：尤其是物流承运商公式和更新时间。

## 下一步工作流

进入 `Dimensional Weight Calculator` 深验：

1. 确认第一个 MVP 技术栈和站点目录。
2. 建立公式配置数据结构，避免硬编码。
3. 设计主工具页信息架构。
4. 实现 `/dimensional-weight-calculator/` 主页面。
5. 用手算样例和移动端截图验收。
