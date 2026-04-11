<div align="center" markdown="1">
  <table>
    <tr>
      <td align="center" valign="middle">
        <a href="https://mseep.ai/app/executeautomation-mcp-playwright">
          <img src="https://mseep.net/pr/executeautomation-mcp-playwright-badge.png" alt="MseeP.ai Security Assessment Badge" height="80"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center"><sub>MseeP.ai Security Assessment</sub></td>
    </tr>
  </table>
</div>
<hr>

# Playwright MCP Server 🎭

[![Trust Score](https://archestra.ai/mcp-catalog/api/badge/quality/executeautomation/mcp-playwright)](https://archestra.ai/mcp-catalog/executeautomation__mcp-playwright)
[![smithery badge](https://smithery.ai/badge/@executeautomation/playwright-mcp-server)](https://smithery.ai/server/@executeautomation/playwright-mcp-server)

一个基于 Playwright 提供浏览器自动化能力的 Model Context Protocol 服务器。该服务器让 LLM 能够在真实浏览器环境中与网页交互、截屏、生成测试代码、抓取页面内容并执行 JavaScript。

<a href="https://glama.ai/mcp/servers/yh4lgtwgbe"><img width="380" height="200" src="https://glama.ai/mcp/servers/yh4lgtwgbe/badge" alt="mcp-playwright MCP server" /></a>

## ✨ v1.0.10 新特性

### 🎯 143 个真实设备预设的设备模拟

只需一个简单命令，就能用 **真实设备配置** 测试你的 Web 应用：

```javascript
// 在 iPhone 13 上测试，自动带上 user-agent、触摸能力和设备像素比
await playwright_resize({ device: "iPhone 13" });

// 切换到横屏 iPad
await playwright_resize({ device: "iPad Pro 11", orientation: "landscape" });

// 测试桌面视图
await playwright_resize({ device: "Desktop Chrome" });
```

**支持 AI 助手自然语言调用：**
- "Test on iPhone 13" 
- "Switch to iPad view"
- "Rotate to landscape"

**支持 143 种设备：** iPhone、iPad、Pixel、Galaxy 以及桌面浏览器，并正确模拟视口、user-agent、触摸事件和设备像素比。

📚 [设备速查表](https://executeautomation.github.io/mcp-playwright/docs/playwright-web/Device-Quick-Reference) | [提示词指南](https://executeautomation.github.io/mcp-playwright/docs/playwright-web/Resize-Prompts-Guide)

## 截图
![Playwright + Claude](image/playwright_claude.png)

## [文档](https://executeautomation.github.io/mcp-playwright/) | [API 参考](https://executeautomation.github.io/mcp-playwright/docs/playwright-web/Supported-Tools)

## 安装

你可以通过 npm、mcp-get 或 Smithery 安装这个包：

使用 npm：
```bash
npm install -g @executeautomation/playwright-mcp-server
```

使用 mcp-get：
```bash
npx @michaellatman/mcp-get@latest install @executeautomation/playwright-mcp-server
```

使用 Smithery

通过 [Smithery](https://smithery.ai/server/@executeautomation/playwright-mcp-server) 为 Claude Desktop 自动安装 Playwright MCP：

```bash
npx @smithery/cli install @executeautomation/playwright-mcp-server --client claude
```

使用 Claude Code：
```bash
claude mcp add --transport stdio playwright npx @executeautomation/playwright-mcp-server
```


#### 在 VS Code 中安装

可以点击下面任一按钮在 VS Code 中安装 Playwright MCP Server：

<!--
// Generate using?:
const config = JSON.stringify({ name: 'playwright', command: 'npx', args: ["-y", "@executeautomation/playwright-mcp-server"] });
const urlForWebsites = `vscode:mcp/install?${encodeURIComponent(config)}`;
// Github markdown does not allow linking to `vscode:` directly, so you can use our redirect:
const urlForGithub = `https://insiders.vscode.dev/redirect?url=${encodeURIComponent(urlForWebsites)}`;
-->

[<img src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Server&color=0098FF" alt="Install in VS Code">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522playwright%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522%2540executeautomation%252Fplaywright-mcp-server%2522%255D%257D) 
[<img alt="Install in VS Code Insiders" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20Server&color=24bfa5">](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522playwright%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522%2540executeautomation%252Fplaywright-mcp-server%2522%255D%257D)

你也可以通过 VS Code CLI 安装 Playwright MCP Server：

```bash
# 适用于 VS Code
code --add-mcp '{"name":"playwright","command":"npx","args":["@executeautomation/playwright-mcp-server"]}'
```

```bash
# 适用于 VS Code Insiders
code-insiders --add-mcp '{"name":"playwright","command":"npx","args":["@executeautomation/playwright-mcp-server"]}'
```

安装完成后，ExecuteAutomation Playwright MCP Server 就可以在 VS Code 中供 GitHub Copilot agent 使用。

## 浏览器安装

### 自动安装（推荐）

Playwright MCP Server 在首次使用时会**自动安装浏览器二进制文件**。当服务器检测到浏览器缺失时，会：

1. 自动下载并安装所需浏览器（Chromium、Firefox 或 WebKit）
2. 在控制台输出安装进度
3. 安装完成后自动重试你的请求

**无需手动配置。** 直接开始使用服务器即可，它会自动处理浏览器安装。

### 手动安装（可选）

如果你更希望手动安装浏览器，或自动安装过程中遇到问题，可以执行：

```bash
# 安装所有浏览器
npx playwright install

# 或安装指定浏览器
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### 浏览器存储位置

浏览器默认安装到以下目录：
- **Windows:** `%USERPROFILE%\AppData\Local\ms-playwright`
- **macOS:** `~/Library/Caches/ms-playwright`
- **Linux:** `~/.cache/ms-playwright`

## Playwright Server 配置

### 标准模式（stdio）

这是 **Claude Desktop 推荐使用的模式**。

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

**注意：** 在 stdio 模式下，为了保持 JSON-RPC 通信输出干净，日志会自动只写入文件而不是控制台。日志文件路径为 `~/playwright-mcp-server.log`。

### HTTP 模式（独立服务器）

当你需要在无显示环境的系统上运行有头浏览器，或者从 IDE 的 worker 进程中使用时，可以把 MCP Server 作为独立 HTTP 服务运行：

> **给 Claude Desktop 用户的说明：** Claude Desktop 当前仍要求使用 stdio 模式（即 command/args 配置）。HTTP 模式更适合 VS Code、自定义客户端和远程部署。详情见 [CLAUDE_DESKTOP_CONFIG.md](CLAUDE_DESKTOP_CONFIG.md)。

#### 启动 HTTP 服务器

```bash
# 使用 npx
npx @executeautomation/playwright-mcp-server --port 8931

# 或者在全局安装后使用
playwright-mcp-server --port 8931
```

服务器启动后会输出可用端点：

```
==============================================
Playwright MCP Server (HTTP Mode)
==============================================
Port: 8931

ENDPOINTS:
- SSE Stream:     GET  http://localhost:8931/sse
- Messages:       POST http://localhost:8931/messages?sessionId=<id>
- MCP (unified):  GET  http://localhost:8931/mcp
- MCP (unified):  POST http://localhost:8931/mcp?sessionId=<id>
- Health Check:   GET  http://localhost:8931/health
==============================================
```

#### HTTP 模式的客户端配置

> **⚠️ 非常重要：** 使用 HTTP/SSE 传输时，`"type": "http"` 字段是**必填项**。

**适用于 VS Code GitHub Copilot：**
```json
{
  "github.copilot.chat.mcp.servers": {
    "playwright": {
      "url": "http://localhost:8931/mcp",
      "type": "http"
    }
  }
}
```

**适用于自定义 MCP 客户端：**
```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp",
      "type": "http"
    }
  }
}
```

**重要：** 如果没有 `"type": "http"`，连接会失败。

**对于 Claude Desktop：** 请继续使用 stdio 模式（见上面的标准模式）

#### HTTP 模式适用场景

- 在无显示环境的系统上运行有头浏览器（例如远程服务器）
- 与 VS Code GitHub Copilot 集成
- 将服务器作为后台服务运行
- 允许多个客户端访问同一个服务
- 通过 `/health` 端点排查问题
- 集成到自定义 MCP 客户端中

**监控说明：** 服务器内置监控系统，会在一个动态分配的端口上启动，以避免端口冲突。请查看控制台输出获取实际端口。

**注意：** 对于 Claude Desktop，目前仍建议继续使用 stdio 模式（见上文标准模式）。

## 故障排查

### `"No transport found for sessionId"` 错误

**现象：** 返回 400 错误，并提示 `"Bad Request: No transport found for sessionId"`

**解决方法：**
1. **检查配置中是否包含 `"type": "http"`**
   ```json
   {
     "url": "http://localhost:8931/mcp",
     "type": "http"  // ← This is REQUIRED!
   }
   ```

2. **检查服务端日志中是否出现了正确的连接顺序：**
   ```bash
   # 正常情况下应依次看到：
   # 1. "Incoming request" - GET /mcp
   # 2. "Transport registered" - 带有 sessionId
   # 3. "POST message received" - 使用相同 sessionId
   ```

3. **同时重启服务端和客户端**

### 连接问题

- **服务无法启动：** 检查 8931 端口是否可用
- **无法从外部访问：** 这是设计如此，出于安全考虑，服务只绑定 `localhost`
- **如果需要远程访问：** 可使用 SSH 隧道：
  ```bash
  ssh -L 8931:localhost:8931 user@remote-server
  ```

## 测试

本项目使用 Jest 进行测试，测试文件位于 `src/__tests__` 目录。

### 运行测试

可以使用以下任一命令运行测试：

```bash
# 使用自定义脚本运行测试（带覆盖率）
node run-tests.cjs

# 使用 npm scripts 运行测试
npm test           # 不带覆盖率运行测试
npm run test:coverage  # 带覆盖率运行测试
npm run test:custom    # 使用自定义脚本运行测试（等价于 node run-tests.cjs）
```

测试覆盖率报告会生成到 `coverage` 目录。

### 运行 evals

`evals` 包会加载一个 MCP 客户端并运行 `index.ts`，因此测试之间无需重复构建。你可以在 `npx` 命令前添加环境变量。完整文档见 [这里](https://www.mcpevals.io/docs)。

```bash
OPENAI_API_KEY=your-key  npx mcp-eval src/evals/evals.ts src/tools/codegen/index.ts
```

## 贡献指南

新增工具时，请注意工具名长度。有些客户端，例如 Cursor，对组合后的 `server_name:tool_name` 总长度限制为 60 个字符。

当前服务名是 `playwright-mcp`。请确保你的工具名足够短，不会超出该限制。

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=executeautomation/mcp-playwright&type=Date)](https://star-history.com/#executeautomation/mcp-playwright&Date)
