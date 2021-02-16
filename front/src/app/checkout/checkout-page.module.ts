import { NavbarModule } from '../navbar/navbar.module';
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { CheckoutPageComponent} from "./checkout-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{path:'', component: CheckoutPageComponent}]),
        NavbarModule,
        ReactiveFormsModule
    ],
    declarations: [
      CheckoutPageComponent
    ]
})
export class CheckoutPageModule { }
