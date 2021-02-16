import { ProductsListComponent } from './products-list/products-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products.component';
import { AuthGuard } from '../auth/auth-guard';
import { NewCarComponent } from './new-product/new.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductsListComponent },
      {
        path: 'new',
      component: NewCarComponent,
      },
      {
        path: ':id',
        component: ProductDetailComponent
        //resolve: [ProductResolverService]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
