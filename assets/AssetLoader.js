export class AssetLoader {
 constructor(registry) {this.registry=registry;this.cache=new Map();}
 async load(baseURL, timeout=12000) {
  await Promise.all(Object.entries(this.registry.definitions).map(async ([id,definition])=>{
   const url=new URL(definition.src,baseURL).href;
   if(!this.cache.has(url)) this.cache.set(url,new Promise((resolve,reject)=>{
    const image=new Image();const timer=setTimeout(()=>reject(new Error(`Asset timeout: ${id}`)),timeout);
    image.onload=()=>{clearTimeout(timer);image.naturalWidth?resolve(image):reject(new Error(`Empty asset: ${id}`));};
    image.onerror=()=>{clearTimeout(timer);reject(new Error(`Asset load failed: ${id}`));};image.src=url;
   }));
   const image=await this.cache.get(url);const c=definition.crop;
   if(c&&(c.length!==4||c.some(n=>!Number.isFinite(n))||c[0]<0||c[1]<0||c[2]<=0||c[3]<=0||c[0]+c[2]>image.naturalWidth||c[1]+c[3]>image.naturalHeight))throw new Error(`Invalid crop: ${id}`);
   this.registry.images.set(id,image);
  }));
 }
}
