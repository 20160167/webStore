
import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';
import { NavbarModule } from "../../navbar/navbar.module";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersListComponent } from "./orders-list-orders/orders-list.component";
import { OrderDetailComponent } from "./order-detail/order-details.component";

@NgModule({
    imports: [
        CommonModule,
        OrdersRoutingModule,
        NavbarModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
      OrdersComponent,
      OrdersListComponent,
      OrderDetailComponent
    ]
})
export class OrderModule { }
