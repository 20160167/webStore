import {  Product, Category } from './../products.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '.././products.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  //moramo ovako da dodamo servis u komponentu
})
export class ProductsListComponent implements OnInit {
  nrSelect="";
  isHome=false;
  public products:Array<Product>;
  public loadedProducts:Array<Product>;
  public categories:Array<Category>;
  private sub;
  private sub1;
  public listItems: Array<string> = [];
  public enabled=false;
  selectedOption:string;
  modelItems: Array<string>=[];
  admin=false;


  //dodati pfiltered products pa da reaguje na promeni u combo
  constructor(
       private productService:ProductsService,
       private cartService:CartService,
       private router: Router
  ) { }

  ngOnInit() {

    if(localStorage.getItem('userData')){
      if(JSON.parse(localStorage.getItem('userData'))['role']==='admin'){
        this.admin=true;
      }
    }
      this.load();

  }

  load = () => {
     this.sub = this.productService.getProducts()
          .subscribe(res => {
              this.products = res;
              this.loadedProducts=this.products;
          })
      this.sub1= this.productService.getCategories()
      .subscribe(res => {
          this.categories = res;
          console.log(this.categories);
      })
  };
  ngOnDestroy() {
      this.sub.unsubscribe();
      this.sub1.unsubscribe();
  }

  onChangeModel(id){
    console.log(id);
    //this.enabled=true;
    this.loadedProducts=[];
    this.products.forEach(element=>{
      //console.log(element.model.name);
      if(element.brand_id==id){
        //console.log("jeste");
        this.loadedProducts[this.loadedProducts.length]=element;
      }
    })
    }

}
