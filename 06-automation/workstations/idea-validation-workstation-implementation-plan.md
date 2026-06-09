# AI Toolsite Idea Validation Workstation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved AI 工具站选题验证工作站 design into usable project templates, prompt libraries, research ledgers, and a first-run workflow.

**Architecture:** Keep the workstation as a lightweight documentation-and-template system before building software. Store reusable operating guides in `06-automation`, research artifacts in `01-research`, durable principles in `08-knowledge`, and execution plans under `docs/superpowers/plans`.

**Tech Stack:** Markdown, CSV, project knowledge base, optional Spreadsheets plugin for later workbook generation, Chrome for logged-in Google tools, AnySearch/web search for external sources.

---

## File Structure

- Create: `06-automation/workstations/idea-validation-workstation.md`
  - Responsibility: Step-by-step operator guide for running the workstation.
- Create: `06-automation/prompts/idea-validation-workstation-prompts.md`
  - Responsibility: Prompt library extracted from the approved spec.
- Create: `01-research/toolsite-candidate-pool.csv`
  - Responsibility: 20-candidate pool template with scoring fields.
- Create: `01-research/deep-validation-template.md`
  - Responsibility: Manual data collection task card for the final 3 candidates.
- Modify: `01-research/research-ledger.md`
  - Responsibility: Upgrade the ledger from placeholder columns to evidence-driven validation fields.
- Modify: `06-automation/workflow-map.md`
  - Responsibility: Link the idea validation workstation into the broader agent workflow map.
- Modify: `08-knowledge/plugin-skill-map.md`
  - Responsibility: Remove duplicate “high related skill” inventory if it becomes confusing after full inventory expansion.
- Modify: `README.md`
  - Responsibility: Add the new workstation and templates to key documents.

## Git Note

This project should be versioned, but `git init` currently requires filesystem approval and the previous approval request was rejected. Do not run Git commit steps until Git is initialized by the user or approval is granted.

## Task 1: Create Workstation Operator Guide

**Files:**
- Create: `06-automation/workstations/idea-validation-workstation.md`

- [ ] **Step 1: Create directory**

Run:

```bash
mkdir -p 06-automation/workstations
```

Expected: command exits with code 0.

- [ ] **Step 2: Create the operator guide**

Create `06-automation/workstations/idea-validation-workstation.md` with these sections:

```markdown
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

## 插件与 Skill

- 赛道设定：`brainstorming`。
- 外部资料读取：`anysearch` 或 web search。
- 登录态 Google 工具：Chrome。
- 表格化评分：Spreadsheets。
- 完成前验证：`verification-before-completion`。
```

- [ ] **Step 3: Verify file exists**

Run:

```bash
test -f 06-automation/workstations/idea-validation-workstation.md
```

Expected: command exits with code 0.

## Task 2: Create Prompt Library

**Files:**
- Create: `06-automation/prompts/idea-validation-workstation-prompts.md`

- [ ] **Step 1: Create directory**

Run:

```bash
mkdir -p 06-automation/prompts
```

Expected: command exits with code 0.

- [ ] **Step 2: Create prompt library**

Create `06-automation/prompts/idea-validation-workstation-prompts.md` with these sections:

```markdown
# AI 工具站选题验证工作站 Prompt 库

## 使用原则

- 不编造搜索量、流量、收入或广告收益。
- 所有判断必须标明证据来源和置信度。
- 高价值领域按 Green / Yellow / Red 分层，不一刀切排除。
- 每次关键决策前主动比较替代方案。

## Prompt 1：赛道设定

```text
你是 AI 工具站选题研究员。请基于以下目标生成本轮选题约束卡。

项目目标：用低成本方式验证可持续盈利的英文工具站选题。
目标市场：美国/英语市场优先。
商业目标：SEO 流量、AdSense、联盟营销、服务导流。
候选结构：通用工具 8 个、跨境/出海工具 8 个、AI/Prompt 工具 4 个。
风险策略：Green / Yellow / Red 分层，不排除高价值领域，但排除高风险建议型内容。
工具限制：不使用付费订阅工具，允许 Google Trends、Google SERP、Autocomplete、People Also Ask、Related Searches，可选 Google Keyword Planner。

