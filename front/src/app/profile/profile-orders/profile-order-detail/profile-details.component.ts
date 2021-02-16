import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../orders.model';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-products',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
  //moramo ovako da dodamo servis u komponentu
})
export class MyOrderDetailComponent implements OnInit{
    private sub;
    public order:Order;
    constructor(private route: ActivatedRoute,
                private userService:UserService) {}

    ngOnInit() {
      //console.log("uproducts");
        this.route.params
            .subscribe(res => {
                this.getProduct(res.id);
            })
    }
    getProduct = (id) => {
        this.sub = this.userService.getOrder(id)
            .subscribe((order:Order) => {
              //console.log(res)
                this.order = order;
            })
    };
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
  }

