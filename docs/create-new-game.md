# 创建新游戏 · v1.0

```bash
npm run create-game -- golden-retriever-cheese
```

命令复制 `games/_template` 到 `games/golden-retriever-cheese/`，替换 gameId，重建目录数据；打开 `http://localhost:4173/` 即可找到新卡片。目标目录已存在则拒绝覆盖。也可以手动复制模板后运行 `npm run catalog`。

按下面顺序配置：

1. 把原角色、Boss、场景图放在 `games/<id>/assets/`；先去掉背景截图中的交互按钮。Demo 图片只是模板占位，正式发布请换成该游戏获确认的原素材。
2. 修改 `game.config.js` 的 `title`、`catalog`、`assets`。`assets.<id>={src:'./assets/x.png',crop:[x,y,w,h]}`；整张图不需要 crop。`aspect` 必须等于裁剪区域宽/高；`height` 是逻辑画布高度（主角建议 216–252，占 720 的 30%–35%）；`body` 是归一化命中区域。
3. 定义 `player`、`enemies`、`forms`、`skills`、`weapons`、`economy`、`shop`、`difficulty`。初始空手填 `initialWeapon:null`；物理金币保持 `coinDrop:true, physicalPickup:true`。武器的 `asset` 和 `crop` 显示其原图，价格/伤害/射速/技能互相独立。
4. 修改 `levels.config.js` 的每关 `id, background, playerX, enemies, boss, exitX, requires`。第一关不写 requires；后续用前关 id 指定依赖。Boss 配置 `phases:[{threshold:1,...},{threshold:.5,...}]`，不同阶段按血量比例生效。敌人统一站地面；高低平台本版不支持。
5. `npm start` 进入游戏。`npm test` 校验图集和逻辑配置、关卡循环依赖和 Boss/敌人命中范围。`npm run test:game` 需要本机安装 Playwright Chromium；`npm run qa` 应在发布前全通过。用手机横屏确认视觉风格、按钮与刘海屏安全区。URL 加 `?debug=1` 看碰撞盒。

自定义技能用 `registerSkill('my-skill', MySkill)` 在 `main.js` 初始化 Game 前注册；`MySkill` 接收配置并实现 `execute(world,actor)`。与战斗无关的新游戏类型应复用输入/资源/存档/适配模块，再实现自己的 World 规则，不要把塔防硬写成横版敌人 AI。

存档按 gameId 隔离，改 gameId 会建立新存档。发布后变更存档格式须做迁移或显式提升版本，不要改掉已购武器。目录页历史游戏入口是原版 HTML，若需要迁移其中一款，先做素材拆解和该玩法的单独验收。
