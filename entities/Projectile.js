export class Projectile {constructor(data){Object.assign(this,{age:0,life:2,radius:9,dead:false,gravity:0,...data});this.previous={x:this.x,y:this.y};}}
