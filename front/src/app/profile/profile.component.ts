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
    if(JSON.parse(localStorage.getItem('userData'))['role']=='admin'){
      this.admin=true;
    }
  }
  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
  

}
