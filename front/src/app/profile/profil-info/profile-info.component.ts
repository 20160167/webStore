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
    private closeSub:Subscription;
    constructor(private authService: AuthService, private router:Router, private userService:UserService) { }

    ngOnInit() {
      let id=JSON.parse(localStorage.getItem('userData'))['id'];
        this.closeSub = this.userService
          .getUser(id)
          .subscribe(
            (userInfo:UserInfo) => {
              this.userInfo = userInfo;
              //ovde treba a ne van jer ako inicijalizujemo van onda mozda jos nije doslo
              this.form = new FormGroup({
                name: new FormControl(this.userInfo.name, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                surname: new FormControl(this.userInfo.surname, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),

                address: new FormControl(this.userInfo.address, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                city: new FormControl(this.userInfo.city, {
                  updateOn: "blur",
                  validators: [Validators.required],
                }),
                phone: new FormControl(this.userInfo.phone, {
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
            this.userInfo.id,
            this.form.value.name,
            this.form.value.surname,
            this.form.value.address,
            this.form.value.city,
            this.form.value.phone,
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
