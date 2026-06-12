# 部署操作卡：Dimensional Weight Calculator

> 预计总时间：≤20 分钟 | 难度：不需要任何技术背景

## 前置准备

```
☑ 代码已推送到 GitHub：github.com/Ericyin19800217/toolsite-os
☑ 已部署到 Vercel：dim-weight-calculator.vercel.app
☑ Search Console 已验证 + sitemap 已提交
□ 域名已购买（待操作）
```

---

## Step 1：购买域名（5 分钟）

```
1. 打开 namesilo.com

2. 搜索域名（推荐以下之一）：
   ● dimweightcalculator.com
   ● dimensionalweightcalc.com
   ● free-dim-weight-calculator.com

3. 选 .com → 点击 Register

4. 注册 Namesilo 账号（邮箱 + 密码）

5. 付款（支持支付宝）

6. ⚠️ 不需要购买任何附加服务
   （WHOIS 隐私保护默认免费）

[截图: Namesilo 域名搜索框]
[截图: 购物车结账页面]
[截图: 购买成功确认页]

□ 记下你的域名：____________________
```

---

## Step 2：一键部署（1 分钟）

```
点击下方按钮：

┌──────────────────────────────────┐
│  ▲ Deploy to Vercel              │
│  (URL: 待 GitHub repo 创建后生成)  │
└──────────────────────────────────┘

1. 用 GitHub 账号登录 Vercel
2. 点击 Authorize（授权）
3. Vercel 自动部署，30 秒后完成

你会得到一个临时地址：
<project-name>.vercel.app

[截图: Vercel 授权页面]
[截图: 部署成功页面]

□ 临时地址能正常访问
```

---

## Step 3：绑定域名（5 分钟）

```
3.1 在 Vercel 中添加域名

1. Vercel 项目 → Settings → Domains
2. 输入你买的域名，点击 Add
3. Vercel 显示需要配置的 DNS 记录

[截图: Vercel Domains 页面]

3.2 配置 DNS（在 Namesilo 中）

1. Namesilo → My Account → Domain Manager
2. 点击你的域名 → DNS Records
3. 删除已有的 A 记录
4. 添加新记录：

   Type:  A
   Host:  @
   Value: 76.76.21.21

5. 添加 CNAME 记录：

   Type:  CNAME
   Host:  www
   Value: cname.vercel-dns.com

6. 提交

[截图: Namesilo DNS 配置页面]

3.3 等待生效（1-5 分钟）

Vercel 会自动检测 DNS 生效并签发 SSL 证书。

□ 打开 https://你的域名.com → 正常访问
□ 地址栏显示 🔒（SSL 正常）
```

---

## Step 4：验证上线（2 分钟）

```
检查清单：

□ https://你的域名.com → 能正常打开
□ 地址栏有 🔒 锁图标
□ 手机上也能正常打开和操作
□ 选择一个 carrier → 输入长宽高 → 结果正常计算
□ 输入 0 或负数 → 显示 "Check inputs"
□ 页面底部有 Disclaimer 免责声明
□ Formula Source 链接可点击
```

---

## Step 5：提交 Google 收录（3 分钟）

```
1. 打开 search.google.com/search-console
2. 添加资源 → 网址前缀 → https://你的域名.com
3. 验证所有权 → 选 "HTML 标记"
4. 复制 meta 标签

5. 在代码中：src/components/ToolLayout.astro 的 <head> 添加：
   <meta name="google-site-verification"
         content="粘贴你的验证码" />

6. 重新部署（Vercel 自动检测 Git push）

7. 回 Search Console → 点击验证

8. 提交 sitemap：
   https://你的域名.com/sitemap-index.xml

□ Search Console 显示 "已验证"
□ sitemap 提交成功
```

---

## 待办事项

| 事项 | 状态 | 负责人 |
|------|------|--------|
| 创建 GitHub repo + push 代码 | ❌ | Eric/Claude |
| 生成 Vercel Deploy Button URL | ❌ | 等 repo 创建后 |
| 添加 @astrojs/sitemap | ❌ | Codex |
| 选择并购买域名 | ❌ | Eric |
| 操作卡截图（Namesilo/Vercel/DNS 页面） | ❌ | 部署时截取 |

---

## S3 验证数据（上线后填写）

| 字段 | 值 |
|------|-----|
| 域名 | — |
| 部署日期 | — |
| SSL 状态 | — |
| Search Console 验证 | — |
| sitemap 提交 | — |
| 上线时收录页数 | — |
