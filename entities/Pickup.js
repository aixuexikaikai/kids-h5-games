let nextId=0;
export class CoinPickup {constructor(x,y,value,index,count){this.id=++nextId;this.x=x;this.y=y;this.value=value;this.vx=(index-(count-1)/2)*45;this.vy=-220-(index%3)*35;this.age=0;this.bounces=0;this.rest=false;this.picked=false;}}
