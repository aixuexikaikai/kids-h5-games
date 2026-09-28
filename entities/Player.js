import {Actor} from './Actor.js';
export class Player extends Actor {
 constructor(spec,x,y,weapon=null){super(spec,x,y,'player');this.weapon=weapon;this.form=null;this.formTime=0;this.transformFX=0;this.skillCooldown=0;}
}
