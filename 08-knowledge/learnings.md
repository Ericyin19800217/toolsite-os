# 经验沉淀

## 2026-06-09：项目需要两层知识系统

结论：

```text
项目内知识库为主，Obsidian 为长期沉淀层。
```

原因：

- ToolSite OS 当前需要推动执行的项目知识，例如流程、模板、Prompt、评分表、服务假设。
- Obsidian 更适合沉淀跨项目认知、个人复盘和长期方法论。
- 项目内知识库保留证据链和上下文，便于后续复用和版本管理。

执行规则：

- 项目过程材料先进入 `08-knowledge`。
- 阶段性结论再提炼进 Obsidian。

## 2026-06-09：选题不能只看搜索量

选题验证阶段必须同时考虑：

- 搜索意图。
- 搜索量区间。
- 对标网站名称。
- 对标页面 URL。
- SERP 弱点。
- 广告价值。
- 预估收益潜力。
- 合规和维护风险。

AI 不能编造搜索量或收入，只能基于证据输出区间、等级和置信度。

## 2026-06-09：高价值领域不应一刀切排除

金融、健康、税务等领域通常有高搜索量和高广告价值，但风险更高。

更优策略是风险分层：

```text
做公式型、估算型、非建议型工具。
暂不做个性化建议、诊断、申报、投资推荐。
```

## 2026-06-09：关键节点必须沉淀为 Obsidian 复盘素材

结论：

```text
ToolSite OS 的关键节点复盘必须同步进 Obsidian，并持续更新同一份项目复盘日志。
```

原因：

- 项目复盘能避免重复踩坑。
- 弯路和修正本身就是自媒体内容素材。
- 如果只把复盘留在聊天里，后续很难转成内容选题、脚本和案例。

当前 Obsidian 复盘日志：

```text
/Users/yinbing/Documents/Eric Knowledge Base/60 Reviews/Project Reviews/ToolSite OS 项目复盘日志.md
```

## 2026-06-10：Obsidian 新知识对 ToolSite OS 的流程补强

本次从 Obsidian 知识库检索到几类对 ToolSite OS 全流程有直接帮助的知识：

- `Codex Vibe Coding 项目执行流程`：补强 PRD、计划、Git、浏览器验收、部署和复盘纪律。
- `Codex 产品设计与创意生产插件使用流程`：补强设计任务的小批次目标、Research 先行、分端验收和批注反馈。
- `AI 工具站矩阵从选题到变现落地流程`：补强上线检查、SEO、AdSense 合规、30 天复盘和资产沉淀。
- `反 AI 味设计指南`：补强页面视觉 QA，避免模板化 AI 设计。
- `AI 原生团队工作方式检查清单`：补强流程治理，从旧瓶颈、新瓶颈和可沉淀资产角度审视工作站。

对项目流程的修正：

```text
选题验证
→ MVP Brief
→ 技术实现
→ 产品设计闸门
→ 浏览器视觉验收
→ 上线前 SEO / 合规检查
→ 部署
→ Search Console
→ 30 天复盘
→ 服务化资产沉淀
```

这次也暴露了一个执行问题：已有调用地图和 Obsidian 知识不能只作为资料存在，必须在每个关键阶段转成可执行检查清单。

## 2026-06-10：子 agent 不能承担关键路径收口

本次排查确认，ToolSite OS 前期子 agent 卡住不是单一代码 bug，更像组合问题：

```text
任务颗粒度过大
→ 子 agent 写入部分文件后未稳定返回
→ 上下文压缩或恢复后只剩残留 id / 摘要
→ 主线程需要接管 git status、diff、测试和提交
```

执行规则：

- 主线程负责关键路径、最终判断和提交收口。
- 子 agent 只用于短闭环、低耦合、可独立验收的旁路任务。
- 子 agent 不负责从 0 到 1 搭完整站点、不处理需要用户授权的任务、不承担长时间 QA。
- 使用子 agent 必须要求它返回 `STATUS / FILES_CHANGED / TESTS_RUN / COMMIT / BLOCKERS / NEXT_RISK`。
- 子 agent 异常时，不重复派同一个模糊任务；先检查 `git status`、文件内容和测试状态。

详细排查见：

```text
08-knowledge/subagent-reliability-audit.md
```

## 2026-06-10：第三方 subagents 应筛选后项目化安装

研究 `VoltAgent/awesome-codex-subagents` 后，结论是：

```text
需要优化能力
但不全量安装
只安装少数 ToolSite OS 高相关项目级 agents
```

原因：

- 第三方 subagent 定义能补强角色边界、sandbox、模型路由和输出约束。
- 但它不能解决子 agent 生命周期、上下文压缩、wait 丢失这类运行时问题。
- 全量安装 166+ agents 会增加选择噪声，反而让主线程更难判断。
- 部分 agent 带有当前环境不匹配的 MCP 假设，原样安装可能制造新卡点。

已采用项目级安装：

```text
.codex/agents/
```

并限制：

```toml
[agents]
max_threads = 4
max_depth = 1
job_max_runtime_seconds = 900
```

后续原则：

- 优先安装 read-only agent。
- 所有 agent 必须带 ToolSite OS 专用边界和强制收口协议。
- 写入型 agent 只有在单文件、小补丁、明确验收时才考虑增加。
