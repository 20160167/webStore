


export class Order {
  id: number;
  datum: string;
  total: number;
  products:Products[];
}

export class Products {
  id: number;
  model: string;
  price: number;
  description: string;
  url: string;
  ram: string;
  memory: string;
  screen_size: string;
  camera: string;
  front_camera: string;
  battery: string;
  system: string;
  brand_id: number;

}
