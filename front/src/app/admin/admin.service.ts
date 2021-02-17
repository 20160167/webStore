import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../profile/orders.model';
import { Category, HelpOrder, Product } from '../products/products.model';

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
        return this.http.get<Order[]>('http://localhost:8000/api/admin/orders',{headers:headers}).pipe(
          map((data:Order[]) =>{
            //console.log(data.json());
            return data;
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
      return this.http.get<HelpOrder>('http://localhost:8000/api/admin/orders/'+id,{headers:headers});
    }
    // public changeOrderStatus(id:number,status:string){
    //   let token=JSON.parse(localStorage.getItem('userData'))['_token'];
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.put('http://localhost:8000/api/orders/'+id,{status:status},{headers:headers}).subscribe();
    // }
    // public getCombinations(){
    //   let token=JSON.parse(localStorage.getItem('userData'))['_token'];
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //     return this.http.get('http://localhost:8000/api/combinations',{headers:headers}).pipe(
    //       map((data:Response) =>{
    //         //console.log(data.json());
    //         return data['hydra:member'];
    //       })
    //     );
    // }
    public getCategories(){
      // let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`
      // });
      return this.http.get<Category[]>('http://localhost:8000/api/categories');
    }
    // public addBrand(name:string){
    //   let token=JSON.parse(localStorage.getItem('userData'))['_token'];
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.post('http://localhost:8000/api/brands',{name:name},{headers:headers});
    // }
    // public addModel(name:string, id:number){
    //   let token=JSON.parse(localStorage.getItem('userData'))['_token'];
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.post('http://localhost:8000/api/models',{name:name, brand:"api/brands/"+id},{headers:headers});
    // }
    // public addCar(modelId:string, bodyType:string, generation:string, equipmentLevel:string,url:string){
    //   let token=JSON.parse(localStorage.getItem('userData'))['_token'];
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.post('http://localhost:8000/api/cars',{model:"api/models/"+modelId, bodyType:bodyType, generation: generation, equipmentLevel:equipmentLevel, url:url},{headers:headers});
    // }
    public addPhone(model:string, price:number, description:string, url:string, ram:string, memory:string, screen_size:string, camera:string, front_camera:string, battery:string, system:string, brand_id:number){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<Product>('http://localhost:8000/api/admin/products',{model:model, price:price, description:description, url:url, ram:ram, memory:memory, screen_size:screen_size, camera:camera, front_camera:front_camera, battery:battery, system:system, brand_id:brand_id},{headers:headers});
    }
    public changePhone(id:number, model:string, price:number, description:string, url:string, ram:string, memory:string, screen_size:string, camera:string, front_camera:string, battery:string, system:string, brand_id:number){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      console.log("brand_id"+brand_id);
      return this.http.put<Product>('http://localhost:8000/api/admin/products/'+id,{model:model, price:price, description:description, url:url, ram:ram, memory:memory, screen_size:screen_size, camera:camera, front_camera:front_camera, battery:battery, system:system, brand_id:brand_id},{headers:headers});
    }
    public deletePhone(id:number){
      let token=JSON.parse(localStorage.getItem('userData'))['_token'];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete<Product>('http://localhost:8000/api/admin/products/'+id,{headers:headers});
    }
}
