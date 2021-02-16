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
  ready=false;
  form: FormGroup;
  formCard: FormGroup;
  placanje=false;
  method:string;
  card=true;
  pouzece=false;
  bank=false;
    constructor(protected cartService: CartService, private userServise:UserService){
      super(cartService);
    }

    ngOnInit() {
      if(localStorage.getItem('userData')){
        this.registered=true;
        let id=JSON.parse(localStorage.getItem('userData'))['id'];
        this.userServise.getUser(id).subscribe((user:UserInfo)=>{
          this.form = new FormGroup({
            firstName: new FormControl(user.name, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            lastName: new FormControl(user.surname, {
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
          firstName: new FormControl(null, {
            updateOn: "blur",
            validators: [Validators.required],
          }),
          lastName: new FormControl(null, {
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
    //to do definisati formu za card
    // this.formCard = new FormGroup({
    //       username: new FormControl(null, {
    //         updateOn: "blur",
    //         validators: [Validators.required],
    //       }),
    //       cardNumber: new FormControl(null, {
    //         updateOn: "blur",
    //         validators: [Validators.required],
    //       }),
    //       MM: new FormControl(null, {
    //         updateOn: "blur",
    //         validators: [Validators.required],
    //       }),
    //       YY: new FormControl(null, {
    //         updateOn: "blur",
    //         validators: [Validators.required],
    //       }),
    //       CVV: new FormControl(null, {
    //         updateOn: "blur",
    //         validators: [Validators.required],
    //       })
    //     });
    }
    onInfoAdd() {
      // if (!this.form.valid) {
      //   return;
      // }
      // let customer=new CustomerInfo(this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.address, this.form.value.city, this.form.value.zipCode, this.form.value.phoneNumber);
      // this.cartService.addCustomer(customer);
      // this.haveCustomer=true;
    }
    confirmOrder(){
      //dodati sve sto se prosledjuje
      this.cartService.comfirmOrder(this.form.value.name);
    }
    // onBackInfo(){
    //   this.haveCustomer=false;
    // }
    // onCardComfirm(){
    //   this.placanje=true;
    //   this.method="2"
    // }
    // onPouzece(){
    //   this.placanje=true;
    //   this.method="1"
    // }
    // onRacunom(){
    //   this.placanje=true;
    //   this.method="3"
    // }
    // onCardClick(){
    //   this.card=true;
    //   this.bank=false;
    //   this.pouzece=false;
    // }
    // onPouzecemClick(){
    //   console.log("pouzece");
    //   this.card=false;
    //   this.bank=false;
    //   this.pouzece=true;
    // }
    // onBankClick(){
    //   console.log("bank");
    //   this.card=false;
    //   this.bank=true;
    //   this.pouzece=false;
    // }
}
