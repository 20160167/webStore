import { Car, BrandSearch, Product, Category } from './../products.model';
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
  myControl = new FormControl();
  myControl1 = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  options1: string[] = ['One', 'Two', 'Three'];
  models: Observable<string[]>;

  //dodati pfiltered products pa da reaguje na promeni u combo
  constructor(
       private productService:ProductsService,
       private cartService:CartService,
       private router: Router
  ) { }

  ngOnInit() {

    if(localStorage.getItem('userData')){
      if(JSON.parse(localStorage.getItem('userData'))['role']==='ROLE_ADMIN'){
        this.admin=true;
      }
    }
      this.load();
      // this.sub1 = this.productService.getBrands()
      //     .subscribe(res => {
      //         this.brands = res;
      //         this.brands.forEach(element => {
      //           this.listItems[this.listItems.length]=element.name
      //         });
      //         this.options=this.listItems;
      //         this.filteredOptions = this.myControl.valueChanges.pipe(
      //           startWith(''),
      //           map(value => this._filter(value))
      //         );
      //     });
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }
  // private _filter1(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   console.log('u filteru1');
  //   return this.options1.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }
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
//   onOptionsSelected(value:string){
//     console.log("the selected value is " + value);
// }
// onChange(text){
//   // let text = $event.target.options[$event.target.options.selectedIndex].text;
//   console.log(text);
//   this.enabled=true;
//   this.myControl1.reset();
//   this.modelItems=[];
//   this.brands.forEach(element => {
//     if(element.name===text){
//     // this.modelItems=element.models;
//     element.models.forEach(model=>{
//       this.modelItems[this.modelItems.length]=model.name;
//     })
//     }
//   });
//   this.loadedProducts=[];
//   this.products.forEach(element=>{
//     //console.log(element.model.name);
//     if(element.model.brand.name==text){
//       //console.log("jeste");
//       this.loadedProducts[this.loadedProducts.length]=element;
//     }
//     this.options1=this.modelItems;
//     this.models = this.myControl1.valueChanges.pipe(
//       startWith(''),
//       map(value => this._filter1(value))
//     );
//   })
//   }
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
