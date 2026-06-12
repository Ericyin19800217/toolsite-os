# Agent 工作流地图

## 目标

把工具站生产流程拆成可逐步自动化的 Agent / 工作流模块。

## 模块

```text
需求研究 Agent
→ 关键词/SERP/竞品评分

产品规格 Agent
→ 工具功能、页面结构、合规边界

产品设计 Agent
→ 产品语境、页面层级、可信感、反 AI 味检查

建站 Agent
→ 生成代码或 Hostinger/Codex 提示词

QA Agent
→ 桌面/移动端/表单/核心功能/死链测试、浏览器截图验收

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
| S1 AI 工具站选题验证工作站 | `06-automation/workstations/idea-validation-workstation.md` | 已运行第一轮，需按新加权规则复盘 |
| S2 MVP Brief 工作站 | `06-automation/workstations/mvp-brief-workstation.md` | v0.1 已设计 |
| S3 建站工作站 | `06-automation/workstations/site-build-workstation.md` | 完整设计已完成（2026-06-12） |
| S4 Product Design QA 工作站 | `06-automation/workstations/product-design-qa-workstation.md` | v0.1 已设计 |
| S5 上线部署与 SEO 工作站 | `06-automation/workstations/launch-qa-seo-workstation.md` | 完整设计已完成（2026-06-12） |

## 自动化原则

- 判断不稳定的环节先人工审核。
- 重复规则明确的环节优先自动化。
- 所有自动生成内容必须有 QA。
- 不把刷流量、诱导点击、垃圾外链纳入自动化。
- 页面类项目不能跳过真实浏览器验收。
- UI / 设计类任务先诊断，再小批次修复，每轮不超过 4-5 个目标。
- 上线后 30 天以收录、impressions、真实使用和反馈作为第一成功标准，不以短期收入作为唯一标准。
