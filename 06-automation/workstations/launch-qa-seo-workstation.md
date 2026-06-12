# S3 上线部署与 SEO 工作站设计

日期：2026-06-12

> 从 v0.1 骨架升版为完整设计。
> 核心设计决策：不建部署平台，用"引导式自助 + 一键部署按钮"达成小白天体验。

## 1. 定位

S3 是 ToolSite OS 五站串联的第三站。它是**从"本地能跑"到"线上能搜到"的最后一公里**。

```text
S2 建站（本地验证通过 + 源码已推 GitHub）
  → S3 域名引导（用户按指南操作）
    → 一键部署（Vercel Deploy Button）
      → DNS 配置引导
        → SSL 自动签发
          → Search Console 提交
            → S4 推广 + 内容
```

S3 不做两件事：
- **不建部署平台**。Vercel 的免费层已经做得很好，我们做的是"降低 Vercel 的使用门槛"。
- **不替用户买域名**。域名涉及付款信息、WHOIS 隐私、续费责任，这些必须用户自己掌控。

S3 做的：**把 10 个技术步骤变成 1 份傻瓜式操作卡 + 1 个部署按钮。**

## 2. 技术方案：为什么 Vercel Deploy Button 能实现"一键部署"

### 机制

```
Vercel Deploy Button URL:
https://vercel.com/new/clone?repository-url=https://github.com/<org>/<repo>

用户点击 → 授权 Vercel 访问 GitHub → Vercel 自动：
  1. Clone 仓库到用户 GitHub
  2. 检测 Astro 项目配置
  3. 设置 SITE_URL 环境变量
  4. 构建 + 部署
  5. 返回 vercel.app 子域名
```

### 为什么选择这个方案

| 对比维度 | 自建部署平台 | Vercel Deploy Button |
|---------|------------|---------------------|
| 开发成本 | 3-6 个月 | 0 |
| 维护成本 | 持续运维 | Vercel 承担 |
| 免费额度 | 需要自己承担服务器 | 100GB/月 带宽 |
| 自定义域名 | 自己实现 | 自动支持 |
| SSL | 自己配置 | 自动签发 |
| 用户学习成本 | 中等 | **极低（点一个按钮）** |
| 绑定风险 | 平台锁定 | 用户随时导出代码 |

### S2 前置条件

S2 建站完成后，代码必须推到 GitHub（公开仓库）。这是 S3 的前置条件：

```text
S2 输出要求新增：
  ☑ npm run test 通过
  ☑ npm run build 通过（0 errors）
  ☑ 代码已 push 到 GitHub repo
  ☑ repo 根目录有 vercel.json（如有特殊配置）
```

对 Astro 项目，Vercel 零配置自动识别，不需要 `vercel.json`。

## 3. 用户操作流程（小白视角）

### Step 1：购买域名（5 分钟）

用户看到的不是"请自行购买域名"，而是一份**逐帧操作卡**：

```
┌─────────────────────────────────────────────────┐
│  Step 1：注册域名                         5 分钟  │
├─────────────────────────────────────────────────┤
│                                                   │
│  1. 打开 namesilo.com（推荐，支持支付宝）            │
│                                                     │
│  2. 搜索你的域名，例如：                          │
│     dimweightcalculator.com                        │
│                                                     │
│  3. 选 .com，点击 Register                           │
│                                                     │
│  4. 注册账号（邮箱 + 密码）                           │
│                                                     │
│  5. 付款（支付宝/信用卡）                            │
│                                                     │
│  6. 不需要购买任何附加服务                            │
│     （WHOIS 隐私默认免费）                           │
│                                                     │
│  [截图 1: Namesilo 搜索框]                          │
│  [截图 2: 购物车结账页面]                             │
│  [截图 3: 购买成功确认页]                             │
│                                                     │
│  ⚠️ 记下你的域名：_____________.com                  │
│                                                     │
│  □ 完成                                             │
└─────────────────────────────────────────────────┘
```

### Step 2：一键部署（1 分钟）

