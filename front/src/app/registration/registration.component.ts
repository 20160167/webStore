import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
// import { AlertComponent } from '../shared/alert.component';
// import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnDestroy{
  isHome=false;
    error:string=null;
    private closeSub:Subscription;
    constructor(private http: HttpClient,private authService: AuthService, private router:Router, private componenetFactoryResolver: ComponentFactoryResolver) { }
    onSubmit(form: NgForm) {
        // console.log(form);
        return this.http.put('https://cors-anywhere.herokuapp.com/https://apilayer.net/api/check?access_key=c9d0be8c1a215568be435f05b5f66675&email='+form.value.email,{}).subscribe((res)=>{
            if(res['free']==true){
                if (!form.valid || form.value.password!==form.value.password_confirmation) {
                    this.error="incorrect passwords";
                    return;
                 }
                 const name=form.value.name;
                 const surname=form.value.surname;
                 const email= form.value.email;
                 const address= form.value.address;
                 const city=form.value.city;
                 const phone=form.value.phone;
                 const password = form.value.password;
                 const password_confirmation=form.value.password_confirmation;
                 this.authService.register(name, surname, email, address, city ,phone,password,password_confirmation).subscribe(resData => {
                     console.log(resData);
                     this.router.navigate(['/home']);
                 },
                     errorMessage => {
                     this.error=errorMessage;
                     });
                 form.reset();
                    }else{
                        this.error="email address doesnt exist";
                    }
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
