import { ProductsService } from './../../products/products.service';
import { AdminService } from './../admin.service';

import { Component, OnInit, Output } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { CombinationSearch, Brand } from '../../products/products.model';
import { Order } from '../../profile/orders.model';
@Component({
  selector: 'app-header',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  isHome=false;
  public combinations:Array<CombinationSearch>=[];
  private sub;
  private sub1;
  private sub2;
  dataPoints=[];
  dataPoints1=[];
  constructor(private adminService:AdminService, private productsService:ProductsService){}
  ngOnInit() {

  //   this.sub1=this.adminService.getOrders().subscribe((orders:Order[])=>{
  //     this.sub=this.adminService.getCombinations().subscribe((combination:CombinationSearch[])=>{
  //       this.combinations=combination;
  //       combination.forEach((element)=>{
  //         let count=0;
  //         orders.forEach((order)=>{
  //           order.shoppingCart.products.forEach((product)=>{
  //             if(product.combination.url===element.url){
  //               count++;
  //             }
  //           })
  //         })
  //         this.dataPoints.push({y:count*100/orders.length, label: element.color1+'/'+element.color2});
  //       })
  //     });
  //     this.sub2=this.productsService.getBrands().subscribe((brands:Brand[])=>{
  //       brands.forEach((element)=>{
  //         let count=0;
  //         orders.forEach((order)=>{
  //           order.shoppingCart.products.forEach((product)=>{
  //             if(product.car.model.brand.name===element.name){
  //               count++;
  //             }
  //           })
  //         })
  //         this.dataPoints1.push({y:count*100/orders.length, label: element.name});
  //       })
  //     });
  //   })
	// 	let chart = new CanvasJS.Chart("chartContainer", {
	// 	animationEnabled: true,
	// 	exportEnabled: false,
	// 	title: {
	// 		text: "Procentualni udeo Kombinacija u narudzbinama"
	// 	},
	// 	data: [{
	// 		type: "column",
	// 		dataPoints: this.dataPoints
	// 	}]
  // });
  // let chart1 = new CanvasJS.Chart("chartContainer1", {
	// 	animationEnabled: true,
	// 	exportEnabled: false,
	// 	title: {
	// 		text: "Procentualni udeo brendova u narudzbinama"
	// 	},
	// 	data: [{
	// 		type: "column",
	// 		dataPoints: this.dataPoints1
	// 	}]
	// });

  // chart.render();
  // chart1.render();
    }
    ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
