import { CartPopupComponent } from './../cart/cart-popup/cart-popup.component';
import { NavbarComponent } from './navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        NavbarComponent,
        CartPopupComponent
    ],
    imports:[
        CommonModule,
        RouterModule
    ],
    exports:[
        NavbarComponent
    ]

})
export class NavbarModule{}