请输出：
1. 本轮选题边界；
2. 优先赛道；
3. 暂缓赛道；
4. 风险判断原则；
5. 商业价值判断原则。
```

## Prompt 2：候选生成

```text
请生成 20 个英文工具站候选方向。

每个候选必须包含：
工具名称、目标用户、触发场景、主关键词、3-5 个长尾词、MVP 功能、数据来源、风险等级、可能对标网站类型、变现方式、48 小时上线可能性。

要求：
1. 不要只生成泛泛想法；
2. 每个工具必须能用一个网页完成 MVP；
3. Yellow 领域可以包含金融/健康/税务相关计算器，但必须是公式型、估算型、非建议型；
4. Red 领域直接标记为暂不推进；
5. 按“低风险 + 有商业潜力 + 可快速上线”排序。
```

## Prompt 3：风险分层

```text
请对以下 20 个候选做 Green / Yellow / Red 风险分层。

判断标准：
Green：低合规风险，主要是格式化、转换、生成、查询、文本处理。
Yellow：高价值但需要免责声明、公式来源、非建议声明。
Red：涉及个性化投资建议、医疗诊断、法律税务建议、高版权风险或平台规则灰区。

请输出：
1. 风险等级；
2. 风险原因；
3. 是否可通过免责声明降低风险；
4. 是否建议进入搜索验证；
5. 如果不建议，给出替代选题。
```

## Prompt 4：搜索词拆解

```text
请为以下候选工具拆解搜索词。

每个候选输出：
1. 主关键词；
2. 工具型关键词；
3. 长尾关键词；
4. 问题型关键词；
5. 替代词；
6. 地区/平台组合词；
7. 适合 Google Trends 验证的 1-3 个核心词；
8. 适合 Google SERP 手动观察的 3-5 个词。

注意：
不要编造搜索量，只生成待验证关键词。
```

## Prompt 5：免费数据采集任务卡

```text
请把以下候选方向转成免费数据采集任务卡。

每张任务卡包含：
1. 要查询的关键词；
2. Google Trends 查询设置：地区、时间范围、比较词；
3. Google SERP 查询设置：语言、地区、是否无痕；
4. 需要记录的对标网站名称；
5. 需要记录的对标页面 URL；
6. 需要观察的 SERP 弱点；
7. 需要记录的广告/商业信号；
8. 可选 Keyword Planner 查询词；
9. 用户需要反馈给 AI 的最小信息。

输出格式要适合复制到表格。
```

## Prompt 6：商业价值验证

```text
以下是人工采集到的 Trends、SERP、对标网站和可选 Keyword Planner 信息。
请只基于这些证据做商业价值判断，不要编造搜索量或收入。

请评估：
1. 搜索需求：低 / 中 / 高；
2. 搜索趋势：上升 / 稳定 / 下降 / 季节性；
3. 对标网站：名称、页面类型、强弱判断；
4. SERP 可切入性：强 / 中 / 弱；
5. 广告价值：低 / 中 / 高；
6. 预估收益潜力：低 / 中 / 高；
7. 适合变现方式：AdSense / 联盟 / 服务导流 / 积分工具；
8. 证据置信度：低 / 中 / 高；
9. 最大风险；
10. 是否进入前三深验。
```

## Prompt 7：最终推荐 MVP

```text
请基于评分结果，从 3 个深验候选中推荐 1 个 MVP。

输出：
1. 推荐选题；
2. 推荐理由；
3. 不选另外 2 个的原因；
4. 目标用户；
5. 主关键词和长尾词；
6. 对标网站与可超越点；
7. MVP 功能范围；
8. 输入字段；
9. 输出结果；
10. 页面结构；
11. SEO title / description / H1；
12. FAQ；
13. 风险边界与免责声明；
14. 预估商业化路径；
15. 给建站工作站的 Brief。
```
```

- [ ] **Step 3: Verify no bracket placeholders remain**

Run:

```bash
rg -n "BROKEN_MARKER" 06-automation/prompts/idea-validation-workstation-prompts.md
```

Expected: no output and exit code 1.

## Task 3: Create Candidate Pool CSV Template

