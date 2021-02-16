import { Model } from "./../products/products.model";
import { Combination } from "../products/products.model";

export class Paymnet{
  method:string;
}
export class Order {
  id: number;
  status: string;
  date: Date;
  shoppingCart: OrderShoppingCart;
  total: number;
  paymnet:Paymnet;
}
export class OrderShoppingCart {
  id: number;
  active: boolean;
  customer: OrderCustomer;
  products: Products[];
}
export class Products {
  id: number;
  car: OrderCar;
  combination: Combination;
  url: string;
  price: number;
}
export class OrderCar {
  model: Model;
  bodyType: string;
  generation: string;
  equipmentLevel:string;
  url: string;
}
export class OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
}