```
┌─────────────────────────────────────────────────┐
│  Step 2：部署到线上                        1 分钟  │
├─────────────────────────────────────────────────┤
│                                                     │
│  点击下方按钮 →                                     │
│                                                     │
│  ┌──────────────────────────────────┐              │
│  │  ▲ Deploy to Vercel              │              │
│  └──────────────────────────────────┘              │
│                                                     │
│  1. 用 GitHub 账号登录 Vercel                       │
│  2. 点击 Authorize（授权）                          │
│  3. Vercel 自动部署，30 秒后完成                     │
│                                                     │
│  你会得到一个临时地址：                              │
│  dimweight-calc.vercel.app                          │
│                                                     │
│  □ 部署完成，能看到网站在线                           │
└─────────────────────────────────────────────────┘
```

### Step 3：绑定域名（5 分钟）

```
┌─────────────────────────────────────────────────┐
│  Step 3：绑定你的域名                     5 分钟   │
├─────────────────────────────────────────────────┤
│                                                     │
│  3.1 在 Vercel 中添加域名                           │
│                                                     │
│  1. 打开 Vercel 项目 → Settings → Domains           │
│  2. 输入你的域名：dimweightcalculator.com            │
│  3. 点击 Add                                        │
│  4. Vercel 会显示需要配置的 DNS 记录                  │
│                                                     │
│  [截图: Vercel Domains 页面]                         │
│                                                     │
│  3.2 在 Namesilo 中配置 DNS                          │
│                                                     │
│  1. 打开 Namesilo → My Account → Domain Manager     │
│  2. 点击你的域名 → DNS Records                       │
│  3. 删除已有的 A 记录                                │
│  4. 添加新记录：                                    │
│     Type: A                                         │
│     Host: @                                         │
│     Value: 76.76.21.21（Vercel 的 IP）               │
│  5. 添加 CNAME 记录：                                │
│     Type: CNAME                                     │
│     Host: www                                       │
│     Value: cname.vercel-dns.com                     │
│  6. 提交                                             │
│                                                     │
│  [截图: Namesilo DNS 配置页面]                       │
│                                                     │
│  3.3 等待生效（1-5 分钟）                             │
│                                                     │
│  Vercel 会自动检测 DNS 生效并签发 SSL 证书            │
│                                                     │
│  □ DNS 配置完成                                      │
│  □ 域名的 HTTPS 能正常访问                            │
└─────────────────────────────────────────────────┘
```

### Step 4：验证上线（2 分钟）

```
┌─────────────────────────────────────────────────┐
│  Step 4：验证上线                         2 分钟   │
├─────────────────────────────────────────────────┤
│                                                     │
│  □ 打开 https://你的域名.com → 能正常访问            │
│  □ 地址栏显示 🔒 锁（SSL 正常）                      │
│  □ 手机上也能打开                                    │
│  □ 表单输入数值 → 结果正常计算                        │
│  □ 免责声明可见                                     │
│  □ 来源链接可点击                                   │
│                                                     │
└─────────────────────────────────────────────────┘
```

### Step 5：提交 Search Console（3 分钟）

```
┌─────────────────────────────────────────────────┐
│  Step 5：让 Google 收录你的网站           3 分钟   │
├─────────────────────────────────────────────────┤
│                                                     │
│  1. 打开 search.google.com/search-console           │
│  2. 添加资源 → 网址前缀 →                          │
│     输入 https://你的域名.com                        │
│  3. 验证所有权：选 "HTML 标记"                      │
│  4. 复制 meta 标签                                  │
│                                                     │
│  5. 回到代码，在 src/components/ToolLayout.astro    │
│     <head> 中添加：                                 │
│     <meta name="google-site-verification"            │
│           content="粘贴你的验证码" />                 │
│                                                     │
│  6. 重新部署（Vercel 自动检测 Git push）              │
│                                                     │
│  7. 回到 Search Console → 点击验证                   │
│                                                     │
│  8. 提交 sitemap：                                  │
│     https://你的域名.com/sitemap-index.xml           │
│                                                     │
│  □ Search Console 验证通过                           │
│  □ sitemap 已提交                                   │
└─────────────────────────────────────────────────┘
```

