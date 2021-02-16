import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Category, Product } from './products.model';
//moramo ovo da dodamo da bi ubacili shoppingListService u ovaj servis
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
        // return this.http.get(dataURL).pipe(
        //     map((res:Response) => res.json())
        //     );
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
  // recipeChanged=new Subject<Recipe[]>();
  //   private recipes: Recipe[] = [];
  //   constructor(private slService: ShoppingListService){}
  //     getRecipes(){
  //         //da nam vraca kopiju a ne pravi niz
  //         return this.recipes.slice();
  //     }
  //     addIngredientToShoppingList(ingredients: Ingredient[]){
  //       this.slService.addIngredients(ingredients);
  //     }
  //     getRecipe(index:number){
  //       return this.recipes[index];
  //     }
  //     addRecipe(recipe:Recipe){
  //       this.recipes.push(recipe);
  //       this.recipeChanged.next(this.recipes.slice());
  //     }
  //     updateRecipe(index:number, newRecipe:Recipe){
  //       this.recipes[index]=newRecipe;
  //       this.recipeChanged.next(this.recipes.slice());
  //     }
  //     deleteRecipe(index:number){
  //       this.recipes.splice(index,1);
  //       this.recipeChanged.next(this.recipes.slice());
  //     }
  //     setRecipes(recipes:Recipe[]){
  //       this.recipes=recipes;
  //       this.recipeChanged.next(this.recipes.slice());
  //     }
}
