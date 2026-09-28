import {transitions} from './GameState.js';
export class SceneManager {
 constructor(events) {this.events=events;this.state='BOOT';}
 go(next) { if(next===this.state)return false; if(!transitions[this.state]?.includes(next))throw new Error(`Invalid transition ${this.state} → ${next}`); const previous=this.state;this.state=next;this.events.emit('state',{previous,next});return true; }
}
