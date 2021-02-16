import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import { AlertComponent } from '../shared/alert.component';
// import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isHome=false;
    error:string=null;
    private closeSub:Subscription;
    constructor(private authService: AuthService, private router:Router, private componenetFactoryResolver: ComponentFactoryResolver) { }
    onSubmit(form: NgForm) {
        console.log(form);
        if (!form.valid) {
            return;
        }
        const email = form.value.username;
        const password = form.value.password;
        this.authService.login(email, password).subscribe(resData => {
            console.log(resData);
            this.router.navigate(['/home']);
            form.reset();

        },
            errorMessage => {
            this.error=errorMessage;
        form.reset();

            });
    }
    onHandleError(){
        this.error=null;
    }
    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}
