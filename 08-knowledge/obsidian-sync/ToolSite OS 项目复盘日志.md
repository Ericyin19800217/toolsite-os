---
type: project-review
project: ToolSite OS
status: active
created: 2026-06-09
updated: 2026-06-09
tags:
  - ToolSiteOS
  - AI工具站
  - 项目复盘
  - 自媒体素材
---

# ToolSite OS 项目复盘日志

## 使用方式

这是一份持续更新的项目复盘笔记。

每完成一个关键节点，都追加一段复盘，重点记录：

- 走过的弯路。
- 踩过的坑。
- 不足和修正。
- 形成的新原则。
- 可沉淀成自媒体选题的素材。

这份笔记服务两个目的：

```text
项目推进：避免重复犯错，沉淀更好的工作流。
内容生产：为后续自媒体起号提供真实过程素材。
```

## 2026-06-09：项目正式启动与基础设施复盘

### 关键进展

- ToolSite OS 从讨论进入正式项目阶段。
- 明确第一阶段不是追求广告收入，而是跑通 1 个工具站从选题到上线的闭环。
- 建立了项目内知识库 `08-knowledge`。
- 设计了 AI 工具站选题验证工作站。
- 建立了插件与 skill 的全局调用地图。
- 形成了第一轮 20 个候选工具站方向。
- 创建了选题验证操作手册、Prompt 库、候选池、深度验证任务卡和研究台账。

### 走过的弯路

1. 一开始把设计文档和实施计划放在 `docs/superpowers/` 默认路径里，没有优先站在 ToolSite OS 的项目结构来判断。

   修正：将工作站设计和计划同步到 `06-automation/workstations/`，并把该路径定义为工作站主入口。

2. 插件与 skill 调用地图一开始写成了“高相关工具清单”，没有完整梳理所有已安装插件和 skill。

   修正：补成全量盘点，并标注 `主线 / 可选 / 维护 / 暂缓`。

3. 一开始把“避开金融、医疗、法律、税务”表达得过粗，容易把高痛点、高搜索、高 RPM 领域一刀切排除。

   修正：改成 Green / Yellow / Red 风险分层，不排除高价值领域，只排除高风险建议型表达。

4. 初期没有主动建议建立 Git 仓库和项目知识库。

   修正：明确 Git 是版本地基，项目知识库是认知地基；后续关键基础设施应主动提出，而不是等用户追问。

### 踩过的坑

- 机械遵循 skill 默认路径，容易和项目业务结构脱节。
- 如果只听用户命令执行，会遗漏 Git、知识库、Obsidian 复盘、工具缺口搜索等关键基础设施。
- 如果直接让 AI 估算搜索量和收益，容易产生虚假确定性。
- 如果插件地图只写当前模块，会看不到整个 ToolSite OS 的长期能力布局。

### 形成的新原则

- 每个关键节点都要主动比较方案：是否有别的方案、哪种更优、对后续有什么影响。
- 项目内知识库是操作系统，Obsidian 是长期个人知识网络。
- Obsidian 内容可以调用，但必须分析、引用和做冲突检查。
- 项目复盘必须持续更新，不能等项目结束才写总结。
- 工具缺口要主动识别，必要时去 GitHub 用关键词搜索候选工具。
- 选题验证必须证据驱动，不编造搜索量、广告收益和流量。

### 自媒体素材

- 《我用 AI 做工具站，第一天没有写代码，先补了 4 个地基》
- 《AI 工具站最容易踩的坑：不是建不出来，而是选题没有证据》
- 《为什么我没有直接复制 Hostinger，而是先做 ToolSite OS》
- 《一个 AI 项目真正开始时，最先该建的不是网站，是 Git 和知识库》
- 《AI Agent 不能只听命令：它应该主动提醒你哪些基础设施缺失》
- 《高 RPM 领域到底要不要做？我的答案是风险分层，而不是一刀切》
- 《从聊天到项目资产：我是怎么把一次讨论沉淀成工作站的》

### 下一步复盘触发点

- 完成第一轮 20 个候选初筛后。
- 完成 5 个候选的 SERP / Trends 验证后。
- 选出 3 个深验方向后。
- 推荐第一个 MVP 后。
- 第一个工具站上线后。
- Search Console 提交和首次收录数据出现后。

## 2026-06-09：第一轮 20 个候选初筛复盘

### 关键进展

- 基于候选池完成第一轮初筛。
- 从 20 个方向中选出 5 个进入 SERP / Trends 验证：
  - Dimensional Weight Calculator
  - Etsy Fee Calculator
  - Image Aspect Ratio Calculator
  - Compound Interest Calculator
  - AI Email Reply Generator
- 为 5 个方向分别创建了深度验证任务卡。
- 研究台账已记录 5 个初筛方向，但搜索量、趋势、广告价值和收益潜力仍保持 Unknown，等待证据采集。

### 走过的弯路

初筛时容易机械按总分排序。

如果只按总分，可能会偏向低风险通用工具，忽略跨境卖家工具和高价值 Yellow 工具的商业验证价值。

修正后采用：

```text
分数
→ 风险
→ 商业潜力
→ 赛道覆盖
→ 是否能服务后续商业化
```

### 踩过的坑

- 候选池第一版文件末尾多了空行，导致行数检查异常。
- 台账升级时旧表头没有完全替换，造成重复表头。
- 这些都是流程模板化早期常见的小问题，说明后续需要保持验证命令。

### 不足

- 当前 5 个入选方向仍是 AI 假设，没有真实 SERP / Trends / Keyword Planner 证据。
- 不能把 `score_total` 理解为真实市场机会，只能作为初筛优先级。
- 后续验证必须补对标网站、SERP 弱点、广告密度和长尾词。

