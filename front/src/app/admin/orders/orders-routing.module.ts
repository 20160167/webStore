import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './orders-list-orders/orders-list.component';
import { OrderDetailComponent } from './order-detail/order-details.component';


const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      { path: '', component: OrdersListComponent },
      {
        path: ':id',
        component: OrderDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
