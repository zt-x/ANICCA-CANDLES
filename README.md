# ANICCA-CANDLES Product Query

一个简单的HTML5单页面应用，用于通过商品ID查询购买信息，并根据商品种类展示不同界面。

## 项目结构

- `index.html` - 主页面
- `style.css` - 样式表
- `script.js` - JavaScript逻辑
- `database.sql` - 数据库创建脚本
- `.env` - 环境变量（本地开发使用）

## Netlify部署指南

### 1. 将项目推送到GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. 在Netlify上部署

1. 登录Netlify账户
2. 点击"New site from Git"
3. 选择GitHub作为Git提供商
4. 授权Netlify访问您的GitHub账户
5. 选择您的仓库
6. 保持构建设置为默认值
7. 点击"Deploy site"

### 3. 设置环境变量

为了保护您的Supabase凭据，请在Netlify中设置环境变量：

1. 在Netlify仪表板中，进入您的站点
2. 点击"Site settings"
3. 在左侧菜单中，点击"Environment variables"
4. 添加以下环境变量：
   - `SUPABASE_URL`: 您的Supabase项目URL
   - `SUPABASE_ANON_KEY`: 您的Supabase匿名密钥

### 4. 重新部署

设置环境变量后，触发重新部署：

1. 在Netlify仪表板中，进入您的站点
2. 点击"Deploys"标签
3. 点击"Trigger deploy" > "Deploy site"

## 本地开发

1. 克隆仓库
2. 在`.env`文件中填入您的Supabase凭据
3. 使用本地服务器运行项目，例如：
   ```bash
   npx serve
   ```

## 数据库设置

1. 登录您的Supabase账户
2. 创建新项目或使用现有项目
3. 进入SQL编辑器
4. 运行`database.sql`文件中的SQL代码

## 注意事项

- `.env`文件已添加到`.gitignore`中，不会被提交到GitHub
- 在Netlify上，环境变量通过Netlify的环境变量功能安全存储
- 在生产环境中，请确保使用适当的访问控制和安全措施