### 新原则

- 初筛不能只看分数，还要看赛道覆盖和商业化验证价值。
- 所有未采集数据必须标记为 Unknown，不能用 AI 预测代替证据。
- 每次模板变更后必须做最小验证，例如行数、表头、引用链接。

### 自媒体素材

- 《我第一次做 AI 工具站选题，为什么没有直接选最高分？》
- 《工具站选题初筛：分数不是答案，证据才是答案》
- 《20 个 AI 工具站候选，我为什么先验证这 5 个》
- 《做工具站最危险的错觉：AI 给了分数，就以为市场验证完成了》
- 《从选题表到验证任务卡：AI 工具站真正开始变清晰的一步》

### 下一步复盘触发点

- 完成第一个方向 Dimensional Weight Calculator 的 SERP / Trends 验证后。
- 完成 5 个方向全部验证后。
- 从 5 个方向收敛到 3 个深验方向后。

## 2026-06-09：第一个方向真实截图验证复盘

### 关键进展

- 用户按流程采集了 `Dimensional Weight Calculator` 的 Google Trends、Google SERP、Autocomplete、Related Searches 和 People Also Ask 截图。
- 根据截图完成了第一张深度验证任务卡。
- 研究台账把该方向从 `入选初筛` 更新为 `进入前三深验`。

### 证据结论

- `dimensional weight calculator` 在 Google Trends 中明显强于 `volumetric weight calculator` 和 `shipping dimensional weight calculator`。
- 主词过去 5 年在美国市场有长期稳定搜索热度。
- 相关搜索集中在 UPS、FedEx、DHL、kg、cm、inches、Amazon、freight、LTL 等真实物流场景。
- SERP 里有 FedEx、UPS、DHL、Wikipedia、Omni Calculator 等强结果，也有 ShippingEasy、ShipMonk、Pegasus Logistics、Packwell、DeftShip 等商业站和服务商站。

### 走过的弯路

最开始用户不确定 Google Trends 的“比较”是不是要每个词单独搜。

修正：

```text
用 Compare 一次比较多个词，更容易判断主关键词和替代词的相对强弱。
```

这说明小白工作流不能只写“查 Google Trends”，必须写到按钮级别和判断标准。

### 踩过的坑

- SERP 截图里既有搜索结果第一页，也有后续页和相关搜索，容易混在一起。
- 需要把证据分层：Trends 是趋势证据，SERP 是竞争证据，Autocomplete / Related Searches 是长尾需求证据。
- 不能因为 Trends 主词强就直接判定能做，还要看 SERP 是否有可切入弱点。

### 不足

- 目前还没有 Keyword Planner 的搜索量区间和 CPC 数据。
- 没有逐个打开对标网站检查功能体验、移动端体验和广告布局。
- 对收益潜力只能判断为中等置信度，不能给收入预测。

### 新原则

- 截图验证可以作为第一版工作流的数据采集方式，但必须结构化写回任务卡。
- 小白工作流要把“去哪点、看什么、怎么判断”写清楚。
- 第一次真实验证后，`Unknown` 字段才能被更新为 `High / Stable / Medium` 这类等级。
- 是否进入下一步，不看单一数据点，而看趋势、SERP、长尾、商业意图和可切入性组合。

### 自媒体素材

- 《第一次用 Google Trends 验证工具站选题，我看懂了什么》
- 《AI 工具站选题不能只靠感觉：一张截图怎么变成验证证据》
- 《为什么 dimensional weight calculator 值得继续，但不能直接开干》
- 《小白做 SEO 工具站，第一步不是写代码，是看 SERP 有没有缝隙》
- 《从 Unknown 到 Medium：我是怎么把一个 AI 假设变成初步证据的》

### 下一步复盘触发点

- 打开前 3-5 个对标网站，检查工具体验和可超越点后。
- 完成 Etsy Fee Calculator 的截图验证后。
- 五个方向全部完成截图验证后。

## 2026-06-09：Google Trends 低量长尾异常复盘

### 关键进展

- 在验证 `Etsy Fee Calculator` 时，发现 Google Trends 对低量长尾词存在明显不一致：
  - `etsy fee calculator` 单词条有 5 年曲线。
  - 三词同时 Compare 时平均热度全部显示 0。
  - `etsy profit calculator` 单词条趋势曲线为空，但仍显示相关查询和增长数据。
  - `etsy seller fees calculator` 单词条数据为 0。
- 已将该情况写入 Etsy 深度验证任务卡，并把台账趋势字段改为 `Mixed / Trends anomaly`。
- 已在选题验证工作站中新增 Google Trends 异常处理规则。

### 踩过的坑

Google Trends 不是搜索量工具，而是相对趋势工具。对长尾词、低量词、比较词组，尤其是新版探索页，可能出现展示异常。

如果机械相信“0”，会误杀有真实 SERP 需求的工具站选题；如果机械相信“相关查询增长”，又可能高估一个弱词。

### 修正

后续遇到 Trends 异常时，不再纠结页面是否有 bug，而是按交叉验证处理：

```text
Trends 主词曲线
→ Related / Rising Queries
→ Google SERP 对标站
→ Keyword Planner 可选验证
→ 再做选题判断
```

### 新原则

- Google Trends 是方向感，不是最终证据。
- 低量长尾词不能只看 Compare。
- 有异常时写 `Mixed / Trends anomaly`，不要强行写 High 或 Low。
- SERP 真实对标站比 Trends 单点数据更接近商业机会。

### 自媒体素材

