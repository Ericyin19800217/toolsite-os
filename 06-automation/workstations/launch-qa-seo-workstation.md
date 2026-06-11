# 上线 QA 与 SEO 工作站

## 目标

在部署前完成技术、SEO、可访问性和基础合规检查，避免把半成品工具站推上线。

## 输入

- 已构建站点。
- MVP Brief。
- 来源文档。
- 部署域名。

## 输出

- 部署前 QA 报告。
- SEO 元信息检查。
- sitemap / canonical / robots 检查。
- Search Console 提交流程。
- 上线后 30 天复盘指标。

## 步骤

1. 配置 `SITE_URL` 和必要的 base path。
2. 跑测试和构建。
3. 检查 title、description、H1、canonical、sitemap。
4. 检查移动端布局、表单、结果、来源链接。
5. 检查免责声明、隐私、条款需求。
6. 部署后提交 Search Console。
7. 建立 7 天、30 天复盘记录。

## Stop-loss

- 没有真实域名时，不写死生产 `site`。
- 来源或免责声明缺失，不提交收录。
- 核心计算测试未通过，不部署。