**Files:**
- Create: `01-research/toolsite-candidate-pool.csv`

- [ ] **Step 1: Create CSV header**

Create `01-research/toolsite-candidate-pool.csv` with this header:

```csv
date,idea_name,category,target_user,trigger_scenario,primary_keyword,long_tail_keywords,risk_level,risk_reason,mvp_scope,data_source,query,region,language,date_checked,benchmark_sites,benchmark_urls,serp_weaknesses,search_volume_signal,trend_signal,ad_value_signal,revenue_potential,monetization_fit,confidence,human_review_required,search_intent_score,pain_score,result_clarity_score,serp_opportunity_score,risk_control_score,mvp_complexity_score,monetization_fit_score,maintenance_score,score_total,decision,next_step
```

- [ ] **Step 2: Add one example row**

Append this example row:

```csv
2026-06-09,Example JSON Formatter,General Tool,"developers, students","paste messy JSON before debugging",json formatter,"online json formatter; json validator; format json online",Green,"low compliance risk","paste JSON, validate, format, copy result",manual,json formatter,US,en,2026-06-09,"jsonformatter.org; jsonlint.com","https://jsonformatter.org/; https://jsonlint.com/","many tools have ads or dated UI",Medium,Stable,Medium,Medium,AdSense,Medium,no,5,4,5,3,5,5,3,4,34,example,replace example during first real run
```

- [ ] **Step 3: Verify header includes commercial validation fields**

Run:

```bash
head -1 01-research/toolsite-candidate-pool.csv | rg "benchmark_sites|search_volume_signal|ad_value_signal|revenue_potential|confidence"
```

Expected: matching header line printed.

## Task 4: Create Deep Validation Template

**Files:**
- Create: `01-research/deep-validation-template.md`

- [ ] **Step 1: Create deep validation task card template**

Create `01-research/deep-validation-template.md`:

```markdown
# 深度验证任务卡

## 候选选题

- 选题名称：
- 主关键词：
- 目标地区：
- 目标语言：
- 风险等级：

## Google Trends

- 查询词：
- 地区：
- 时间范围：
- 趋势判断：上升 / 稳定 / 下降 / 季节性
- 相关搜索：
- 观察证据：

## Google SERP

- 查询词：
- 搜索设置：
- 前两页对标网站：
- 小站 / 弱站 / 过时页面：
- SERP 弱点：
- 是否有广告：
- People Also Ask：
- Related Searches：

## 可选 Keyword Planner

- 查询词：
- 搜索量区间：
- 竞争强度：
- CPC 或广告信号：

## 商业价值判断

- 搜索需求：低 / 中 / 高
- 广告价值：低 / 中 / 高
- 收益潜力：低 / 中 / 高
- 变现方式：AdSense / 联盟 / 服务导流 / 积分工具
- 证据置信度：低 / 中 / 高

## 结论

- 是否进入前三深验：
- 最大风险：
- 下一步：
```

- [ ] **Step 2: Verify required sections exist**

Run:

```bash
rg -n "Google Trends|Google SERP|Keyword Planner|商业价值判断|结论" 01-research/deep-validation-template.md
```

Expected: all five section names printed.

## Task 5: Upgrade Research Ledger

**Files:**
- Modify: `01-research/research-ledger.md`

- [ ] **Step 1: Replace the current placeholder table**

Replace the table in `01-research/research-ledger.md` with:

```markdown
| 日期 | 选题 | 主关键词 | 目标地区 | 风险等级 | 对标网站 | 搜索量信号 | 趋势信号 | SERP 机会 | 广告价值 | 收益潜力 | 总分 | 结论 | 下一步 |
|---|---|---|---|---|---|---|---|---|---|---|---:|---|---|
| 2026-06-09 | 待填 | 待填 | US / EN | Green / Yellow / Red | 待填 | 未知 / 低 / 中 / 高 | 上升 / 稳定 / 下降 / 季节性 | 弱 / 中 / 强 | 低 / 中 / 高 | 低 / 中 / 高 | 0 | 待验证 | 生成采集任务卡 |
```

- [ ] **Step 2: Verify upgraded columns**

Run:

