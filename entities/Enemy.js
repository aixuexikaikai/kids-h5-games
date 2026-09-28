import {Actor} from './Actor.js';
export class Enemy extends Actor {constructor(spec,x,y){super(spec,x,y);this.home=x;this.patrolDirection=-1;this.aiState='patrol';this.aiTimer=1.5;}}
