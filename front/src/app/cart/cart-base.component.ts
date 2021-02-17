import { CartService } from "./cart.service";
import {  Product } from "../products/products.model";
import { Products } from "../profile/orders.model";
export class CartBaseComponent{
    public products:Product[];
    public total:number;
    constructor(protected cartService: CartService) {
        this.loadCart();
    }
    loadCart = () => {
        this.cartService.fetchCart();
        this.cartService.cart
            .subscribe(res => {
                this.products = res;
                let total = 0;
                for(let product of this.products) {
                    total += product.price;
                }
                this.total = total;
            })
    };
    removeFromCart(i:number){
        this.cartService.removeCart(i);
    };
}
