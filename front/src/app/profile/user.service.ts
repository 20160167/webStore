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
        // return this.http.get(dataURL).pipe(
        //     map((res:Response) => res.json())
        //     );
    }
    public getOrders(id:number){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
        return this.http.get('http://localhost:8000/api/orders?shoppingCart.customer='+id,{headers:headers}).pipe(
          map((data:Response) =>{
            //console.log(data.json());
            return data['hydra:member'];
          })
        );
        // return this.http.get(dataURL).pipe(
        //     map((res:Response) => res.json())
        //     );
    }
    public getOrder(id:number){
        let token=JSON.parse(localStorage.getItem('userData'))['_token'];
       const headers = new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       });
       return this.http.get<Order>('http://localhost:8000/api/orders/'+id,{headers:headers});
     }
    public changeData(id:number,firstName:string, lastName:string, email:string, address:string, city:string, zipCode:string, phoneNumber:string){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.put('http://localhost:8000/api/users/'+id,{info:{
        firstName:firstName, lastName:lastName, email:email, address:address, city:city, zipCode:zipCode, phoneNumber:phoneNumber
      }},{headers:headers}).subscribe();
    }
    public changePassword(id:number, oldPassword:string, newPassword:string, newRetypedPassword:string){
      // let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`
      // });
      // return this.http.put('http://localhost:8000/api/users/'+id+'/reset-password',{oldPassword:oldPassword, newPassword:newPassword, newRetypedPassword:newRetypedPassword},{headers:headers}).
      // pipe(catchError(this.handleError), tap((token1)=>{
      //   console.log(token1);
      //   let token2=token1['token'];
      //   let tokenInfo=jwt_decode(token2);
      //   console.log(tokenInfo);
      //   let exp=tokenInfo.exp;
      //   let username=tokenInfo.username;
      //   let role=tokenInfo.roles[0];
      //   const expirationDate = new Date(exp*1000);
      //   const headers = new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token2}`
      //   });
      //     this.http.get("http://localhost:8000/api/users?username="+username,{ headers:headers, observe:'response'},).subscribe((res)=>{
      //       let b=res['body'];
      //       let a=b['hydra:member'];
      //       console.log(a);
      //     //console.log(a[0].id);
      //     let user=new User(username, a[0].id, token2, expirationDate, role);
      //               // //postavlja usera u localStorage, u string formatu treba
      //      localStorage.setItem('userData', JSON.stringify(user));
      //   });
      // }));
    }
    private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'Pogresna sifra';
      return throwError(errorMessage);
  }
}
