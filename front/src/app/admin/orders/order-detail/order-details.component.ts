import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../profile/orders.model';

@Component({
  selector: 'app-products',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  //moramo ovako da dodamo servis u komponentu
})
export class OrderDetailComponent implements OnInit{
    nrSelect="";
    private sub;
    public order:Order;
    public status=["naruceno","u izradi", "poslato","isporuceno"];
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
            .subscribe((order:Order) => {
              //console.log(res)
                this.order = order;
                this.nrSelect=order.status;
            })
    };
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    onChange($event){
      let text = $event.target.options[$event.target.options.selectedIndex].text;
      console.log(text);
      this.adminService.changeOrderStatus(this.order.id, text);
      this.nrSelect=text;
      }
  }

