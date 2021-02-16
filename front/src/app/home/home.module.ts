import { NavbarModule } from './../navbar/navbar.module';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
  HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'', component: HeaderComponent}],),
    NavbarModule
  ]
})
export class HomeModule {}
