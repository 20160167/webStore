import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, Products } from '../../../profile/orders.model';
import { HelpOrder } from 'src/app/products/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  //moramo ovako da dodamo servis u komponentu
})

export class OrderDetailComponent implements OnInit{
    private sub;
    public order:HelpOrder;
    constructor(private route: ActivatedRoute,
                private adminService:AdminService) {}

    ngOnInit() {
      //console.log("uproducts");
        this.route.params
            .subscribe(res => {
                this.getProduct(res.id);
            })
    }
    getProduct = (id) => {
        this.sub = this.adminService.getOrder(id)
            .subscribe((order:HelpOrder) => {
              console.log(order)
                this.order = order;
                // this.nrSelect=order.status;
            })
    };
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    // onChange($event){
    //   let text = $event.target.options[$event.target.options.selectedIndex].text;
    //   console.log(text);
    //   this.adminService.changeOrderStatus(this.order.id, text);
    //   this.nrSelect=text;
    //   }
  }

