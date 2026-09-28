import {Enemy} from './Enemy.js';
export class Boss extends Enemy {constructor(spec,x,y){super(spec,x,y);this.isBoss=true;this.phase=0;this.rotation=0;this.warning=0;this.aiTimer=2;}}
