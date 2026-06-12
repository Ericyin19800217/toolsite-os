# 决策记录

> 只记录"已决定"的事，不写"建议"或"讨论中"。
> 格式：日期 | 决策 | 推理链 | 决策人

---

## 2026-06-10 | 统一工作区采用 7 文件 + handoffs 目录 | Claude + Codex + Eric

**决策**：AGENTS + ROLES + WORKSPACE + PROJECT + TASKS + DECISIONS + RISKS + handoffs/

**推理**：
- AGENTS 保持稳定启动协议，WORKSPACE 承载动态信息
- handoffs 拆目录解决多 agent 同时写同一文件的冲突
- RISKS 区分三类等待项，避免所有阻塞堆成"需要你决策"

---

## 2026-06-10 | 只迁移 toolsite-os 做试点 | Claude + Codex + Eric

**决策**：不一次迁移 6 个项目。先用 toolsite-os 跑通一轮完整交接闭环

**推理**：
- 迁移步骤采用 rsync + symlink 过渡 + 3-7 天观察
- 试点成功后再推广到其他项目

---

## 2026-06-10 | ToolSite-OS P0 优先于 AI-built 服务包 | Eric

**决策**：先跑通工作站流程，再产品化 AI-built 服务

**推理**：工作站流程没跑通前，AI-built 服务没有交付能力

---

## 2026-06-10 | Phase 1 MVP 不需要上线部署 | Eric

**决策**：Dimensional Weight Calculator 作为工作流验证样本

**推理**：MVP 目的不是获取流量，是验证 S1→S2 流程可跑通

---

## 2026-06-12 | 不建部署平台，用 Vercel Deploy Button + 引导式操作卡 | Claude + Eric

**决策**：域名+服务器通过"逐帧操作卡 + Vercel Deploy Button"实现小白天体验，不自建部署基础设施。

**推理**：
- Vercel 免费层（100GB/月）足够工具站全部流量
- "一键部署"不等于自建平台 — Vercel Deploy Button 就是天然的一键部署
- 真正的竞争壁垒在选题验证和 SEO 增长，不在部署体验
- 域名购买涉及用户付款信息，不适合由平台代操作
- Phase 1-2 不需要自建部署平台，Phase 3 再评估

**用户侧流程**：买域名（操作卡引导，5 分钟）→ 点部署按钮（1 分钟）→ 配 DNS（操作卡引导，5 分钟）→ 上线

---
## 2026-06-09 | 不买 Hostinger，用免费技术栈 | Eric + Codex

**决策**：Astro + Cloudflare/Vercel + GitHub + Cloudflare DNS

**推理**：验证零成本工具站矩阵可行性，不被付费平台绑定

---

## 2026-06-09 | 工具站采用 Green/Yellow/Red 风险分层 | Eric

**决策**：不排除金融/健康，按公式型（可控）与建议型（高风险）分层
