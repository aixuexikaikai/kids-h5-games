import {EventBus} from './EventBus.js';import {SceneManager} from './SceneManager.js';import {Player} from '../entities/Player.js';
import {MovementSystem} from '../systems/MovementSystem.js';import {DamageSystem} from '../systems/DamageSystem.js';import {CombatSystem} from '../systems/CombatSystem.js';import {CoinSystem} from '../systems/CoinSystem.js';import {ShopSystem} from '../systems/ShopSystem.js';import {SaveSystem} from '../systems/SaveSystem.js';import {UnlockSystem} from '../systems/UnlockSystem.js';import {SpawnSystem} from '../systems/SpawnSystem.js';import {EnemySystem} from '../systems/EnemySystem.js';import {LevelManager} from '../levels/LevelManager.js';import {EffectsSystem} from '../effects/EffectsSystem.js';import {TransformSkill} from '../skills/TransformSkill.js';
export class World {
 constructor(config,storage){this.config=config;this.width=config.world.width;this.ground=config.world.ground;this.events=new EventBus();this.scenes=new SceneManager(this.events);this.save=new SaveSystem(config,storage,this.events);this.movement=new MovementSystem();this.damage=new DamageSystem();this.combat=new CombatSystem();this.coins=new CoinSystem();this.shop=new ShopSystem(this);this.unlocks=new UnlockSystem();this.spawns=new SpawnSystem();this.ai=new EnemySystem();this.levels=new LevelManager(this);this.fx=new EffectsSystem();this.enemies=[];this.pickups=[];this.projectiles=[];this.elapsed=0;}
 start(id){if(!this.save.data.unlockedLevels.includes(id))return false;
 const level=this.levels.get(id);this.scenes.go('TRANSITION');this.level=level;const spec=structuredClone(this.config.player);spec.hp*=this.config.difficulty.playerHP;this.player=new Player(spec,level.playerX,this.ground,this.save.data.equippedWeapon);
 this.enemies=[];this.pickups=[];this.projectiles=[];this.fx=new EffectsSystem();this.attackBox=null;this.bossSpawned=false;this.elapsed=0;
 for(const s of level.enemies)this.spawns.spawn(this,s);this.scenes.go('PLAYING');return true;}
 update(dt,input={}){if(this.scenes.state!=='PLAYING')return;this.elapsed+=dt;this.fx.update(dt);
 for(const a of [this.player,...this.enemies]){a.age+=dt;a.inv=Math.max(0,a.inv-dt);a.flash=Math.max(0,a.flash-dt);a.cooldown=Math.max(0,a.cooldown-dt);}
 const p=this.player;p.skillCooldown=Math.max(0,p.skillCooldown-dt);p.transformFX=Math.max(0,p.transformFX-dt);if(p.form){p.formTime-=dt;if(p.formTime<=0)TransformSkill.restore(this,p);}
 if(this.attackBox){this.attackBox.time-=dt;if(this.attackBox.time<=0)this.attackBox=null;}
 this.movement.update(this,dt,input);if(input.attack)this.combat.attack(this);if(input.skill)this.combat.skill(this);
 this.ai.update(this,dt);if(this.scenes.state!=='PLAYING')return;this.combat.update(this,dt);if(this.scenes.state!=='PLAYING')return;
 this.coins.update(this,dt);this.spawns.update(this);
 if(this.bossSpawned&&this.enemies.every(e=>e.dead)&&p.x>=this.level.exitX){this.unlocks.complete(this);this.scenes.go('VICTORY');}
 }
 snapshot(){return {state:this.scenes.state,level:this.level?.id,player:this.player?{x:this.player.x,y:this.player.y,hp:this.player.hp,height:this.player.height,asset:this.player.asset,box:this.player.box,weapon:this.player.weapon,form:this.player.form}:null,enemies:this.enemies.map(e=>({id:e.id,x:e.x,y:e.y,hp:e.hp,dead:e.dead,boss:!!e.isBoss,box:e.box,phase:e.phase,warning:e.warning})),projectiles:this.projectiles.length,pickups:this.pickups.map(c=>({x:c.x,y:c.y,value:c.value,rest:c.rest})),save:structuredClone(this.save.data),saveStatus:this.save.status};}
}
