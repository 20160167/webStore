import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Category, Product } from './products.model';
@Injectable()
export class ProductsService{
  constructor(public http: HttpClient) { }

    public getProducts(){
      console.log("ovde je");
        return this.http.get<Product[]>('http://localhost:8000/api/products').pipe(
          map((data:Product[]) =>{
            console.log(data);
            return data;
          })
        );

    }
    public getProduct(id:number){
        return this.http.get<Product>('http://localhost:8000/api/products/'+id).pipe(
          map((data:Product) =>{
            //console.log(data.json());
            return data;
          })
        );
        // return this.http.get(dataURL).pipe(
        //     map((res:Response) => res.json())
        //     );
    }
    public getCategories(){
      return this.http.get<Category[]>('http://localhost:8000/api/categories').pipe(
          map((data:Category[]) =>{
            //console.log("usao je");
            return data;
          })
        );
    }
  
}
