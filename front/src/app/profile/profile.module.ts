import { MyOrderDetailComponent } from './profile-orders/profile-order-detail/profile-details.component';
import { MyOrdersListComponent } from './profile-orders/profile-list-orders/profilelist.component';
import { MyOrdersComponent } from './profile-orders/profil-order.component';
import { ProfilePasswordComponent } from './reset-password/reset-password.component';
import { ProfileInfoComponent } from './profil-info/profile-info.component';
import { NavbarModule } from '../navbar/navbar.module';
import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        NavbarModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
      ProfileComponent,
      ProfileInfoComponent,
      ProfilePasswordComponent,
      MyOrdersComponent,
      MyOrdersListComponent,
      MyOrderDetailComponent
    ]
})
export class ProfileModule { }
