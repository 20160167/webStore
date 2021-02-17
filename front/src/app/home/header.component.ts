import { CartService } from './../cart/cart.service';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHome=true;
  constructor(private router:Router, private cartService:CartService) { }

  ngOnInit() {
  }
  onShop(){
    this.router.navigateByUrl("/products");
  }

}