- 《Google Trends 显示 0，就代表工具站没人搜吗？我差点踩坑》
- 《做英文工具站选题，为什么不能只信 Google Trends》
- 《一个小白验证选题时遇到的第一个数据源 bug》
- 《AI 工具站选题：从“看曲线”到“交叉验证”的关键一步》

## 2026-06-09：Etsy Fee Calculator 主词 SERP 复盘

### 关键进展

- 完成 `etsy fee calculator` 主词 Google SERP 截图采集。
- SERP 结果显示该主词竞争非常密集，第一页和后续截图中出现 Printful、Printify、Alura、EverBee、Yotpo、Craftybase、PageFly、Vendoo、Listadum、RankHero、Insight Agent 等大量工具页。
- Related Searches / Autocomplete 明确出现 `digital products`、`2026`、`excel`、`uk`、`usa`、`euro`、`reddit`、`erank`、`alura`、`omni profit` 等长尾方向。
- PAA 问题集中在 Etsy 抽成、如何计算费用、Etsy vs eBay 成本比较等场景。

### 证据结论

主词不是“没人做”的机会，而是一个成熟、拥挤、商业意图明确的工具页 SERP。

这说明 `Etsy Fee Calculator` 仍有商业价值，但不适合第一阶段直接做泛主词硬刚。更合理的方向是继续验证长尾切口，例如：

```text
etsy fee calculator for digital products
etsy fee calculator 2026
etsy fee calculator excel
etsy pricing calculator
etsy profit calculator
etsy vs ebay fee calculator
```

### 踩过的坑

如果只看 Google Trends 的异常，可能误以为这个选题需求弱；但 SERP 证明有大量真实页面在竞争。

反过来，如果只看 SERP 结果多，也不能直接兴奋，因为结果多同时意味着竞争高，新站很难用泛词突破。

### 新原则

- SERP 结果多代表需求成立，但也代表竞争压力。
- 第一阶段 MVP 不应硬刚强站密集的泛主词，应寻找长尾版本、场景版本或更容易解释清楚的差异化入口。
- 对跨境卖家工具，`2026`、`Excel`、`digital products`、`country/currency`、`platform comparison` 是优先观察的长尾维度。

### 自媒体素材

- 《工具站选题看到满屏竞争对手，是好事还是坏事？》
- 《Etsy Fee Calculator 给我的启发：有需求不等于适合新手硬做》
- 《从 Google SERP 看懂工具站竞争：为什么我开始找长尾切口》
- 《AI 工具站选题第二坑：结果越多，机会越好吗？》

## 2026-06-09：Etsy Pricing Calculator 补充验证复盘

### 关键进展

- 完成 `etsy pricing calculator` 的 Google SERP 截图采集。
- 结果显示该词没有形成一个明显独立的新机会，而是大量复用 `etsy fee calculator`、`etsy profit calculator`、`etsy calculator` 的结果。
- SERP 中出现 Craftybase 的 `Free Etsy Pricing Calculator 2026 -- What to Charge on Etsy`，说明“定价”角度真实存在。
- PAA 从“费用怎么算”扩展到“如何给 Etsy 商品定价”，说明用户不只是想算手续费，还想知道最终应该卖多少钱。

### 证据结论

`etsy pricing calculator` 不是更容易打的独立关键词，但它帮助我们修正产品理解：

```text
用户真正想解决的不是 fee 本身，
而是 fee + cost + shipping + ad cost + profit margin 之后，
到底应该卖多少钱。
```

因此如果继续做 Etsy 方向，产品不应只是 `Fee Calculator`，而应该更接近：

```text
Etsy Price + Fee + Profit Calculator
```

但 SEO 切入口仍然不能硬刚泛词，下一步应优先验证更细分的长尾：

- `etsy fee calculator for digital products`
- `etsy fee calculator excel`
- `etsy product pricing calculator`
- `etsy fee calculator uk`
- `etsy fee calculator euro`

### 踩过的坑

看到 Google Trends 中 `etsy pricing calculator` 上升明显时，容易误以为它就是更好的切入口。

但 SERP 验证后发现：上升词不等于低竞争词，也不等于独立机会。它可能只是同一需求簇里的另一个表达方式。

### 新原则

- Rising query 只代表值得验证，不代表直接可做。
- 如果补充词 SERP 和主词高度重叠，就把它归入同一关键词簇，而不是另开选题。
- 产品定位可以吸收补充词的用户意图，但 SEO 入口要继续寻找更窄的长尾。

### 自媒体素材

- 《Google Trends 上升 350%，为什么我还是没有直接选它？》
- 《做工具站选题，关键词上升不等于机会成立》
- 《Etsy Pricing Calculator 验证后，我发现用户真正要的不是手续费》
- 《从 fee 到 price：一个工具站选题如何被 SERP 重新定义》

## 2026-06-09：Etsy Digital Products 长尾验证复盘

### 关键进展

- 完成 `etsy fee calculator for digital products` 的 Google SERP 截图采集。
- Google AI Overview 已经明确识别数字商品场景：不产生 shipping costs，但仍有 listing fee、transaction fee、payment processing fee。
- SERP 中出现 Etsy marketplace 模板商品、YouTube 教程、泛 Etsy fee/profit 计算器和 Reddit 讨论。
- Related Searches 继续指向 `2026`、`2025`、`excel`、`etsy fees for digital products`、`euro`、`UK` 等长尾。

### 证据结论

`digital products` 是真实细分需求，但不是一个干净的低竞争入口。

它的价值更多体现在产品设计上：

```text
数字商品卖家不需要 shipping 输入，
但需要更清楚地计算 listing fee、transaction fee、payment processing fee、ad cost、profit margin。
```

