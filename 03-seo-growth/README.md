# SEO 与增长区

> 最后更新: 2026-06-12 | 优化来源: last30days 社区研究数据

用于记录 Search Console、SEO、推广、外链和复盘。

---

## KGR-first 关键词策略 (新增 🆕)

在选关键词之前，先用 KGR 公式过滤。不要凭直觉做关键词研究。

```
KGR = allintitle 结果数 / 月搜索量
KDROI = (月搜索量 × CPC) / 关键词难度
```

**筛选流程:**

1. 列出 20 个候选关键词
2. Google 搜索 `allintitle:"{关键词}"` → 记录结果数
3. 计算 KGR → 筛掉 KGR > 1.0 的
4. 计算 KDROI → 按 ROI 排序
5. 优先做 KDROI 最高 + KGR 最低的前 5 个

**准入标准:**
- KGR < 0.25 → ✅ 立即做
- KGR 0.25-0.50 → ✅ 做
- KGR 0.50-1.0 → ⚠️ 需其他维度高分
- KGR > 1.0 → ❌ 不做

**KDROI 目标:** 搜索量 ≥ 600, 难度 ≤ 29, CPC ≥ $0.10

---

## GEO 优化清单 (新增 🆕)

> 来源: [dev.to GEO Content Factory SOP](https://dev.to/james_zhang_72eab1e7ca608/how-i-built-15-seo-tool-sites-solo-my-geo-content-factory-sop-545b)

每站必检 (追加到站点的 `seo.md`):

- [ ] 页面包含明确的"什么是 X"定义段落 (AI 摘要抓取来源)
- [ ] 核心数据以结构化列表/表格呈现 (AI 易提取)
- [ ] 每页包含 3+ 个带答案的 FAQ (标记 FAQ schema)
- [ ] 发布日期 + 作者信息明确标注 (AI 可信度信号)
- [ ] 工具结果页面附带解释性文字 (不只输出裸数据)
- [ ] 目标: 3 天内被 Google 索引 + AI Overview 引用

---

## 「Alternative to」对比页 (新增 🆕)

> 来源: [StartupStash 15 Growth Tactics](https://blog.startupstash.com/marketing-for-builders-15-actionable-ways-to-launch-and-scale-your-first-micro-saas-4ea600c277db)

每个工具站自动生成竞品对比页，捕获最高意图的搜索流量:

```
{tool-name}.com/alternatives/{competitor-name}/
```

**模板:**
```markdown
# {Competitor} Alternative: {Tool Name}
Looking for {competitor} alternatives?
{Tool Name} is free, no signup required, and {key differentiator}.

## Why choose {Tool Name} over {Competitor}
| Feature | {Tool Name} | {Competitor} |
|---------|------------|--------------|
| Price | Free | ${price} |
| Signup | No | Required |
| {Feature 3} | {Value} | {Value} |

## What users say
> "{用户评价}"
```

---

## 白帽推广优先级 (更新)

社区分发优先级提升——47% 创始人认为社区 > 广告。

| 优先级 | 渠道 | 说明 |
|--------|------|------|
| 1 🆕 | Reddit bottom-of-funnel 评论 | 监控抱怨帖，提供真正帮助 (90%帮助+10%提及) |
| 2 🆕 | 「Alternative to」对比页 | 最高意图流量，每竞品 1 页 |
| 3 | 工具目录提交 | ProgrammableWeb, AlternativeTo, etc. |
| 4 | Build-in-public 周记 (周五) | r/SideProject, r/webdev, X, IndieHackers |
| 5 | 可引用数据页 | 数据研究报告，HN/行业博客分发 |
| 6 | GitHub 免费模板 | 开源工具模板，README 引流 |
| 7 | 真实社区答疑 | r/SaaS, r/SEO, r/Entrepreneur 等 |
| 8 | 相关博客投稿 | dev.to, Medium, 个人博客 |
| 9 | 同领域资源页互链 | 与其他工具站互相推荐 |

## 禁止动作

- 自点广告；
- 诱导点击；
- 机器人刷流量；
- 自动评论 spam；
- 低质外链购买。

