let nextId=0;
export class Actor {
 constructor(spec, x, y, team='enemy') {Object.assign(this,structuredClone(spec));this.id=++nextId;this.spec=structuredClone(spec);this.x=x;this.y=y;this.vx=0;this.vy=0;this.team=team;this.maxHP=spec.hp;this.hp=spec.hp;this.facing=team==='player'?1:-1;this.inv=0;this.flash=0;this.cooldown=0;this.dead=false;this.age=0;this.body=spec.body??{x:-.3,y:-.9,w:.6,h:.9};}
 get width(){return this.height*this.aspect;}
 get box(){const b=this.body;return {x:this.x+b.x*this.width,y:this.y+b.y*this.height,w:b.w*this.width,h:b.h*this.height};}
 get center(){const b=this.box;return {x:b.x+b.w/2,y:b.y+b.h/2};}
}