如果做 Etsy 方向，工具应该有商品类型切换：

```text
Physical product
Digital product
POD product
```

而不是所有用户都用同一张泛计算器。

### 踩过的坑

看到长尾词包含 `digital products`，容易期待 SERP 会更弱。

实际截图显示，Google 会把这个长尾意图映射回泛 Etsy fee/profit 计算器，同时混入 Etsy 模板商品和教程内容。长尾不一定意味着低竞争，有时只是让我们更理解用户分层。

### 新原则

- 长尾词有两种价值：SEO 切入口价值，以及产品差异化价值。
- 如果长尾 SERP 仍被泛结果覆盖，它未必适合做首发 SEO 入口，但可以指导功能设计。
- 出现 Etsy 模板 / spreadsheet 商品时，要继续验证 `excel` / `spreadsheet`，因为这可能代表更强的付费意愿。

### 自媒体素材

- 《长尾词一定更好做吗？Etsy digital products 给我的反例》
- 《从一个 Google 搜索结果看懂：数字商品卖家到底要算什么》
- 《工具站不只是抢关键词，还要从关键词里拆用户类型》
- 《为什么我开始关注 Etsy fee calculator excel 这个词》

## 2026-06-09：Etsy Excel 长尾验证与收口复盘

### 关键进展

- 完成 `etsy fee calculator excel` 的 Google SERP 截图采集。
- SERP 中大量出现 Etsy marketplace 模板商品、Excel / Google Sheets 模板、YouTube 教程、Reddit 讨论和已有工具页。
- 多个 Etsy 模板商品显示价格、评分和大量评价，说明该词背后不只是免费搜索需求，还有明确的模板购买需求。
- Etsy 方向从“免费手续费计算器”被重新理解为“在线工具 + spreadsheet/template + 卖家定价内容”的组合机会。

### 证据结论

`Etsy Fee Calculator` 需求成立，商业意图也成立，但它不适合第一阶段作为最省力 MVP。

原因：

```text
主词竞争密集。
pricing 词没有形成独立低竞争 SERP。
digital products 有细分需求，但仍被泛结果覆盖。
excel 有付费意图，但更偏模板商品和内容获客，不是纯免费工具站低竞争入口。
```

因此本轮结论是：

```text
暂不进入前三深验。
进入商业化观察池。
后续适合放进跨境卖家工具矩阵或模板商品化路线。
```

### 走过的弯路

一开始看到 Etsy 属于跨境卖家强需求领域，容易期待它是高商业价值机会。

验证之后发现：高商业价值不等于第一阶段适合做。越有钱的需求，往往竞争越密，SERP 里免费工具、SaaS、模板卖家、教程创作者都会挤在一起。

### 新原则

- 一个方向可以商业价值高，但仍然不适合当前阶段。
- 第一阶段优先选择“能更快跑通 SEO + 工具体验闭环”的方向，而不是一上来进入成熟商业战场。
- 如果 SERP 出现大量付费模板，说明可变现，但也说明用户需求可能不只是在线免费工具。
- `暂缓` 不是失败，是把机会放回更合适的项目阶段。

### 自媒体素材

- 《为什么我没有选择 Etsy Fee Calculator 做第一个工具站？》
- 《一个高商业价值选题，为什么反而不适合第一阶段做》
- 《Etsy Excel 模板让我看懂：工具站不只有 AdSense 一种玩法》
- 《AI 工具站选题最难的一步：承认好机会也要分阶段》

## 2026-06-10：Image Aspect Ratio Calculator 主词 SERP 复盘

### 关键进展

- `aspect ratio calculator`、`image aspect ratio calculator`、`resize image aspect ratio calculator` 在 Google Trends 中均显示 0。
- 按已沉淀的 Trends 异常规则，没有直接淘汰，而是转入 Google SERP 验证。
- 主词 `aspect ratio calculator` 的第一页结果显示：需求成立，但泛主词已经有较多成熟工具页。
- SERP 中出现 Andrew Hedges、calculateaspectratio.com、Calculator Soup、Digital Rebellion、Shutterstock、aspect-ratio.dev、aspectratiocalculator.com、mononodes、Google Play 等结果。

### 证据结论

`aspect ratio calculator` 不是没有需求，而是 Trends 对这类通用工具词不可靠。

但主词并不是明显蓝海：

```text
工具简单。
结果同质化。
已有多个独立小工具站。
还有 Shutterstock / Calculator Soup 这类强站参与。
```

真正值得继续验证的是长尾切口：

```text
aspect ratio calculator from image
16x9 aspect ratio calculator
aspect ratio calculator inches / cm / mm
resize image keep aspect ratio
social media image ratio calculator
```

### 踩过的坑

如果只看 Trends 全 0，会误判这个方向无需求。

但如果只看 SERP 结果多，又会误以为它一定值得做。实际更准确的判断是：需求成立，但泛工具太简单，必须找更具体的使用场景。

### 新原则

- 对通用工具词，Google Trends 全 0 更要用 SERP 交叉验证。
- 工具越简单，越不能只做“主功能”，必须找上传、批量、平台模板、单位换算等使用场景。
- Related Searches 不只是关键词列表，它是下一轮验证路线图。

### 自媒体素材

- 《Google Trends 全是 0，我为什么还继续验证这个工具站选题？》
- 《一个看似简单的比例计算器，为什么不一定适合直接做？》
- 《工具越简单，越要找具体场景》
- 《从 Aspect Ratio Calculator 看懂：SERP 结果多不等于马上开干》

## 2026-06-10：Aspect Ratio From Image 长尾验证复盘

### 关键进展

