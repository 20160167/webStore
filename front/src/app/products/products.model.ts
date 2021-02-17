

export class HelpUser{

  id: number;
  name: string;
  surname: string;
  address:string;
  city:string;
  phone:string;
}
export class HelpOrder{

    id: number;
    datum: string;
    total: number;
    products:Product[];
    user:HelpUser;
}
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

export class Category{
  id:number
  brand:string;
  constructor(id:number, brand:string){
    this.id=id;
    this.brand=brand;
  
  }
}

