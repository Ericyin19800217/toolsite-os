# AI 工具站选题验证工作站

## 目标

从 20 个英文工具站候选方向中筛出 1 个推荐 MVP，并输出给建站工作站使用的结构化 Brief。

## 输入

- 目标市场：默认美国 / 英语。
- 候选结构：通用工具 8 个、跨境/出海工具 8 个、AI/Prompt 工具 4 个。
- 风险策略：Green / Yellow / Red。
- 数据工具：Google Trends、Google SERP、Autocomplete、People Also Ask、Related Searches，可选 Google Keyword Planner。

## 输出

- 20 个候选方向。
- 5 个初筛方向。
- 3 个深验方向。
- 1 个推荐 MVP Brief。

## 运行步骤

1. 生成本轮选题约束卡。
2. 生成 20 个候选方向。
3. 做 Green / Yellow / Red 风险分层。
4. 拆解搜索词。
5. 生成免费数据采集任务卡。
6. 采集 Trends、SERP、对标网站和商业信号。
7. 完成 8 维评分。
8. 推荐 1 个 MVP Brief。

## Google Trends 异常处理

Google Trends 对低量长尾词可能出现采样或展示不一致，尤其是在新版探索页中。

如果出现以下情况，不直接判定选题失败：

- 多词 Compare 全部显示 0，但单词条有曲线。
- 单词条无曲线，但仍有相关查询或热度上升数据。
- 同一词在不同时间刷新后显示不同。

处理流程：

1. 先保存异常截图，标记为 `Trends anomaly`。
2. 改为单词条分别截图，记录主词是否有长期曲线。
3. 把相关查询、热度上升词作为长尾词线索。
4. 进入 Google SERP 验证，检查真实搜索结果和对标站。
5. 可选用 Keyword Planner 交叉验证搜索量区间和广告信号。
6. 台账中趋势字段写 `Mixed / Trends anomaly`，不要写成 `High` 或 `Low`。

## 插件与 Skill

- 赛道设定：`brainstorming`。
- 外部资料读取：`anysearch` 或 web search。
- 登录态 Google 工具：Chrome。
- 表格化评分：Spreadsheets。
- 完成前验证：`verification-before-completion`。