- 完成 `aspect ratio calculator from image` 的 Google SERP 截图采集。
- 搜索结果前排出现 imagy.app、imageonline.io 这类明确的 `Image Aspect Ratio Finder`。
- Trevor Fox 和 PosterBurner 也明确覆盖上传图片、识别比例、匹配打印尺寸等场景。
- PAA 问题显示用户会问图片比例怎么算、1280x720 是否为 16:9、1080x1350 是 4:5 还是 3:4 等具体尺寸问题。

### 证据结论

`from image` 比泛主词更有产品差异化。

它把产品从：

```text
输入宽高 -> 算比例
```

推进到：

```text
上传图片 -> 自动读取宽高 -> 判断比例 -> 匹配常见比例/社媒尺寸/打印尺寸
```

但它不是空白市场，已经有明确对标。这个方向可以继续观察，但商业价值偏工具流量，不如跨境卖家类工具直接。

### 新原则

- 长尾词能不能做，不只看有没有结果，还要看它是否能推动产品形态升级。
- `from image` 这种词的价值在于体验差异，而不是高商业意图。
- 简单工具如果要做，最好配套批量长尾页面，例如固定比例、社媒尺寸、像素换算、单位换算。

### 自媒体素材

- 《一个 from image 长尾词，如何把简单计算器变成更像产品的工具》
- 《工具站选题：有对标不代表不能做，但要知道赢在哪里》
- 《为什么上传图片识别比例，比手输宽高更像用户真正想要的功能》
- 《低商业意图工具站，靠什么提高差异化？》

## 2026-06-10：16x9 固定比例长尾验证与收口复盘

### 关键进展

- 完成 `16x9 aspect ratio calculator` 的 Google SERP 截图采集。
- 搜索结果中出现多个专门 16:9 页面，包括 aspectratiocalculator.com、Omni Calculator、aspect-ratios.com、calculateaspectratio.com。
- SERP 同时混入 Screen Size Calculator、Home Theater Mart 等屏幕/投影尺寸工具，说明该长尾覆盖图片、视频、屏幕、投影等多场景。
- Related Searches 出现 pixels、inches、cm、feet、4:5、4:3、video wall 等可扩展页面方向。

### 证据结论

固定比例词可以做内容矩阵，但不是强 MVP 切口。

可扩展结构是：

```text
16:9 aspect ratio calculator
4:3 aspect ratio calculator
4:5 aspect ratio calculator
21:9 aspect ratio calculator
16:9 in pixels / inches / cm / feet
```

但问题也清楚：

```text
竞争已有专门页面。
商业意图弱。
需要靠大量页面积累流量。
单页 MVP 不容易快速验证收益。
```

因此 Image Aspect Ratio 方向本轮结论是：

```text
暂不进入前三深验。
保留为低风险内容矩阵候选。
后续适合进入图片工具矩阵，而不是第一阶段最优 MVP。
```

### 新原则

- 可批量扩展的长尾，不等于适合作为第一个 MVP。
- 低风险、低商业价值方向更适合做矩阵补充，而不是优先突破口。
- 如果一个选题需要大量页面才能显出优势，第一阶段要谨慎，因为验证周期更长。

### 自媒体素材

- 《16:9 比例计算器让我看懂：长尾矩阵也有启动成本》
- 《低风险工具站为什么不一定是第一选择？》
- 《从单页工具到内容矩阵：什么时候值得做，什么时候该暂缓？》
- 《AI 工具站选题：需求成立但商业价值弱，该怎么办？》

## 2026-06-10：Compound Interest Calculator 主词 SERP 复盘

### 关键进展

- `compound interest calculator`、`investment calculator`、`savings calculator` 在 Google Trends 中均显示 0。
- 按 Trends 异常规则，没有直接淘汰，而是转入 Google SERP 验证。
- 主词第一页结果显示需求很强，但竞争极高：Investor.gov、NerdWallet、Moneychimp、Bankrate、GetSmarterAboutMoney.ca、The Calculator Site、Ramsey Solutions、Moneysmart.gov.au、TD Bank 等强站占据结果。
- PAA 问题集中在具体金额、时间、公式和利率计算。

### 证据结论

`Compound Interest Calculator` 是典型的“需求强、广告价值高、但第一阶段不适合硬打”的方向。

原因：

```text
金融 YMYL 属性强。
首页强站密集。
泛主词竞争极高。
新站需要很强信任背书。
内容必须避免投资建议和收益承诺。
```

本轮结论：

```text
暂不进入前三深验。
进入金融高竞争观察池。
后续如果做，只能作为公式型教育工具，而不是个性化理财建议。
```

### 新原则

- 高广告价值不等于当前阶段优先级高。
- 金融工具可以做，但第一阶段要避开强 YMYL 泛词。
- 对金融类计算器，必须把“公式演示”和“投资建议”分清楚。
- 如果 SERP 被政府、银行、金融媒体占满，新站需要非常强的差异化或长尾策略。

### 自媒体素材

- 《为什么高 RPM 的 Compound Interest Calculator 也没有进前三？》
- 《AI 工具站选题：高收益领域为什么更要谨慎？》
- 《金融工具站不是不能做，而是不能一上来硬刚大词》
- 《从复利计算器看懂：搜索需求强不等于新站机会强》

## 2026-06-10：AI Email Reply Generator 主词 SERP 复盘

### 关键进展

- `email reply generator`、`ai email reply generator`、`email response generator` 在 Google Trends 中均显示 0。
- 按 Trends 异常规则，没有直接淘汰，而是转入 Google SERP 验证。
- 主词第一页出现 Mailmeteor、SiteGPT、Planable、Amie、AIFreeBox、QuillBot、Fyxer、AlmReply、Evernote、Jotform 等工具页。
- SERP 顶部和底部出现赞助结果，如 Krista、hellodeck.ai、Jotform Gmail Agent。
- Autocomplete 显示 `free`、`online`、`chatgpt`、`auto`、`best`、`professional` 等泛长尾。

