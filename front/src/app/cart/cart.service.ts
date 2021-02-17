import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { take, tap, delay, switchMap, map } from "rxjs/operators";
import { Product } from '../products/products.model';
import { CustomerInfo } from '../checkout/customerinfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      this.fetchCart();
      let products=[];
      this._cart.subscribe((p:Product[])=>{
        products=p;
      });
        products.push(product);
        this._cart.next(products);
        console.log(products);
        localStorage.setItem('cart', JSON.stringify(products));
    }
    removeCart (i:number){
      console.log(i);
      this.fetchCart();
      let products=[];
      this._cart.subscribe((p:Product[])=>{
        products=p;
      });
        products.splice(i,1);
        this._cart.next(products);
        console.log(products);
        localStorage.setItem('cart', JSON.stringify(products));
    }

  fetchCart(){
 
      let products: Product[];
      if(JSON.parse(localStorage.getItem('cart'))){
        products= JSON.parse(localStorage.getItem('cart'));
        console.log(JSON.parse(localStorage.getItem('cart')))
      }else{
        products=[];
      }
      this._cart.next(products);
  }

  
  comfirmOrder(name:string, surname:string, address:string, city:string, phone:string, datum:Date, total:number, chart:number[]){
    let date1 = new Date();
    let mesec=Number(date1.getUTCMonth()) + 1;
    let date = date1.getUTCFullYear()+ '-' +mesec+ '-' +date1.getUTCDate();
    console.log(date);
    if(localStorage.getItem('userData')){
    let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      
    return this.http
      .post(
        "http://localhost:8000/api/check-out",
        {name:name, surname:surname, address:address, city:city, phone:phone, datum:date, total:total, chart:chart},{headers:headers}).subscribe(()=>{
          // localStorage.removeItem('shoppingCart');Kupovina
          this.router.navigateByUrl('/home');
          localStorage.removeItem('cart');
        });
  }else{
      return this.http
      .post(
        "http://localhost:8000/api/check-out",
        {name:name, surname:surname, address:address, city:city, phone:phone, datum:date, total:total, chart:chart}).subscribe(()=>{
          // localStorage.removeItem('shoppingCart');Kupovina
          console.log("dosao dovde");
          this.router.navigateByUrl('/home');
          localStorage.removeItem('cart');
        });

  }

}
promeniValutu(valuta:string, total:number){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': `*`
  });
 return this.http.get("https://cors-anywhere.herokuapp.com/https://api.kursna-lista.info/0e0156083e1ccc17dc40319ca542628a/konvertor/eur/"+valuta+"/"+total,{headers:headers});
}

}
