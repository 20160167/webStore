import { AdminService } from './../../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { Order } from '../../../profile/orders.model';
import { UserService } from '../../../profile/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  //moramo ovako da dodamo servis u komponentu
})
export class OrdersListComponent implements OnInit {
  public orders:Array<Order>=[];
  private sub;
  
  total=0;

  //dodati pfiltered products pa da reaguje na promeni u combo
  constructor(
       private AdminService:AdminService,
       private router: Router
  ) { }

  ngOnInit() {
      this.load();
  }
  load = () => {
    this.sub=this.AdminService.getOrders().subscribe((orders:Order[])=>{
        this.orders=orders;
        // this.loadedOrders=orders;
        orders.forEach(order=>{
          this.total=this.total+order.total;
        })
    })

  };
  ngOnDestroy() {
      this.sub.unsubscribe();
  }

}