### 证据结论

`AI Email Reply Generator` 需求成立，也有商业获客价值，但泛词已经高度同质化。

问题是：

```text
AI 工具页太多。
免费工具同质化严重。
SaaS 获客页和写作工具强品牌混在一起。
泛词用户意图不够垂直。
```

因此本轮结论是：

```text
暂不进入前三深验。
保留为 AI 工具场景长尾候选。
后续如做，应从客服、销售、求职、道歉、HR、投诉处理等场景切入。
```

### 新原则

- AI 工具词不能只看“能不能生成”，要看场景是否足够具体。
- 泛 AI 工具页同质化严重，新站需要工作流、角色、行业或情绪场景差异化。
- 有赞助结果说明商业价值存在，但也说明获客竞争更激烈。
- AI 工具更适合做“场景模板库 + 轻工具”，而不是单一泛生成器。

### 自媒体素材

- 《AI Email Reply Generator 为什么没有成为第一个 MVP？》
- 《AI 工具站最容易同质化：我从 Google SERP 里看到了什么》
- 《泛 AI 工具还能做吗？答案是要找到具体场景》
- 《从 email reply generator 看懂：AI 工具不是功能竞争，是场景竞争》

## 2026-06-10：五个候选第一轮截图验证收敛复盘

### 关键进展

- 完成 5 个初筛候选的第一轮截图验证：
  - Dimensional Weight Calculator
  - Etsy Fee Calculator
  - Image Aspect Ratio Calculator
  - Compound Interest Calculator
  - AI Email Reply Generator
- 新增验证汇总文件：`01-research/validation-summary-2026-06-10.md`。
- 当前只有 `Dimensional Weight Calculator` 明确进入前三深验。
- 其他 4 个不是简单淘汰，而是进入不同观察池：
  - Etsy：商业化观察池。
  - Compound Interest：金融高竞争观察池。
  - Image Aspect Ratio：低风险内容矩阵候选。
  - AI Email Reply：AI 场景长尾候选。

### 证据结论

第一轮验证后，最适合第一阶段 MVP 的方向仍是：

```text
Dimensional Weight Calculator
```

原因：

```text
场景明确。
公式清晰。
风险低。
跨境/物流商业意图真实。
长尾可展开。
服务导流空间比通用工具更好。
```

### 走过的弯路

一开始我们容易把候选理解成“谁分数高就做谁”。

截图验证后发现，真正的判断不是单一分数，而是阶段匹配：

```text
需求强不强？
竞争是否可打？
商业价值是否适合当前阶段？
合规成本是否可控？
是否能快速跑通 MVP？
```

### 新原则

- 暂缓不是失败，而是把选题放进更合适的阶段。
- 第一阶段最重要的是跑通闭环，不是选择理论商业价值最高的方向。
- 一个好选题至少要同时满足：需求成立、竞争可切入、实现可控、合规可控、后续可扩展。
- 不同选题要进入不同池子，而不是只分“做/不做”。

### 自媒体素材

- 《5 个工具站选题验证后，我为什么只让 1 个进入深验？》
- 《工具站选题不是做选择题，而是做分层决策》
- 《AI 帮我选题后，真正有价值的是如何淘汰“看起来不错”的方向》
- 《从 5 个候选到 1 个优先方向：我的 AI 工具站选题复盘》

## 2026-06-10：Dimensional Weight Calculator 第一页 SERP 复查复盘

### 关键进展

- 用户重新采集了 `dimensional weight calculator` 的 Google 第一页 SERP、Autocomplete、AI Overview 和 Related Searches 截图。
- 截图显示第一页同时出现 Red Stag Fulfillment、Omni Calculator、ShippingEasy、FedEx、ShipMonk、Cole International、Amerijet、USPS、Pegasus Logistics 等结果。
- Autocomplete 出现 `in inches`、`amazon`、`for air freight`、`for ocean freight`、`international`、`lbs`、`in mm`、`dtdc`、`for pallet`。
- Related Searches 出现 FedEx、kg、UPS、cm、mm、inches、DHL 等长尾。

### 证据结论

这个选题的主词不是空白市场，但需求结构很清楚：

```text
用户不是只想知道一个公式，
而是想把尺寸、重量、单位、承运商、不同运输场景放在一起比较。
```

因此第一版 MVP 不应做普通通用计算器，而应优先验证：

```text
multi-carrier dimensional weight calculator
UPS / FedEx / USPS / DHL
inches/lbs + cm/kg
kg / cm / inches 长尾页面
```

### 走过的弯路

看到 AI Overview 里直接给出 UPS、FedEx、USPS 的 DIM factor，很容易想直接把它当公式来源。

修正：AI Overview 只能当线索，不能当官方依据。涉及承运商 divisor、费率、公式和更新时间的内容，必须去官方页面或官方 PDF 确认。

### 新原则

- SERP 第一页截图不只是看“有哪些对手”，还要看 Google 如何理解搜索意图。
- Autocomplete 和 Related Searches 是长尾页面地图，不需要马上逐个搜索。
- 对工具站来说，强站存在不一定代表不能做；关键是能否找到更完整、更好用、更聚焦的差异化。
- 公式型工具必须区分“搜索摘要线索”和“官方可引用来源”。

### 自媒体素材

