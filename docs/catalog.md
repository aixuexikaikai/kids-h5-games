# 我的小游戏目录 · v1.0

用 `npm start` 打开 `http://localhost:4173/`；也可将压缩包解压后直接打开 `index.html`，离线查找并打开历史原版。新引擎游戏使用 ES modules，仍需要本地服务。目录页提供封面、标题、玩法类型、版本与新旧引擎标记；支持搜索和过滤。点击卡片进入游戏；刷新目录可以看到刚创建的新游戏。

当前登记 22 款：引擎 Demo 1 款、历史原版 21 款。历史版取该游戏已找到的较新成品；玩具保卫战的不同玩法版本各单列一张卡。历史 HTML 保持原始字节，封面图片直接提取原文件已有图，不对角色重绘。部分早期版本可能存在原来的 Bug，目录页不会默认为其完成迁移。

要加历史游戏：复制独立 HTML 到 `games/legacy/<slug>/game.html`，放原素材封面 `cover.png/webp`，在 `games/legacy/manifest.json` 添加 title/category/version/source/cover/href/status/sha256，并运行 `npm run catalog`。若旧游戏是多文件压缩包，请解压成同目录并把 href 指向实际入口，确认不依赖原电脑的路径。

要加新引擎游戏：运行 `npm run create-game -- slug`。如要换目录封面，在 `game.config.js` 加 `catalog:{title:'展示名',category:'格斗',cover:'assets/cover.png'}`；不设置时使用第一关背景图。生成命令不修改任何历史作品。
