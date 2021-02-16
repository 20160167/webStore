import { StatisticsComponent } from './statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../navbar/navbar.module';



@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'', component: StatisticsComponent}]),
    NavbarModule
  ]
})
export class StatisticsModule {}
