# Kids H5 Game Engine · Architecture v1.0

## 边界

引擎覆盖单地面 1280×720 横版战斗，Canvas 2D 游戏世界 + 唯一 DOM HUD/按钮层。手机以 contain 等比显示世界；操作按钮保持至少 72 CSS px。设备 DPR 上限 2；ResizeObserver、visualViewport、横竖屏与安全区域处理集中在 `platform/`。浏览器禁止自动全屏时给出提示。

```
Game (boot, fixed 60 Hz, error boundary)
  ├─ AssetLoader → AssetRegistry → Renderer + EffectsSystem
  ├─ World → SceneManager/EventBus
  │    ├─ Movement/Enemy AI/Spawn/Collision/Combat/Damage
  │    ├─ Coin/Shop/Unlock/Save/LevelManager
  │    └─ Player/Enemy/Boss/Projectile/CoinPickup
  └─ MobileControls + MobileAdapter + HUD
```

Game 独占每帧调用顺序；系统只写 World 数据，不直接更改 UI。SceneManager 按 `GameState.js` 的许可边切换。非 PLAYING 状态不更新角色、敌人、子弹、掉落。HUD 仅派发动作与订阅状态；触摸 pointerId 和键盘汇合为同一输入对象，失焦/状态切换清理长按。

## 规则与坐标

角色锚点是底部中心 `(x,y)`；图集裁剪按原宽高比例绘制。`body` 为相对图片包围框的归一化矩形，以左上相对于宽/高表示；这一数据同时用于被击中与 Debug 描边。攻击可达性在配置加载时检测出生范围、站位、图片边界、地面高度和基础攻击区域。子弹每步用线段扫过碰撞体，以免快速子弹穿过薄目标。Boss 阶段数值/预警在配置中指定；伤害只允许第一次死亡触发掉落。

CoinPickup 保存坐标、速度、弹跳与数值。敌人死亡只创建地面对象，余额直到 `CoinSystem` 与角色碰撞才变化。Shop 仅 SHOP 状态购买；金额和物品在内存同一事务变更，只进行一次存档写入；装备单独持久化。无初始武器由 `player.initialWeapon:null` 指定。变身的 asset、aspect、height、body、攻击技能、移动及跳跃参数各自替换，并在时限结束恢复；仅图片变色不是此 API 的实现。

存档键 `kids-h5:<gameId>:v1`，载荷含 gameId/version。仅允许配置存在的武器/关卡，完成关卡推导解锁；损坏载荷恢复默认，Storage 不可用时仍能在本次会话游玩并出现提示。v2 需显式迁移或独立命名空间，不能直接解释 v1。

## 素材与视觉

医院历史游戏的 characters/hospital/weapons/guns 四张原图原字节提取为 Demo 素材，沿用五角色裁剪区域与等比绘制思路。背景是独立无 UI 图，DOM 按钮唯一生成，不把源截图 UI 叠进可点 UI。变身的妈妈守护者来自同一武器图集。标准特效已提供受击、屏幕轻震、弹道拖尾、爆炸、金币弹出、跳跃尘土、Boss 警告、伤害数值、技能光效、变身光圈；Debug 显示命中盒/状态/FPS。

## 扩展协议

单游戏目录含 `index.html`, `main.js`, `game.config.js`, `levels.config.js`, `assets/`。引擎系统不引用 Demo 的角色名；武器注册在配置，技能类型通过 `registerSkill(type, class)` 扩展。新旧游戏由 `games/catalog.json` 登记；`npm run catalog` 重新扫描引擎游戏目录并合并 `games/legacy/manifest.json`；创建脚本会自动执行登记。目录的历史原版不代表引擎兼容性。

## 不在 v1 范围

无多层平台、卷屏地图、2D 俯视、双人格斗、完整塔防波次、音频资源管理、服务器账户和跨设备同步。儿童真实设备视觉与安全区最后仍需实机确认。另见 `docs/architecture-audit.md` 与 `docs/qa-report.md`。
