import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth-guard";

const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((mod) => mod.HomeModule),
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then((mod) => mod.ProductsModule),
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./cart/cart-page.module").then((mod) => mod.CartPageModule),
  },
  {
    path: "checkout",
    loadChildren: () =>
      import("./checkout/checkout-page.module").then(
        (mod) => mod.CheckoutPageModule
      ),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((mod) => mod.AuthModule),
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./registration/registration.module").then((mod) => mod.RegistrationModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((mod) => mod.ProfileModule),
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./admin/orders/orders.module").then((mod) => mod.OrderModule),
  },
{
  path: "statistics",
  loadChildren: () =>
    import("./admin/statistics/statistics.module").then((mod) => mod.StatisticsModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
