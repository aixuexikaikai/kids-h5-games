export class AssetRegistry {
 constructor(definitions) {this.definitions=definitions;this.images=new Map();}
 get(id) {const definition=this.definitions[id], image=this.images.get(id);if(!definition||!image)throw new Error(`Asset unavailable: ${id}`);return {image,...definition};}
 size(id) {const a=this.get(id);return a.crop ? {w:a.crop[2],h:a.crop[3]} : {w:a.image.naturalWidth,h:a.image.naturalHeight};}
}
