import { Order } from './orders.model';
import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfo } from './customerinfo';
import jwt_decode from "jwt-decode";
import { User } from '../auth/user.model';

//moramo ovo da dodamo da bi ubacili shoppingListService u ovaj servis
@Injectable()
export class UserService{
  public user = new BehaviorSubject<UserInfo>(null);
  constructor(private http: HttpClient, private router: Router) { }
  public getUser(id:string){
    let token=JSON.parse(localStorage.getItem('userData'))['_token'];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      //console.log("ovde je");
        return this.http.get<UserInfo>('http://localhost:8000/api/users',{headers:headers}).pipe(
          tap((data:UserInfo) =>{
            //console.log("usao je");
            this.user.next(data);
          })
        );

    }
    public getOrders(){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
        return this.http.get<Order[]>('http://localhost:8000/api/orders',{headers:headers}).pipe(
          map((data:Order[]) =>{
            //console.log(data.json());
            return data;
          })
        );

    }
    public getOrder(id:number){
        let token=JSON.parse(localStorage.getItem('userData'))['_token'];
       const headers = new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       });
       return this.http.get<Order>('http://localhost:8000/api/orders/'+id,{headers:headers});
     }
    public changeData(id:number,name:string, surname:string, address:string, city:string,  phone:string){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.put('http://localhost:8000/api/update-user',{
        id:id, name:name, surname:surname,  address:address, city:city,phone:phone
      },{headers:headers}).subscribe();
    }

}
