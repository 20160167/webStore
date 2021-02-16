import { UserService } from './../user.service';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserInfo } from '../customerinfo';
// import { AlertComponent } from '../shared/alert.component';
// import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'app-profile-info',
    styleUrls: ["profile-info.component.css"],
    templateUrl: './profile-info.component.html'
})
export class ProfileInfoComponent{
  isHome=false;
  userInfo:UserInfo;
  form: FormGroup;
  change=false;
  ready=false;
    // error:string=null;
    private closeSub:Subscription;
    constructor(private authService: AuthService, private router:Router, private userService:UserService) { }
    // onSubmit(form: NgForm) {
    //     // console.log(form);
    //     if (!form.valid || form.value.password!==form.value.retypedPassword) {
    //        this.error="sifre moraju biti iste";
    //        return;
    //     }
    //     const firstName=form.value.firstName;
    //     const lastName=form.value.lastName;
    //     const email= form.value.email;
    //     const address= form.value.address;
    //     const city=form.value.city;
    //     const zipCode=form.value.zipCode;
    //     const phoneNumber=form.value.phoneNumber;
    //     const username = form.value.username;
    //     const password = form.value.password;
    //     const retypedPassword=form.value.retypedPassword;
    //     this.authService.register(firstName, lastName, email, address, city, zipCode,phoneNumber, username,password,retypedPassword).subscribe(resData => {
    //         console.log(resData);
    //         this.router.navigate(['/home']);
    //     },
    //         errorMessage => {
    //         this.error=errorMessage;
    //         });
    //     form.reset();
    // }
    // onHandleError(){
    //     this.error=null;
    // }
    // ngOnDestroy(){
    //     if(this.closeSub){
    //         this.closeSub.unsubscribe();
    //     }
    // }
    ngOnInit() {
      let id=JSON.parse(localStorage.getItem('userData'))['id'];
        this.closeSub = this.userService
          .getUser(id)
          .subscribe(
            (userInfo:UserInfo) => {
              this.userInfo = userInfo;
              //ovde treba a ne van jer ako inicijalizujemo van onda mozda jos nije doslo
              this.form = new FormGroup({
                firstName: new FormControl(this.userInfo.info.firstName, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                lastName: new FormControl(this.userInfo.info.lastName, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                email: new FormControl(this.userInfo.info.email, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                address: new FormControl(this.userInfo.info.address, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                city: new FormControl(this.userInfo.info.city, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                zipCode: new FormControl(this.userInfo.info.zipCode, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                phoneNumber: new FormControl(this.userInfo.info.phoneNumber, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
              });
              this.form.disable();
              this.ready=true;
            });
            }
    saveData() {
      if (!this.form.valid) {
        return;
      }
      console.log("ovde je");
        this.userService
          .changeData(
            JSON.parse(localStorage.getItem('userData'))['id'],
            this.form.value.firstName,
            this.form.value.lastName,
            this.form.value.email,
            this.form.value.address,
            this.form.value.city,
            this.form.value.zipCode,
            this.form.value.phoneNumber,
          );
          this.change=false;
          this.form.disable();
    }
    changeData(){
      this.change=true;
      this.form.enable();
    }
    ngOnDestroy() {
      if (this.closeSub) {
        this.closeSub.unsubscribe();
      }
    }

}
