import { CombinationSearch, Product } from './../products.model';
import { AdminService } from './../../admin/admin.service';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  Car, Covers, Combination } from '../products.model';
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isHome=false;
  // @Input()recipe:Recipe;
  //ne treba nam vise jer koristimo rute
  // recipe:Recipe;
  // id: number;

  //constructor(private recipeService: RecipeService, private route:ActivatedRoute, private router:Router) { }

  // ngOnInit(): void {
  //   // const id=this.route.snapshot.params['id'];
  //   /ornji radi samo jednom..subscribe radi u svakom trenutku
  //   this.route.params.subscribe(
  //     (pa/grams:Params)=>{
  //       this.id=+params['id'];
  //       this.recipe=this.recipeService.getRecipe(this.id);
  //     }
  //   )
  // }
  // onAddToShoppigList(){
  //   this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  // }
  // editRecipe(){
  //   this.router.navigate(['edit'],{relativeTo:this.route});
  //   //alternativni metod
  //   // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  // }
  // onDelete(){
  //   this.recipeService.deleteRecipe(this.id);
  //   this.router.navigate(['/recipes']);
  // }
  private sub;
  private sub2;
  public product:Product;
  public cover:Covers;
  public url:string;
  changeActive=false;
  addActive=false;
  admin=false;
  choosenComb=null;
  id=null;
  public combinations:Array<CombinationSearch>;
  constructor(private route: ActivatedRoute,
              private productService:ProductsService,
              private cartService:CartService,
              private adminService:AdminService
  ) {this.cover=null;
    }

  ngOnInit() {
    if(localStorage.getItem('userData')){
      if(JSON.parse(localStorage.getItem('userData'))['role']==='ROLE_ADMIN'){
        this.admin=true;
      }
    }
    //console.log("uproducts");
      this.route.params
          .subscribe(res => {
              this.id=res.id;
              this.getProduct(res.id);
          })
      
  }
  getProduct = (id) => {
      this.sub = this.productService.getProduct(id)
          .subscribe(res => {
            console.log(res)
              this.product = res;
              // this.url=this.product.url;
            //console.log(this.product.id);
          })
  };
  addToCart = (product) => {
     this.cartService.addToCart(product);
  };
  // changeCover(i:number){
  //   this.url=this.product.covers[i].url;
  //   this.cover=this.product.covers[i];
  // }
  ngOnDestroy() {
  }
  // addCover(){
  //   this.addActive=true;
  // }
  // onChange($event){
  //   this.choosenComb= $event.target.options[$event.target.options.selectedIndex].value;
  // }
  onSubmitCover(form: NgForm) {
    // // console.log(form);
    // if (!form.valid) {
    //   return;
    // }
    // const url1 = form.value.url;
    // const price =parseFloat(form.value.price);
    // this.adminService.addCover(this.id, this.choosenComb, url1, price).subscribe();
    // form.reset();
    // this.addActive=false;
    // //ako ovo ne radi napraviti da bude subject
    // this.combinations.forEach((element)=>{
    //   if(element.id===parseInt(this.choosenComb)){
    //     console.log("uslo");
    //     this.product.covers[this.product.covers.length]=new Covers(-1, element, url1, price);
    //   }
    // })
  }
  onSubmitChange(form: NgForm) {
    // console.log(form);
    // if (!form.valid) {
    //   return;
    // }
    // const url1 = form.value.url;
    // const price =parseFloat(form.value.price);

    // this.adminService.changeCover(this.cover.id, url1, price).subscribe();
    // form.reset();
    // this.changeActive=false;
    // this.url=url1;
    // this.product.covers.forEach(cover=>{
    //   if(cover===this.cover){
    //     cover.price=price;
    //     cover.url=url1;
    //   }
    // })
  }
  onChangeCover(){
    this.changeActive=true;
  }
  onPhoto($event){
    this.url=$event.target.value;
  }
}
