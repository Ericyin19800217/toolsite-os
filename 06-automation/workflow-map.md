# Agent 工作流地图

## 目标

把工具站生产流程拆成可逐步自动化的 Agent / 工作流模块。

## 模块

```text
需求研究 Agent
→ 关键词/SERP/竞品评分

产品规格 Agent
→ 工具功能、页面结构、合规边界

建站 Agent
→ 生成代码或 Hostinger/Codex 提示词

QA Agent
→ 桌面/移动端/表单/核心功能/死链测试

SEO Agent
→ title、description、FAQ、sitemap、robots、Search Console 清单

合规 Agent
→ Privacy、Terms、Disclaimer、AdSense 风险

上线 Agent
→ 域名、SSL、部署、监控

复盘 Agent
→ impressions、CTR、收录、错误、下月动作
```

## 已设计工作站

| 工作站 | 文档 | 状态 |
|---|---|---|
| AI 工具站选题验证工作站 | `06-automation/workstations/idea-validation-workstation.md` | 待执行第一轮 |

## 自动化原则

- 判断不稳定的环节先人工审核。
- 重复规则明确的环节优先自动化。
- 所有自动生成内容必须有 QA。
- 不把刷流量、诱导点击、垃圾外链纳入自动化。