```bash
rg -n "风险等级|对标网站|搜索量信号|广告价值|收益潜力" 01-research/research-ledger.md
```

Expected: table header line printed.

## Task 6: Update Automation Workflow Map

**Files:**
- Modify: `06-automation/workflow-map.md`

- [ ] **Step 1: Add workstation link**

Add this section after the “模块” section:

```markdown
## 已设计工作站

| 工作站 | 文档 | 状态 |
|---|---|---|
| AI 工具站选题验证工作站 | `06-automation/workstations/idea-validation-workstation.md` | 待执行第一轮 |
```

- [ ] **Step 2: Verify link exists**

Run:

```bash
rg -n "AI 工具站选题验证工作站|idea-validation-workstation" 06-automation/workflow-map.md
```

Expected: matching lines printed.

## Task 7: Clean Global Plugin Map Duplication

**Files:**
- Modify: `08-knowledge/plugin-skill-map.md`

- [ ] **Step 1: Remove duplicate “高相关 Skill” section if it duplicates the full inventory**

Remove the section that starts with:

```markdown
## 高相关 Skill
```

and ends immediately before:

```markdown
## 重点插件：Product Design
```

Keep the full inventory,重点插件 sections, global stage map, module-level map, and tool gap discovery mechanism.

- [ ] **Step 2: Verify only one inventory concept remains**

Run:

```bash
rg -n "^## 全量 Skill 盘点|^## 高相关 Skill|^## 重点插件：Product Design" 08-knowledge/plugin-skill-map.md
```

Expected: output includes `全量 Skill 盘点` and `重点插件：Product Design`; output does not include `高相关 Skill`.

## Task 8: Update Project README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add key document links**

Add these links under “关键文档”:

```markdown
- `06-automation/workstations/idea-validation-workstation.md`
- `06-automation/prompts/idea-validation-workstation-prompts.md`
- `08-knowledge/plugin-skill-map.md`
```

- [ ] **Step 2: Verify links exist**

Run:

```bash
rg -n "idea-validation-workstation|plugin-skill-map" README.md
```

Expected: matching links printed.

## Task 9: Self-Review and Verification

**Files:**
- Verify all files from Tasks 1-8.

- [ ] **Step 1: Check all expected files exist**

Run:

```bash
test -f 06-automation/workstations/idea-validation-workstation.md
test -f 06-automation/prompts/idea-validation-workstation-prompts.md
test -f 01-research/toolsite-candidate-pool.csv
test -f 01-research/deep-validation-template.md
```

Expected: all commands exit with code 0.

- [ ] **Step 2: Check for placeholders**

Run:

```bash
rg -n "BROKEN_MARKER" 01-research 06-automation 08-knowledge README.md
```

Expected: no output and exit code 1.

- [ ] **Step 3: Check workstation references**

Run:

```bash
rg -n "AI 工具站选题验证工作站|toolsite-candidate-pool|deep-validation-template|plugin-skill-map" README.md 01-research 06-automation 08-knowledge
```

Expected: matching references across README, research, automation, and knowledge files.

## Task 10: First Run Preparation

**Files:**
- Use: `06-automation/prompts/idea-validation-workstation-prompts.md`
- Use: `01-research/toolsite-candidate-pool.csv`

- [ ] **Step 1: Generate first 20 candidates**

Use Prompt 1 and Prompt 2 from `06-automation/prompts/idea-validation-workstation-prompts.md` with the default settings:

```text
目标地区：美国
目标语言：英语
候选结构：通用工具 8 个、跨境/出海工具 8 个、AI/Prompt 工具 4 个
风险策略：Green / Yellow / Red
商业目标：SEO 流量、AdSense、联盟营销、服务导流
```

Expected: 20 candidate ideas with required fields.

- [ ] **Step 2: Add candidates to CSV**

Replace the example row in `01-research/toolsite-candidate-pool.csv` with 20 generated candidates.

Expected: CSV has 21 lines: 1 header + 20 candidates.

- [ ] **Step 3: Verify row count**

Run:

```bash
wc -l 01-research/toolsite-candidate-pool.csv
```

Expected: `21 01-research/toolsite-candidate-pool.csv`.
