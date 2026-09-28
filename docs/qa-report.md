# QA 报告 · v1.0

执行日期：2026-09-27。判定：**FAIL（浏览器端自动验收缺项）**。

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 引擎逻辑、碰撞、经济、存档、变身、关卡/目录 | PASS | `npm test`：22/22；`qa/unit.test.mjs` 与 `qa/catalog.test.mjs` |
| 两关完整规则模拟 | PASS | `npm run test:simulation`：空手→移动/击杀→地面金币/拾取→买枪/装备→Boss→出口→解锁→第二关通关；`qa/artifacts/simulation.json` |
| 服务路由与原成品入口 | PASS | 本地 HTTP：目录/目录 JSON/Demo/素材/历史游戏/封面均 200；历史 HTML SHA-256 与导入源一致；离线首页嵌入目录与 JSON 一致 |
| 页面 Smoke / 手机多尺寸 / 真实触控 / 浏览器完整流程 | **未通过** | 已编写 `qa/browser.mjs`，执行 `npm run test:game` 时此环境没有 Chromium；官方浏览器包下载返回损坏/空数据；云端浏览器无法访问本地 `127.0.0.1`。具体错误在 `qa/artifacts/browser-report.md` |
| Boss/矮怪可达性 | PASS | 正例两关各普通怪/Boss；地下敌人、出界 Boss、不可达出口的反例必须 FAIL |
| 严重 Console Error | **未验证** | 尚无可运行浏览器，因此不可宣称零错误 |
| 小米与 iPhone 实机 | **未验证** | 必须在可用设备上进行 16:9 和异形屏人工验收 |

模拟先发现第二关捡金币后角色朝左，导致对右侧 Boss 空射；已修复为攻击时自动朝最近可达敌人，并增加回归测试。又发现服务根路径判定多一个斜杠使全部请求 403，已修复并重新请求全部入口。

在可安装浏览器的环境执行 `npm install && npx playwright install chromium && npm run qa`。浏览器测试将真实按键/双指触控跑完整两关，验证横屏 1280×720、800×450、915×412、844×390、667×375、568×320 及竖屏转回、资源失败可见提示与 Console 无严重错误。测试输出 JSON、Markdown 与截图在 `qa/artifacts/`。浏览器门槛通过且手机视觉验收后，方可将总判定改为 PASS；不能用逻辑测试代替浏览器测试。
