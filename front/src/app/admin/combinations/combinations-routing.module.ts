import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCombinationComponent } from './new/new.component';
import { CombinationsListComponent } from './combinations-list/combination-list.component';
import { CombinationsComponent } from './combinations.component';


const routes: Routes = [
  {
    path: '',
    component: CombinationsComponent,
    children: [
      { path: '', component: CombinationsListComponent },
      {
        path: 'new',
        component: NewCombinationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CombinationssRoutingModule {}