- 《Google 第一页不是用来吓退我的，而是用来拆用户意图的》
- 《AI Overview 给了公式，我为什么还不能直接用？》
- 《工具站选题深验：从一个关键词拆出多承运商 MVP》
- 《做英文工具站，Autocomplete 才是长尾页面路线图》

## 2026-06-10：Dimensional Weight 对标站与官方公式核验复盘

### 关键进展

- 创建对标站深验表：`01-research/competitor-audits/2026-06-10-dimensional-weight-competitor-audit.md`。
- 创建官方公式来源核验表：`01-research/official-sources/2026-06-10-dimensional-weight-formula-sources.md`。
- 初步拆解 Red Stag、Omni Calculator、FedEx、ShippingEasy、ShipMonk、USPS、Pegasus 等对标类型。
- 明确第一个 MVP 的定位应升级为：

```text
Free Multi-Carrier Dimensional Weight Calculator
```

而不是普通：

```text
Dimensional Weight Calculator
```

### 证据结论

对标站说明这个需求真实存在，但普通计算器已经不够。新站要赢，必须把结果做得更清楚：

- 支持 UPS / FedEx / USPS / DHL 或自定义 divisor。
- 同时支持 inches/lbs 与 cm/kg。
- 展示 dimensional weight、actual weight、billable weight。
- 显示公式来源、更新时间、取整规则和例外说明。
- 围绕 kg、cm、inches、UPS、FedEx、USPS、DHL 拆长尾页面。

### 踩过的坑

最大的新坑是：承运商公式不是一个永远固定的简单数字。

例如：

- FedEx 官方 2026 Service Guide 可核验常见 `/ 139`，但存在特定服务例外。
- UPS 官方 rate guide 可核验 `/ 139`，但不同 freight/metric 场景有不同 divisor。
- USPS 当前 DMM 页面显示 `/ 166`，但 2026 年存在第三方/新闻变更信号，需要官方二次确认。
- DHL 常见 `/ 5000`，但本轮尚未拿到足够稳定的官方来源。

### 新原则

- 工具站公式不能硬编码在页面里，必须做成可维护的公式配置。
- 每个公式都要有 source URL、source date、confidence 和 notes。
- 对有冲突的来源，宁可先显示 `Custom divisor` 或 `pending official verification`，也不要为了显得完整而写错。
- 对标站深验不是只看 UI，还要看它们如何获客、如何解释公式、哪里没有说清楚。

### 自媒体素材

- 《我以为计算器就是一个公式，结果第一个坑是公式来源》
- 《为什么工具站不能直接照抄 Google AI Overview 的答案？》
- 《从 DIM weight 公式冲突看懂：小工具也需要产品可信度》
- 《第一个 MVP 为什么从普通计算器升级成多承运商计算器》

## 2026-06-10：第一个 MVP Brief 形成复盘

### 关键进展

- 创建第一个工具站 MVP Brief：`02-site-builds/mvp-briefs/2026-06-10-dimensional-weight-calculator-mvp-brief.md`。
- 研究台账将 `Dimensional Weight Calculator` 状态更新为：推荐进入第一个 MVP 建站准备。
- 明确当前阶段不再继续横向验证更多选题，而是进入纵向建站准备。

### 形成的 MVP 方向

```text
Free Multi-Carrier Dimensional Weight Calculator
```

第一版核心不是“能算一个公式”，而是：

- 多承运商预设。
- 双单位体系。
- actual weight 与 dimensional weight 对比。
- billable weight 结果。
- 公式来源、更新时间和置信度。
- 可维护公式配置。
- 主页面 + 第一批长尾页面矩阵。

### 走过的弯路

如果继续沉迷选题比较，会出现“验证越多越不敢开工”的问题。

修正：当一个选题已经满足需求成立、竞争可切入、实现可控、风险可管理、商业化路径清楚时，就要进入 MVP，而不是继续寻找理论上更好的选题。

### 新原则

- 选题验证不是为了找到完美答案，而是为了找到足够好的第一个闭环。
- 从研究进入建站时，必须有 MVP Brief，不能只凭聊天结论开写代码。
- MVP Brief 要明确“做什么”和“不做什么”，否则第一个工具很容易膨胀。
- 第一个站点的价值不只是这个工具本身，还在于跑通 ToolSite OS 的工作流。

### 自媒体素材

- 《什么时候该停止选题，开始做第一个 MVP？》
- 《我终于从工具站选题进入建站准备，靠的不是灵感而是证据》
- 《第一个 MVP Brief 是怎么把聊天变成产品任务的》
- 《AI 工具站最怕一直验证不动手：我是怎么设停止点的》

## 2026-06-10：技术栈决策与 Git 基线复盘

### 关键进展

- 确认第一个工具站采用 A 方案：

```text
Astro + React Islands + TypeScript + Tailwind + Vitest
```

- 创建技术设计文档：`02-site-builds/designs/2026-06-10-dim-weight-calculator-technical-design.md`。
- 确定站点工程目录：`02-site-builds/dim-weight-calculator/`。
- 初始化 ToolSite OS Git 仓库。
- 创建第一次项目基线提交：

```text
2874492 chore: initialize ToolSite OS project
```

### 决策理由

第一个 MVP 是 SEO 工具站，而不是复杂 SaaS。

Astro 更适合内容页和长尾页面矩阵；React Islands 负责计算器局部交互；TypeScript 负责公式配置和计算逻辑的可靠性；Vitest 负责公式和单位换算测试。

### 走过的弯路

一开始项目正式启动时没有第一时间初始化 Git。虽然已经在讨论中意识到这个问题，但真正进入建站准备时才补上。

修正：从第一个实际站点开始前完成 Git 基线提交，后续所有关键文档和代码变更都应纳入版本管理。