**⚠️ HTML 标记验证的前提条件**：Google 会抓取**根路径** `https://你的域名.com/` 来读取验证 meta 标签。如果根路径返回 404，验证会失败。S2 建站时必须确保 `src/pages/index.astro` 存在（即使只是导航页），不能只有子路径页面。

### ⚠️ 环境变量必须手动设置

Vercel CLI 部署不会自动读取 `astro.config.mjs` 中的环境变量默认值。部署后必须手动设置 `SITE_URL`：

```bash
vercel env add SITE_URL production
# 输入：https://你的域名.vercel.app（或真实域名）
```

否则 sitemap 会生成 `http://localhost:4321` 的 URL，导致 Search Console 报错。

---

## 4. 实现架构

### 4.1 S2 → S3 交接数据

S2 建站完成后，向 S3 传递：

```typescript
interface S3HandoffData {
  // 从 S2 来
  projectSlug: string;
  toolName: string;
  domainName: string;           // 建议域名
  githubRepoUrl: string;        // S2 建的 GitHub 仓库地址
  siteUrlEnvVar: string;        // SITE_URL 环境变量，初始 = ""
  
  // S3 预生成
  deployButtonUrl: string;      // Vercel Deploy Button 完整 URL
  dnsConfigGuide: DnsGuide;     // DNS 配置指南（含具体 IP/记录值）
  searchConsoleVerification: string; // 即将写入的验证 meta 标签
}

interface DnsGuide {
  registrar: "namesilo" | "cloudflare" | "namecheap";
  steps: DnsStep[];
}

interface DnsStep {
  action: string;               // "add_record" | "delete_record"
  type: "A" | "CNAME";
  host: string;
  value: string;
  screenshotReference: string;  // 操作卡中对应截图的编号
}
```

### 4.2 工作站产出结构

S3 对每个工具站产出：

```text
03-seo-growth/<project-slug>/
├── deployment-card.md          # 上面的 5 步操作卡
├── deploy-button-url.txt        # Vercel Deploy Button URL
├── dns-config.json              # DNS 配置数据
├── search-console-checklist.md  # Search Console 提交清单
└── launch-report.md             # 上线后验证报告
```

### 4.3 自动化部署配置

在 S2 建站阶段，代码仓库中预置：

```json
// vercel.json（放在项目根目录）
{
  "buildCommand": "ASTRO_TELEMETRY_DISABLED=1 astro check && ASTRO_TELEMETRY_DISABLED=1 astro build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

同时必须安装 `@astrojs/sitemap` 并在 `astro.config.mjs` 中注册：

```js
// astro.config.mjs
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [react(), sitemap()],
  // ...
});
```

这样 Vercel Deploy Button 点击后，Vercel 自动用这些命令构建，sitemap-index.xml 自动生成。

## 5. 工作流模块

### 5.1 部署前检查

```
输入：S2 交接数据
输出：通过/不通过 检查报告
```

检查项：

| 检查项 | 通过条件 |
|--------|---------|
| GitHub repo 可访问 | `git ls-remote <url>` 成功 |
| `npm run test` | 全部通过 |
| `npm run build` | 0 errors |
| `astro.config.mjs` 环境变量入口 | `site` 走 `process.env.SITE_URL` |
| `vercel.json` 存在 | 根目录存在 |
| 免责声明存在 | 页面含 `id="disclaimer"` |
| 来源标注完整 | 所有数据有 `sourceUrl`/`sourceDate`/`confidence` |

### 5.2 生成操作卡

```
输入：S2 交接数据 + 域名选择
输出：deployment-card.md（5 步操作卡）
```

自动生成内容：
1. 域名建议（基于工具名称 + SEO 关键词）
2. Namesilo 购买链接（预填搜索词）
3. Vercel Deploy Button URL
4. DNS 配置具体值（A 记录 IP、CNAME 记录值）
5. Search Console 提交的具体 sitemap URL

人工填充：
1. 截图（Namesilo 页面、Vercel 页面、DNS 配置页面）
2. Google 验证 meta 标签的具体 content 值

### 5.3 部署后验证

```
输入：已部署的网站 URL
输出：验证报告
```

| 检查项 | 验证方式 |
|--------|---------|
| HTTPS 可访问 | curl -I |
| SSL 证书有效 | 浏览器检查 |
| 移动端布局正常 | 实际浏览器测试 |
| 表单交互正常 | 输入测试值 → 确认结果 |
| 来源链接可点击 | 逐个点击验证 |
| 免责声明可见 | 视觉检查 |
| sitemap 可访问 | curl /sitemap-index.xml |
| Search Console 已验证 | 确认验证状态 |

### 5.4 SEO 元信息检查

| 检查项 | 每页要求 |
|--------|---------|
| `<title>` | 含主关键词，≤60 字符 |
| `<meta description>` | 含主关键词 + CTA，≤160 字符 |
| H1 | 含主关键词 |
| Canonical URL | 自引用，指向真实域名 |
| `robots.txt` | 不屏蔽任何页面 |
| Open Graph | `og:title` + `og:description` + `og:image` |

### 5.5 上线后 30 天监测指标

```
建立以下指标的基线（上线当天）：

