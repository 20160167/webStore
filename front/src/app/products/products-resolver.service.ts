// import { Injectable } from '@angular/core';
// import { Resolve, Data, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Recipe } from './recipe.model';
// import { DataStorageService } from '../shared/data-storage.service';
// import { RecipeService } from './recipe.service';

// @Injectable({providedIn:'root'})
// export class RecipeResolverService implements Resolve<Recipe[]>{
//     constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}
//     //radi nam kad reloadujemo stranicu, da nam uradi sam fetchda ne bude error
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//         const recipes= this.recipeService.getRecipes();
//         //ako nema onda na fetchuj sa servera
//         if(recipes.length===0){
//         //ovde sam resolve nam subcribuje pa ne trebas
//         return this.dataStorageService.fetchRecipes();
//         }else{
//             return recipes;
//         }
//     }
// }
