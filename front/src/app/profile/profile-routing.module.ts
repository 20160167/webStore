import { ProfileInfoComponent } from './profil-info/profile-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MyOrdersListComponent } from './profile-orders/profile-list-orders/profilelist.component';
import { MyOrdersComponent } from './profile-orders/profil-order.component';
import { MyOrderDetailComponent } from './profile-orders/profile-order-detail/profile-details.component';
import { ProfilePasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: ProfileInfoComponent },
      {
        path: 'orders',
        component: MyOrdersComponent,
        children: [
          { path: '', component: MyOrdersListComponent },
          {
            path: ':id',
            component: MyOrderDetailComponent
            //resolve: [ProductResolverService]
          }
        ]
      },
      {
        path: 'changepassword',
        component: ProfilePasswordComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