□ Google 收录页数
□ 日均 impressions
□ 日均 clicks
□ 平均 CTR
□ 平均排名
□ 核心关键词排名
□ 移动端可用性问题
□ Core Web Vitals (LCP/FID/CLS)
```

7 天 + 30 天两个复查节点，数据喂入 S5 复盘工作站。

## 6. 质量门槛

| # | 规则 | 验证方式 |
|---|------|---------|
| Q1 | 域名已正确绑定 + HTTPS 正常 | curl -I |
| Q2 | SSL 证书有效且自动续期 | Vercel Dashboard |
| Q3 | Search Console 已验证 | SC Dashboard |
| Q4 | sitemap 已提交且无错误 | SC Sitemaps |
| Q5 | 所有页面 canonical URL 指向真实域名 | 页面源码检查 |
| Q6 | 免责声明 + 来源链接完整 | 视觉检查 |
| Q7 | 移动端表单可正常使用 | 实际手机测试 |
| Q8 | 部署不是手动 FTP/SSH，走 Git push 自动触发 | Vercel Git Integration |

## 7. Stop-loss 规则

- 没有真实域名时，**不提交 Search Console**。
- 来源或免责声明缺失，**不提交收录**。
- 核心计算测试未通过，**不部署**。
- 如果 DNS 配置后 1 小时 HTTPS 仍未生效，引导用户检查 DNS 记录是否正确、Namesilo 是否用了默认 Nameserver。

## 8. Prompt 库

### 8.1 部署操作卡生成 Prompt

```text
你是一个为非技术用户编写操作指南的专家。请基于以下信息生成一份"上线部署操作卡"。

工具名称：<工具名>
建议域名：<domain.com>
GitHub 仓库地址：<repo-url>
Vercel Deploy Button URL：https://vercel.com/new/clone?repository-url=<repo-url>
DNS 配置信息：
  - A 记录：Host @ → Value 76.76.21.21
  - CNAME 记录：Host www → Value cname.vercel-dns.com

操作卡必须：
1. 每一步有预估时间（分钟）。
2. 每一步有具体操作指令（"点击 X 按钮"不是"配置 Y 参数"）。
3. 标注需要截图的位置（用 [截图: 描述] 占位）。
4. 关键信息用 ┌─┐ 框突出显示。
5. 每一步末尾有 □ 勾选框。
6. 使用中文，但界面上的英文按钮名保持原样（如 "Add Domain"）。
7. 不假设用户懂 DNS、CNAME、SSL 等术语——每一步都给出具体值。
```

### 8.2 SEO 检查 Prompt

```text
你是 SEO 技术审查员。请检查以下网站的 SEO 基础配置。

