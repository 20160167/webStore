import { Category, Product } from './../products.model';
import { ProductsService } from './../products.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AdminService } from "../../admin/admin.service";

@Component({
  selector: "app-products",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"],
  //moramo ovako da dodamo servis u komponentu
})
export class NewCarComponent implements OnInit{
  nrSelect="";
  brandSelect="";
  isHome=false;
  public categories:Array<Category>;
  private sub;
  private sub1;
   brand_id=null;
   newModel=null;
   brandAdd=false;
   modelAdd=false;
  public listItems: Array<string> = [];
  public enabled=false;
  selectedOption:string;
  
  url="";
  modelId=null;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private productService:ProductsService
  ) {}
  ngOnInit(): void {
    this.sub1 = this.productService.getCategories()
          .subscribe(res => {
              this.categories = res;
              //console.log(this.products[0].url);
          });
  }
  onSubmit(form: NgForm) {
    // console.log(form);
    if (!form.valid) {
      return;
    }
    console.log(this.brand_id);
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

    this.adminService.addPhone(model, price, description,url, ram, memory, screen_size, camera, front_camera, battery, system,this.brand_id).subscribe((product:Product)=>{
      // let link='/products/'+car.id;
      this.router.navigateByUrl("/products");
    });
    form.reset();
  }
  onChange($event){
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    console.log(text);
    this.enabled=true;
    this.categories.forEach(element => {
      if(element.brand===text){
      this.brand_id=element.id;
      }
    });

    }

  onPhoto($event){
    this.url=$event.target.value;
  }

}
