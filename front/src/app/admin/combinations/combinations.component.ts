import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './combinations.component.html',
  styleUrls: ['./combinations.component.css'],
  //moramo ovako da dodamo servis u komponentu
})
export class CombinationsComponent {
  public isHome=false;
  // public products:Array<Product>;
  // private sub;
  // constructor(
  //      private productService:ProductsService,
  //      //private cartService:CartService,
  //      private router: Router
  // ) { }

  // ngOnInit() {
  //     this.load();
  // }
  // load = () => {
  //    this.sub = this.productService.getProducts('././assets/mock-data/products.json')
  //         .subscribe(res => {
  //             this.products = res;
  //         })
  // };
  // addToCart = (product) => {
  //     //this.cartService.addToCart({product,quantity:1})
  // };
  // ngOnDestroy() {
  //     this.sub.unsubscribe();
  // }
}
