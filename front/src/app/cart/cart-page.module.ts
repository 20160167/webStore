import { CartPopupComponent } from './cart-popup/cart-popup.component';
import { NavbarModule } from './../navbar/navbar.module';
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CartPageComponent} from "./cart-page.component";
import { CommonModule } from "@angular/common";
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{path:'', component: CartPageComponent}]),
        NavbarModule
    ],
    declarations: [
        CartPageComponent
    ]
})
export class CartPageModule { }
