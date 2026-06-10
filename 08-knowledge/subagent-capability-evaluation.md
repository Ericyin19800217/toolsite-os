# VoltAgent awesome-codex-subagents 评估与安装决策

日期：2026-06-10

## 研究对象

- GitHub: https://github.com/VoltAgent/awesome-codex-subagents
- 官方 Codex Subagents 文档: https://developers.openai.com/codex/subagents
- 官方 Codex Subagent concepts: https://developers.openai.com/codex/concepts/subagents

## 判断

需要优化现有能力，但不应全量安装。

更优方案：

```text
不全局安装 166+ agents
→ 只抽取和 ToolSite OS 高相关的少数角色
→ 项目级安装到 .codex/agents/
→ 加入 ToolSite OS 专用边界和强制收口协议
```

## 为什么不全量安装

- 全量安装会增加选择噪声，主线程更难判断该用哪个 agent。
- 第三方定义虽然质量较好，但并不自动解决子 agent 生命周期、wait、上下文压缩后的恢复问题。
- 部分 agent 带有和当前环境不匹配的 MCP 假设，例如 `browser-debugger` 指向 `localhost:3000/mcp`。
- 部分默认模型字段不一定匹配当前可用模型策略。
- 仓库 README 明确提示这些 agents are provided "as is"，使用前需要审查。

## 安装的项目级 agents

安装位置：

```text
.codex/agents/
```

已安装：

- `toolsite-task-distributor`
- `toolsite-docs-researcher`
- `toolsite-reviewer`
- `toolsite-ui-ux-tester`
- `toolsite-seo-specialist`
- `toolsite-idea-validator`

项目配置：

```text
.codex/config.toml
```

限制：

```toml
[agents]
max_threads = 4
max_depth = 1
job_max_runtime_seconds = 900
```

## 使用原则

- 主线程仍负责关键路径、最终判断、Git 提交和 Obsidian 同步。
- 子 agent 只做短闭环、低耦合、可独立验收的工作。
- 默认优先 read-only agent。
- 不让子 agent 从 0 到 1 搭完整工具站。
- 不让子 agent 处理需要用户授权的任务。
- 不让子 agent 负责最终部署决策。

## 强制收口协议

所有 ToolSite OS 项目级 agents 都要求返回固定结构：

```text
STATUS:
...
BLOCKERS:
NEXT_RISK:
```

这样做是为了避免再次出现：

```text
文件已写入
→ 不返回
→ 不提交
→ 主线程不知道是否该接管
```

## 后续观察点

- 新会话或重启 Codex 后确认项目 agents 是否出现在可用 agent 列表。
- 第一次使用时只派一个 read-only agent，不并发，验证输出格式是否稳定。
- 如果 agent 没有按协议返回，优先修 agent 定义，不扩大安装范围。
- 如果 agent 输出对项目有帮助，再考虑增加 `toolsite-ui-fixer` 这类写入型短任务 agent。
