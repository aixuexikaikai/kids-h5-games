export class EffectsSystem {
 constructor(){this.items=[];this.shake=0;}
 emit(type,x,y,text=''){const colors={hit:'#fff1a0',coin:'#ffdc55',dust:'#c5e4e7',transform:'#80ffee',explosion:'#ffbd60',slash:'#bafaff',warning:'#ffdd82'};
 this.items.push({type,x,y,text,life:type==='transform'?.7:type==='warning'?1:.55,max:type==='transform'?.7:type==='warning'?1:.55,color:colors[type]??'#fff'});
 if(['hit','explosion'].includes(type))this.shake=Math.min(5,this.shake+3);if(this.items.length>100)this.items.shift();}
 update(dt){for(const f of this.items)f.life-=dt;this.items=this.items.filter(f=>f.life>0);this.shake=Math.max(0,this.shake-dt*25);}
 draw(ctx){for(const f of this.items){const k=1-f.life/f.max;ctx.save();ctx.globalAlpha=1-k;ctx.strokeStyle=ctx.fillStyle=f.color;ctx.lineWidth=4;
 if(f.text){ctx.font='bold 28px system-ui';ctx.textAlign='center';ctx.fillText(f.text,f.x,f.y-k*45);}
 if(f.type==='slash'){ctx.beginPath();ctx.arc(f.x,f.y,25+k*50,-1.2,1.2);ctx.stroke();}
 else{const n=f.type==='transform'?16:8;for(let i=0;i<n;i++){const a=i*Math.PI*2/n;ctx.beginPath();ctx.arc(f.x+Math.cos(a)*k*85,f.y+Math.sin(a)*k*65,Math.max(1,5*(1-k)),0,Math.PI*2);ctx.fill();}
 if(['transform','explosion'].includes(f.type)){ctx.beginPath();ctx.arc(f.x,f.y,20+k*120,0,7);ctx.stroke();}}
 ctx.restore();}}
}
