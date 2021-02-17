import { Category, Product } from './../products.model';
import { AdminService } from './../../admin/admin.service';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isHome=false;

  private sub;
  private sub2;
  public product:Product;
  public url:string;
  categories:Category[]=[];
  changeActive=false;
  addActive=false;
  admin=false;
  private brand_id;
  choosenComb=null;
  id=null;
  private brand;

  constructor(private route: ActivatedRoute,
              private productService:ProductsService,
              private cartService:CartService,
              private adminService:AdminService,
              private router:Router
  ) {
    }

  ngOnInit() {
    if(localStorage.getItem('userData')){
      if(JSON.parse(localStorage.getItem('userData'))['role']==='admin'){
        this.admin=true;
      }
    }
    //console.log("uproducts");
      this.route.params
          .subscribe(res => {
              this.id=res.id;
              this.getProduct(res.id);
          })
    this.adminService.getCategories().subscribe((categories)=>{
      this.categories=categories;
    })
  }
  getProduct = (id) => {
      this.sub = this.productService.getProduct(id)
          .subscribe(res => {
            console.log(res)
              this.product = res;
              this.url=this.product.url;
              this.brand_id=this.product.brand_id;
              this.productService.getCategories().subscribe((categories:Category[])=>{
                categories.forEach(category => {
                  if(category.id==this.brand_id){
                    this.brand=category.brand;
                  }
                });
              });
            //console.log(this.product.id);
          })
  };
  addToCart = (product) => {
     this.cartService.addToCart(product);
  };

  onSubmitChange(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }
    const model = form.value.model;
    const price = form.value.price;
    const description =form.value.description;
    const url =form.value.url;
    const ram =form.value.ram;
    const memory =form.value.memory;
    const screen_size =form.value.screen_size;
    const camera =form.value.camera;
    const front_camera =form.value.front_camera;
    const battery =form.value.battery;
    const system =form.value.system;

    this.adminService.changePhone(this.product.id, model, price, description,url, ram, memory, screen_size, camera, front_camera, battery, system,this.brand_id).subscribe((product)=>{
      form.reset();
      this.changeActive=false;
      this.product=product;
    });

  }
  onChange($event){
    let text = $event.target.options[$event.target.options.selectedIndex].value;
    console.log(text);
    this.categories.forEach(element => {
      console.log(element)
      if(element.id==text){
      this.brand_id=element.id;
      console.log(this.brand_id)
      }
    });

    }
  changePhone(){
    this.changeActive=true;
  }
  deletePhone(product){
    //pozvati metodu za brisanje u admin servis
    this.adminService.deletePhone(this.product.id).subscribe(()=>{
    this.router.navigateByUrl("/products");
    })
  }
  onPhoto($event){
    this.url=$event.target.value;
  }
}
