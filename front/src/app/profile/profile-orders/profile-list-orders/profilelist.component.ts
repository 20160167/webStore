import { UserInfo } from './../../customerinfo';
import { UserService } from './../../user.service';
import { Order } from './../../orders.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
  //moramo ovako da dodamo servis u komponentu
})
export class MyOrdersListComponent implements OnInit {
  public orders:Array<Order>=[];
  private sub;
  public listItems: Array<string> = [];
  public enabled=false;
  selectedOption:string;
  modelItems=[];


  //dodati pfiltered products pa da reaguje na promeni u combo
  constructor(
       private userService:UserService,
       private router: Router
  ) { }

  ngOnInit() {
      this.load();
  }
  load = () => {
    this.userService.getUser(JSON.parse(localStorage.getItem('userData'))['id']).subscribe((userInfo:UserInfo)=>{
      this.sub = this.userService.getOrders(userInfo.info.id)
          .subscribe((orders:Order[]) => {
              this.orders = orders;
          })
    });

  };
  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