### 踩过的坑

- 沙盒环境不允许直接写 `.git`，`git init` 和 `git add` 都需要提升权限。
- Git 自动使用本机用户名邮箱作为提交身份：`Eric <yinbing@EricdeMacBook-Pro.local>`。后续如果要更正式，可以配置全局或项目级 `user.name` 和 `user.email`。

### 新原则

- 技术栈必须服务当前阶段，不为了未来可能的 SaaS 复杂度提前上重框架。
- 工程源码必须和研究文档分开，但仍放在同一个项目仓库里。
- 第一个工具站工程目录要可复制，未来第二个、第三个工具站可以沿用结构。
- 进入代码实现前必须有：MVP Brief、技术设计、Git 基线。

### 自媒体素材

- 《为什么我第一个工具站没有选 Next.js，而是选 Astro？》
- 《AI 工具站从研究到开工前，我补上的最后一块地基：Git》
- 《技术栈不是越强越好，而是越贴合当前阶段越好》
- 《一个小工具站为什么也要写技术设计文档？》

## 2026-06-10：第一个 MVP 实施计划复盘

### 关键进展

- 创建实施计划：`02-site-builds/plans/2026-06-10-dim-weight-calculator-implementation-plan.md`。
- 实施计划按 TDD 顺序拆分为：
  - Astro App Skeleton。
  - Formula Source Data。
  - Calculation Logic With Tests。
  - Unit Conversion and Validation。
  - Calculator React Island。
  - Layout and Source Note Components。
  - Main Tool Page。
  - Carrier Long-Tail Pages。
  - Final Verification。
- 提交实施计划：

```text
cdbaf4a docs: add dimensional weight calculator implementation plan
```

### 形成的新边界

从这一刻开始，项目不再是“选题研究”，而是进入可执行工程阶段。

实施顺序必须先做公式和测试，再做页面。原因是这个工具的可信度来自计算正确和来源清楚，而不是页面先好看。

### 踩过的坑

写计划时很容易把“大方向”写成“下一步做页面”，但这对 Agent 执行不够。

修正：每个任务都要具体到文件路径、测试命令、预期结果和提交点。这样后续即使换一个执行线程，也能接着做，不会丢上下文。

### 新原则

- 第一个工具站要用 TDD 保护公式逻辑。
- 实施计划必须可交给另一个 Agent 执行，而不是只有当前聊天能看懂。
- 每个任务都要有提交点，避免一次性大改不可回滚。
- UI 之前先保证公式、单位和输入校验可测试。

### 自媒体素材

- 《AI 工具站开始写代码前，我为什么又多写了一份实施计划？》
- 《第一个工具站不先做页面，而是先写公式测试》
- 《一个可执行的 AI Agent 计划应该长什么样？》
- 《从选题到代码前夜：我把工具站拆成了 9 个任务》

## 2026-06-10：第一个工具站 MVP 实现复盘

### 关键进展

- 完成第一个 Astro 工具站 MVP：`02-site-builds/dim-weight-calculator/`。
- 完成 5 个页面：
  - `/dimensional-weight-calculator/`
  - `/fedex-dimensional-weight-calculator/`
  - `/ups-dimensional-weight-calculator/`
  - `/usps-dimensional-weight-calculator/`
  - `/dhl-volumetric-weight-calculator/`
- 完成公式、单位换算、输入校验测试。
- 最终自动验证：

```text
npm run test：3 files passed, 30 tests passed
npm run build：5 page(s) built, 0 errors, 0 warnings
Playwright QA：5 个页面 x 3 个视口全部 200，无 console error
```

### 走过的弯路

1. 子代理执行时多次出现“文件已写入但不返回、不提交”的情况。

   修正：每次都先检查 Git 状态和文件内容，再决定接管，而不是重复派同一个任务。

2. `package.json` 最初使用 `latest`，安装到了 Astro 6 / Vite 8 / Tailwind 4.3 组合，主页面构建时报：

```text
Missing field `tsconfigPaths` on BindingViteResolvePluginConfig.resolveOptions
```

   修正：固定到稳定大版本组合 Astro 5 / Vite 6 / Tailwind 4，构建通过。

3. Astro telemetry 在沙盒里尝试写入用户目录，导致构建失败。

   修正：在 npm scripts 中加入 `ASTRO_TELEMETRY_DISABLED=1`。

4. 浏览器 QA 发现 `/favicon.ico` 404。

   修正：增加 `public/favicon.svg`，并在 `ToolLayout.astro` 中声明 favicon。

### 新原则

- 前端依赖不要无脑使用 `latest`，尤其是 Astro / Vite / Tailwind 这类构建链组合。
- Agent 子任务即使卡住，也可能已经写入了有效文件；接管前必须先看状态。
- 工具站第一版也必须做浏览器 QA，单元测试和 build 不能替代真实页面渲染。
- QA 产物如截图、Playwright 日志和构建产物应进入 `.gitignore`，不要污染仓库。
- 公式型工具先测公式，再做 UI，再做页面，这个顺序是正确的。

### 自媒体素材

- 《第一个 AI 工具站终于跑起来了：我踩了哪些坑？》
- 《为什么 package.json 里不要随便写 latest？》
- 《AI Agent 写代码不等于不用验收：我的第一个工具站 QA 过程》
- 《从选题到第一个页面：一个小工具站的真实开发流水账》
- 《子代理卡住怎么办？我学会了先看 Git 状态》

### 下一步

- 进入部署准备：
  - 选择 Cloudflare Pages 或 Vercel。
  - 配置部署命令和输出目录。
  - 提交 Search Console。
  - 建立收录和流量追踪台账。
