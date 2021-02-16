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
  public loadedOrders: Array<Order> = [];
  public enabled=false;
  selectedOption:string;
  modelItems=[];
  public status=["naruceno","u izradi", "poslato","isporuceno"];
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
        this.loadedOrders=orders;
        orders.forEach(order=>{
          this.total=this.total+order.total;
        })
    })

  };
  ngOnDestroy() {
      this.sub.unsubscribe();
  }
  onChange($event){
    this.loadedOrders=[];
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    console.log(text);
    if(text===""){
      this.loadedOrders=this.orders;
    }
    this.orders.forEach(element => {
      //console.log(element.model.name);
      if(element.status===text){
        console.log("jeste");
        this.loadedOrders[this.loadedOrders.length]=element;
      }
    })
    }
}
