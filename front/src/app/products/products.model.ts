
// export class Recipe{
//     public name:string;
//     public description:string;
//     public imagePath:string;
//     public ingredients:Ingredient[];
//     constructor(name:string, description:string, imagePath:string, ingredients: Ingredient[]){
//         this.name=name;
//         this.description=description;
//         this.imagePath=imagePath;
//         this.ingredients=ingredients;
//     }
// }
export class Product{
  id:number;
  model:string;
  price:number;
  description:string;
  url:string;
  ram:string;
  memory:string
  screen_size:string
  camera:string
  front_camera:string
  battery:string
  system:string
  brand_id:number
  // constructor(color1:string, color2:string, url:string, descrription:string){
  //   this.color1=color1;
  //   this.color2=color2;
  //   this.url=url;
  //   this.description=descrription;
  // }
  constructor(id:number,
    model:string,
    price:number,
    description:string,
    url:string,
    ram:string,
    memory:string,
    screen_size:string,
    camera:string,
    front_camera:string,
    battery:string,
    system:string, brand_id:number){
      this.id=id;
      this.model=model;
      this.price=price;
      this.description=description;
      this.url=url;
      this.ram=ram;
      this.memory=memory;
      this.screen_size=screen_size;
      this.camera=camera;
      this.front_camera=front_camera;
      this.battery=battery;
      this.system=system;
      this.brand_id=brand_id;
    }
}
export class Brand{
  name:string;
  constructor(name:string){
    this.name=name;
  
  }
}
export class Category{
  id:number
  name:string;
  constructor(id:number, name:string){
    this.id=id;
    this.name=name;
  
  }
}
export class Model{
  name:string;
  brand:Brand;
  constructor(name:string, brand:Brand){
    this.name=name;
    this.brand=brand;
  }
}
export class Combination{
  color1:string;
  color2:string;
  url:string;
  description:string;
  constructor(color1:string, color2:string, url:string, descrription:string){
    this.color1=color1;
    this.color2=color2;
    this.url=url;
    this.description=descrription;
  }
}
export class Covers{
  id:number;
  combination:Combination;
  url:string;
  price:number;
  constructor(id:number, combination:Combination, url:string, price:number){
    this.id=id;
    this.combination=combination;
    this.url=url;
    this.price=price;
}
}


export class Car {
  id:number
  model:Model;
  bodyType:string;
  generation:string;
  equipmentLevel:string;
  url:string;
  covers:Covers[];
  constructor(id:number, model:Model, bodyType:string,generation:string, equipmentLevel:string, url:string, covers:Covers[]){
    this.id=id;
    this.model=model;
    this.bodyType=bodyType;
    this.generation=generation;
    this.equipmentLevel=equipmentLevel;
    this.url=url;
    this.covers=covers;
  }
}
export class ModelSearch{
  id:number;
  name:string;
}
export class BrandSearch{
  id:number;
  name:string;
  models:ModelSearch[];
}
export class CombinationSearch{
  id:number;
  color1:string;
  color2:string;
  url:string;
  description:string;
  constructor(id:number,color1:string, color2:string, url:string, descrription:string){
    this.id=id;
    this.color1=color1;
    this.color2=color2;
    this.url=url;
    this.description=descrription;
  }
}
