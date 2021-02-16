import { Model, ModelSearch, Car } from './../products.model';
import { ProductsService } from './../products.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AdminService } from "../../admin/admin.service";
import { BrandSearch } from '../products.model';

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
  public brands:Array<BrandSearch>;
  private sub;
  private sub1;
   newBrand=null;
   newModel=null;
   brandAdd=false;
   modelAdd=false;
  public listItems: Array<string> = [];
  public enabled=false;
  selectedOption:string;
  modelItems:Array<ModelSearch>=[];
  url="";
  modelId=null;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private productService:ProductsService
  ) {}
  ngOnInit(): void {
    // this.sub1 = this.productService.getBrands()
    //       .subscribe(res => {
    //           this.brands = res;
    //           //console.log(this.products[0].url);
    //       });
  }
  onSubmit(form: NgForm) {
    // console.log(form);
    if (!form.valid) {
      return;
    }
    const bodyType = form.value.bodyType;
    const generation = form.value.generation;
    const equipmentLevel =form.value.equipmentLevel;
    const url =form.value.url;
    this.adminService.addCar(this.modelId, bodyType, generation, equipmentLevel,url).subscribe((car:Car)=>{
      let link='/products/'+car.id;
      this.router.navigateByUrl(link);
    });
    form.reset();
  }
  onChange($event){
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    console.log(text);
    this.enabled=true;
    this.brands.forEach(element => {
      if(element.name===text){
      this.modelItems=element.models;
      this.newBrand=element.id;
      }
    });
        this.nrSelect="";
        this.modelId=null;
    }
    onChangeModel($event){
      let modelId = $event.target.options[$event.target.options.selectedIndex].value;
      this.modelId=modelId;
      }
      onAddBrand(){
        this.brandAdd=true;
        this.modelItems=[];
        this.nrSelect="";
      }
      onAddModel(){
        this.modelAdd=true;
      }
      onSubmitBrand(form: NgForm) {
        // console.log(form);
        if (!form.valid) {
            return;
        }
        const name = form.value.brand;
        this.adminService.addBrand(name).subscribe((resData:BrandSearch) => {
            console.log(resData);
            this.newBrand=resData.id;
            this.brands[this.brands.length]=resData;
            //this.router.navigate(['/home']);
            this.brandSelect=resData.id.toString();
        });
        form.reset();
        this.brandAdd=false;
    }
    onSubmitModel(form: NgForm) {
      // console.log(form);
      if (!form.valid) {
          return;
      }
      const name = form.value.model;
      this.adminService.addModel(name, this.newBrand).subscribe((resData:ModelSearch) => {
          console.log(resData);
          this.newModel=resData.id;
          this.modelItems[this.modelItems.length]=resData;
          //this.router.navigate(['/home']);
          this.nrSelect=resData.id.toString();
      });
      form.reset();
      this.modelAdd=false;
      this.enabled=true;
  }
  onPhoto($event){
    this.url=$event.target.value;
  }

}
