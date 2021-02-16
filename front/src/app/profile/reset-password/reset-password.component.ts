import { UserService } from './../user.service';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
// import { AlertComponent } from '../shared/alert.component';
// import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'reset-password-registration',
    templateUrl: './reset-password.component.html'
})
export class ProfilePasswordComponent{
  isHome=false;
    error:string=null;
    private closeSub:Subscription;
    constructor(private userService: UserService, private router:Router) { }
    onSubmit(form: NgForm) {
    //     // console.log(form);
    //     if (!form.valid || form.value.password!==form.value.retypedPassword) {
    //        this.error="sifre moraju biti iste";
    //        return;
    //     }
    //     const oldPassword = form.value.oldPassword;
    //     const newPassword = form.value.newPassword;
    //     const newRetypedPassword=form.value.newRetypedPassword;
    //     this.userService.changePassword(JSON.parse(localStorage.getItem('userData'))['id'], oldPassword,newPassword, newRetypedPassword).subscribe(resData => {
    //       console.log(resData);
    //       form.reset();

    //     },
    //       errorMessage => {
    //       this.error=errorMessage;
    //       form.reset();
    //       });
    }
}
