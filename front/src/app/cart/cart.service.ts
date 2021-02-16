import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { Cart, CartCover } from './cart';
import { take, tap, delay, switchMap, map } from "rxjs/operators";
import { Covers, Product } from '../products/products.model';
import { CustomerInfo } from '../checkout/customerinfo';
import { HttpClient } from '@angular/common/http';
import { Products } from '../profile/orders.model';

@Injectable()
export class CartService {

    private _cart = new BehaviorSubject<Product[]>([]);
    public toggleCartSubject = new BehaviorSubject(false);
    constructor(private http:HttpClient, private router:Router){}
    get cart(){
      return this._cart.asObservable();
    }
    toggleCart = () => {
      console.log(this.toggleCartSubject.getValue());
      this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
    };
    addToCart (product:Product){
      // console.log(product.id);
      let products=[];
      this._cart.subscribe((p:Product[])=>{
        products=p;
      });
        products.push(product);
        this._cart.next(products);
        console.log(products);
    }
    removeCart (i:number){
      console.log(i);
      let products=[];
      this._cart.subscribe((p:Product[])=>{
        products=p;
      });
        products.splice(i,1);
        this._cart.next(products);
        console.log(products);
    }
    setCart(){
    //   if(!localStorage.getItem('shoppingCart')){
    //   return this.http.post("http://localhost:8000/api/shopping_carts",{}).subscribe(
    //     (shoppingCart)=>{
    //       localStorage.setItem('shoppingCart', shoppingCart.json().id);
    //       console.log(localStorage.getItem('shoppingCart'));
    //     })
    // }
  }
  fetchCart(){
      return this.http.get("http://localhost:8000/api/chart").pipe(
        tap((shoppingCart)=>{
          // this._cart.next(shoppingCart);
          console.log(shoppingCart);
        })
      );
    
  }
  addCustomer(customerInfo:CustomerInfo){
    // return this.http
    //   .put(
    //     "http://localhost:8000/api/shopping_carts/"+localStorage.getItem('shoppingCart').valueOf()+'/add-customer',
    //     {customer:{firstName:customerInfo.firstName, lastName:customerInfo.lastName, email:customerInfo.email, address:customerInfo.address, city:customerInfo.city, zipCode:customerInfo.zipCode, phoneNumber:customerInfo.phoneNumber}}).subscribe();
  }
  comfirmOrder(method:string){
    return this.http
      .post(
        "http://localhost:8000/api/orders",
        {shoppingCart:'api/shopping_carts/'+localStorage.getItem('shoppingCart').valueOf(), paymnet:'api/paymnets/'+method}).subscribe(()=>{
          // localStorage.removeItem('shoppingCart');Kupovina
          this.router.navigateByUrl('/home');
        });
  }

}
