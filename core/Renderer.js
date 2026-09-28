export class Renderer {
 constructor(canvas,registry,world){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});if(!this.ctx)throw new Error('Canvas 2D unavailable');this.assets=registry;this.world=world;}
 sprite(id,x,y,h,flip=false,alpha=1){const a=this.assets.get(id),s=this.assets.size(id),w=h*s.w/s.h,ctx=this.ctx;ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.scale(flip?-1:1,1);if(a.crop)ctx.drawImage(a.image,...a.crop,-w/2,-h,w,h);else ctx.drawImage(a.image,-w/2,-h,w,h);ctx.restore();}
 draw(debug=false){const w=this.world,ctx=this.ctx,W=w.config.world.width,H=w.config.world.height;ctx.setTransform(this.canvas.width/W,0,0,this.canvas.height/H,0,0);ctx.fillStyle='#0b2c37';ctx.fillRect(0,0,W,H);
 const bg=this.assets.get(w.level?.background??w.config.levels[0].background).image;const scale=Math.max(W/bg.naturalWidth,H/bg.naturalHeight);ctx.drawImage(bg,(W-bg.naturalWidth*scale)/2,(H-bg.naturalHeight*scale)/2,bg.naturalWidth*scale,bg.naturalHeight*scale);
 const gradient=ctx.createLinearGradient(0,0,0,H);gradient.addColorStop(0,'#00121c77');gradient.addColorStop(.5,'#05283122');gradient.addColorStop(1,'#031924ee');ctx.fillStyle=gradient;ctx.fillRect(0,0,W,H);
 ctx.strokeStyle='#8ce4cf66';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,w.ground+3);ctx.lineTo(W,w.ground+3);ctx.stroke();
 if(!w.player){this.sprite(w.config.player.asset,400,w.ground,w.config.player.height*1.2);return;}
 ctx.save();if(w.fx.shake>0)ctx.translate(Math.sin(w.elapsed*91)*w.fx.shake,Math.cos(w.elapsed*77)*w.fx.shake*.5);
 if(w.bossSpawned&&w.enemies.every(e=>e.dead)){ctx.strokeStyle='#a3ffe7';ctx.lineWidth=8;ctx.strokeRect(w.level.exitX-25,w.ground-190,95,185);ctx.fillStyle='#d5ffbd';ctx.font='bold 28px system-ui';ctx.fillText('EXIT →',w.level.exitX-50,w.ground-205);}
 for(const c of w.pickups){ctx.save();ctx.translate(c.x,c.y+(c.rest?Math.sin(w.elapsed*5+c.id)*3:0));ctx.scale(.8+Math.sin(w.elapsed*6+c.id)*.12,1);ctx.beginPath();ctx.arc(0,0,15,0,7);ctx.fillStyle='#ffc94f';ctx.fill();ctx.strokeStyle='#fff1a9';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#9a641c';ctx.font='bold 16px system-ui';ctx.textAlign='center';ctx.fillText('★',0,6);ctx.restore();}
 for(const a of [...w.enemies.filter(e=>!e.dead),w.player]){ctx.fillStyle='#00101855';ctx.beginPath();ctx.ellipse(a.x,w.ground+4,a.width*.3,11,0,7);ctx.fill();const alpha=a.flash>0?.5:a.inv>0&&Math.floor(w.elapsed*13)%2?.6:1;
 this.sprite(a.asset,a.x,a.y,a.height,a.facing<0,alpha);
 if(a===w.player&&a.weapon&&!a.form){const weapon=w.config.weapons[a.weapon];if(weapon.crop){const image=this.assets.get(weapon.asset).image;ctx.save();ctx.translate(a.x+a.facing*65,a.center.y+5);ctx.scale(a.facing,1);ctx.drawImage(image,...weapon.crop,-20,-38,95,95);ctx.restore();}}
 if(a.warning>0){ctx.strokeStyle='#ffbd75';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(a.x,w.ground+2,a.width*.6,18,0,7);ctx.stroke();ctx.fillStyle='#ffe085';ctx.textAlign='center';ctx.font='bold 40px system-ui';ctx.fillText('!',a.x,a.y-a.height-10);}
 if(a.team==='enemy'&&!a.isBoss){ctx.fillStyle='#031921';ctx.fillRect(a.x-45,a.y-a.height-18,90,7);ctx.fillStyle='#91e8c9';ctx.fillRect(a.x-45,a.y-a.height-18,90*a.hp/a.maxHP,7);}
 if(debug){const b=a.box;ctx.strokeStyle=a.team==='player'?'#56ff9b':'#ff8fa6';ctx.lineWidth=2;ctx.strokeRect(b.x,b.y,b.w,b.h);ctx.font='13px monospace';ctx.fillStyle=ctx.strokeStyle;ctx.textAlign='center';ctx.fillText(`${a.id} HP ${a.hp} (${a.x.toFixed(0)},${a.y.toFixed(0)})`,a.x,b.y-4);}}
 for(const p of w.projectiles){ctx.strokeStyle=p.color;ctx.lineWidth=p.radius;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(p.x-p.vx*.018,p.y-p.vy*.018);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(p.x,p.y,4,0,7);ctx.fill();}
 if(debug&&w.attackBox){const b=w.attackBox;ctx.fillStyle='#fff14e44';ctx.fillRect(b.x,b.y,b.w,b.h);ctx.strokeStyle='#fff14e';ctx.strokeRect(b.x,b.y,b.w,b.h);}
 w.fx.draw(ctx);ctx.restore();const boss=w.enemies.find(e=>e.isBoss&&!e.dead);if(boss){ctx.fillStyle='#071e2add';ctx.fillRect(470,95,340,28);ctx.fillStyle='#eea0bb';ctx.fillRect(475,100,330*boss.hp/boss.maxHP,18);ctx.font='bold 17px system-ui';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText('BOSS · '+Math.ceil(boss.hp)+' · PHASE '+(boss.phase+1),640,85);}
 }
}
