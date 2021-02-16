import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../profile/orders.model';

//moramo ovo da dodamo da bi ubacili shoppingListService u ovaj servis
@Injectable()
export class AdminService{
  constructor(private http: HttpClient, private router: Router) { }

    public getOrders(){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
        return this.http.get('http://localhost:8000/api/orders',{headers:headers}).pipe(
          map((data) =>{
            console.log(data);
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
    public changeOrderStatus(id:number,status:string){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.put('http://localhost:8000/api/orders/'+id,{status:status},{headers:headers}).subscribe();
    }
    public getCombinations(){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
        return this.http.get('http://localhost:8000/api/combinations',{headers:headers}).pipe(
          map((data:Response) =>{
            //console.log(data.json());
            return data['hydra:member'];
          })
        );
    }
    public addCombination(color1:string, color2:string, url:string, description:string){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.put('http://localhost:8000/api/combinations',{color1:color1, colo2:color2, url:url, description:description},{headers:headers});
    }
    public addBrand(name:string){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post('http://localhost:8000/api/brands',{name:name},{headers:headers});
    }
    public addModel(name:string, id:number){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post('http://localhost:8000/api/models',{name:name, brand:"api/brands/"+id},{headers:headers});
    }
    public addCar(modelId:string, bodyType:string, generation:string, equipmentLevel:string,url:string){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post('http://localhost:8000/api/cars',{model:"api/models/"+modelId, bodyType:bodyType, generation: generation, equipmentLevel:equipmentLevel, url:url},{headers:headers});
    }
    public addCover(carId:number, combId:string, url:string, price:number){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post('http://localhost:8000/api/covers',{car:"api/cars/"+carId, combination:"api/combinations/"+combId,url:url, price:price},{headers:headers});
    }
    public changeCover(id:number, url:string, price:number){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.put('http://localhost:8000/api/covers/'+id,{url:url, price:price},{headers:headers});
    }
}