网站 URL：<url>
页面列表：<所有页面 URL>

请逐页检查并输出：
1. <title> 内容 + 字符数 + 是否含主关键词
2. <meta description> 内容 + 字符数 + 是否含 CTA
3. H1 内容 + 是否含主关键词
4. Canonical URL + 是否正确自引用
5. robots.txt 内容 + 是否有误屏蔽
6. sitemap.xml 是否存在 + 是否包含所有页面
7. Open Graph 标签是否完整

发现问题时：给出具体修复代码，不只是描述问题。
```

### 8.3 上线验证 Prompt

```text
你是 QA 工程师。请按以下清单验证工具站上线状态，每项输出 PASS/FAIL + 证据。

网站 URL：<url>

验证清单：
1. HTTPS 可访问（curl -I 返回 200 或 301/308）
2. SSL 证书有效（浏览器不显示警告）
3. 移动端布局（375px 宽度）无横向溢出
4. 表单：输入正常值 → 得到正确计算结果
5. 表单：输入 0 或负数 → 显示"Check inputs"
6. 来源链接：全部可点击，全部是新标签页打开
7. 免责声明：在页面中可见
8. sitemap：/sitemap-index.xml 返回 200
9. 404 页面：访问 /nonexistent 不白屏

FAIL 项：给出复现步骤 + 截图位置标注。
```

## 9. 数据结构

每个上线记录：

| 字段 | 说明 |
|------|------|
| project_slug | 项目标识 |
| domain | 真实域名 |
| vercel_project_url | Vercel 项目 URL |
| deploy_date | 部署日期 |
| ssl_status | 有效/待生效/异常 |
| search_console_verified | 是/否 |
| sitemap_submitted | 是/否 |
| indexed_pages_baseline | 上线时收录页数 |
| impressions_day1 | 首日 impressions |
| mobile_usable | 是/否 |
| core_web_vitals | LCP/FID/CLS 基线值 |
| launch_issues | 上线时已知问题列表 |
| seven_day_review_date | 7 天复查日期 |
| thirty_day_review_date | 30 天复查日期 |

## 10. 第一版成功标准

- 非技术用户能通过操作卡在 20 分钟内完成"购买域名 → 部署 → 绑定 → 上线"。
- 部署按钮点击后 60 秒内网站在线（vercel.app 子域名）。
- SSL 证书自动签发，用户不需要手动操作。
- Search Console 验证 + sitemap 提交在 10 分钟内完成。
- 上线后 7 天内至少 1 个页面被 Google 收录。

## 11. 与相邻工作站的接口

### 上游：S2 建站 → S3 部署

```
S2 输出：GitHub repo + 测试通过 + 构建通过
→ S3 检查部署前置条件
→ S3 生成操作卡 + 部署按钮
```

### 下游：S3 部署 → S4 推广+内容

```
S3 输出：已上线网站 + Search Console 已验证 + sitemap 已提交
→ S4 基于上线站点生成推广内容
```

### 下游：S3 部署 → S5 30 天复盘

```
S3 输出：基线数据（收录数、impressions、CWV）
→ S5 7 天/30 天复查
```

## 12. 常见问题与排查

| 现象 | 可能原因 | 解决 |
|------|---------|------|
| Deploy Button 点不开 | GitHub 未登录 | 先登录 github.com |
| 部署后 404 | `astro.config.mjs` 中 `base` 路径不对 | 确认 `base: "/"` |
| HTTPS 一直 pending | DNS A 记录未生效 | 等 5-10 分钟，或用 `dig` 检查 |
| 域名跳转到广告页 | Namesilo 默认 parking | 在 Namesilo 中关闭 Domain Parking |
| Search Console 验证失败 | meta 标签未部署 | 确认 Vercel 重新部署了包含 meta 标签的版本 |
| sitemap 404 | Astro 未生成 sitemap | `npm install @astrojs/sitemap`，在 `astro.config.mjs` 中注册 |
