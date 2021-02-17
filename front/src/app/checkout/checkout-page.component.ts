import { UserInfo } from './../profile/customerinfo';
import { UserService } from './../profile/user.service';
import { CartBaseComponent } from './../cart/cart-base.component';
/**
 * Created by andrew.yang on 7/31/2017.
 */
import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerInfo } from './customerinfo';

@Component({
    selector: 'app-checkout-page',
    styleUrls: ["checkout-page.component.css"],
    templateUrl: 'checkout-page.component.html'
})
export class CheckoutPageComponent extends CartBaseComponent{
  isHome=false;
  haveCustomer=false;
  registered=false;
  selected=false;
  private newtotal:number;
  ready=false;
  form: FormGroup;
  formCard: FormGroup;

    constructor(protected cartService: CartService, private userServise:UserService){
      super(cartService);
    }

    ngOnInit() {
      if(localStorage.getItem('userData')){
        this.registered=true;
        let id=JSON.parse(localStorage.getItem('userData'))['id'];
        this.userServise.getUser(id).subscribe((user:UserInfo)=>{
          this.form = new FormGroup({
            name: new FormControl(user.name, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            surname: new FormControl(user.surname, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            address: new FormControl(user.address, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            city: new FormControl(user.city, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            phone: new FormControl(user.phone, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
          });
          this.form.disable();
          this.ready=true;
        })

      }else{
        this.form = new FormGroup({
          name: new FormControl(null, {
            updateOn: "blur",
            validators: [Validators.required],
          }),
          surname: new FormControl(null, {
            updateOn: "blur",
            validators: [Validators.required],
          }),
          address: new FormControl(null, {
            updateOn: "blur",
            validators: [Validators.required],
          }),
          city: new FormControl(null, {
            updateOn: "blur",
            validators: [Validators.required],
          }),
          phone: new FormControl(null, {
            updateOn: "blur",
            validators: [Validators.required],
          }),
        });
        this.ready=true;
    }

    }

    confirmOrder(){
      //dodati sve sto se prosledjuje
      let niz:number[]=[];
      this.products.forEach(product => {
        niz.push(product.id);
      });
      this.cartService.comfirmOrder(this.form.value.name,this.form.value.surname, this.form.value.address, this.form.value.city, this.form.value.phone, new Date(), this.total ,niz);
    }

    onChange($event){
      let text = $event.target.options[$event.target.options.selectedIndex].value;
      console.log(text);
      // this.selected=true;
      this.cartService.promeniValutu(text, this.total).subscribe((price)=>{
        console.log(price);
      this.selected=true;
        this.newtotal=price['result']['value'];
      })
      
    }
}
