import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    styleUrls: ["profile.component.scss"],
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit{
  isHome=false;
  admin=false;
  constructor(private authService:AuthService, private router:Router){}
  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('userData'))['role']=='ROLE_ADMIN'){
      this.admin=true;
    }
  }
  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
  // haveCustomer=false;
  // form: FormGroup;
  //   constructor(){
  //   }

  //   ngOnInit() {
  //     if(localStorage.getItem('customer')){
  //       this.haveCustomer=true;
  //     }
  //     this.form = new FormGroup({
  //       firstName: new FormControl(null, {
  //         updateOn: "blur",
  //         validators: [Validators.required],
  //       }),
  //       lastName: new FormControl(null, {
  //         updateOn: "blur",
  //         validators: [Validators.required],
  //       }),
  //       email: new FormControl(null, {
  //         updateOn: "blur",
  //         validators: [Validators.required, Validators.email],
  //       }),
  //       address: new FormControl(null, {
  //         updateOn: "blur",
  //         validators: [Validators.required],
  //       }),
  //       city: new FormControl(null, {
  //         updateOn: "blur",
  //         validators: [Validators.required],
  //       }),
  //       zipCode: new FormControl(null, {
  //         updateOn: "blur",
  //         validators: [Validators.required],
  //       }),
  //       phoneNumber: new FormControl(null, {
  //         updateOn: "blur",
  //         validators: [Validators.required],
  //       }),
  //     });
  //   }

}
