import {  Covers, Model, Combination } from "../products/products.model";
import { Products } from "../profile/orders.model";


export class Cart {
    id:number;
    products: Products[];
    total:number;
}
export class CartProduct{
  
}
export class CartCover{
  id:number;
  car:CartCar;
  combination:Combination;
  url:string;
  price:number;
}
export class CartCar{
  model:Model;
  bodyType:string;
  generation:string;
  equipmentLevel:string;
  url:string;
}
