# Kids H5 Game Engine v1.0

儿童横屏 H5 游戏基础工程：原生 Canvas 2D + ES modules，游戏运行时无外部依赖。入口同时是游戏目录页，当前收录 21 款原样历史游戏及一个配置驱动 Demo。解压后直接打开根目录 `index.html` 可离线查找历史原版；运行新引擎 Demo 请启动服务。

```bash
node --version                      # 需要 Node.js 20+
npm start                           # 打开 http://localhost:4173/
npm run create-game -- my-new-game  # 根据模板创建，同时登记目录
npm test                            # 逻辑、资源目录、命中范围
npm run test:simulation             # 真实游戏规则模拟两关通关
npm run test:game                   # 浏览器 Smoke/Gameplay/Responsive/触控
npm run qa                          # 全部 QA，任一未通过返回非零退出码
```

浏览器测试需先 `npm install`、`npx playwright install chromium`。`?debug=1` 可查看状态、坐标、血量与命中盒。示范游戏：`http://localhost:4173/games/demo/`。完整审计、设计和新游戏指南见 `docs/`；测试证据见 `qa/artifacts/`。

这是适用于单地面横版闯关的最小引擎。以前的守护、格斗、塔防、抽盲盒 HTML 在目录里按原样开放，尚未统一迁移。对旧游戏的原版仍需分别验收。

## 游戏网站发布与版本更新

仓库已包含 GitHub Pages 自动发布流程。首次建好公开仓库后，在仓库 `Settings → Pages` 中将 Source 设为 `GitHub Actions`；此后每次把新版本推送到 `main`，测试通过后会自动更新游戏目录网站。

推荐的版本管理约定：

- 每款游戏使用固定目录，例如 `games/golden-retriever-cheese/`。
- 新版本直接更新该目录，并同步修改 `games/catalog.json` 中的版本号和更新时间。
- 需要保留旧版本时，放入该游戏目录下的 `versions/v1.0/` 等子目录。
- 提交信息使用 `game(slug): update to vX.Y`，便于以后查找历史版本。
