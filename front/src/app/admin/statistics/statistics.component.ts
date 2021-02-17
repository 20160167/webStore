import { ProductsService } from './../../products/products.service';
import { AdminService } from './../admin.service';

import { Component, OnInit, Output } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { Category } from '../../products/products.model';
import { Order } from '../../profile/orders.model';
@Component({
  selector: 'app-header',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  isHome=false;
  public categories:Array<Category>=[];
  private sub;
  private sub1;
  dataPoints=[];
  constructor(private adminService:AdminService, private productsService:ProductsService){}
  ngOnInit() {

    this.sub1=this.adminService.getOrders().subscribe((orders:Order[])=>{
      this.sub=this.adminService.getCategories().subscribe((categories:Category[])=>{
        console.log(orders);
        console.log(categories)
        this.categories=categories;
        categories.forEach((element)=>{
          let count=0;
          orders.forEach((order)=>{
            order.products.forEach((product)=>{
              if(product.brand_id===element.id){
                count++;
              }
            })
          })
          this.dataPoints.push({y:count, label: element.brand});
        })
      });
    //   this.sub2=this.productsService.getBrands().subscribe((brands:Brand[])=>{
    //     brands.forEach((element)=>{
    //       let count=0;
    //       orders.forEach((order)=>{
    //         order.shoppingCart.products.forEach((product)=>{
    //           if(product.car.model.brand.name===element.name){
    //             count++;
    //           }
    //         })
    //       })
    //       this.dataPoints1.push({y:count*100/orders.length, label: element.name});
    //     })
    //   });
    })
		let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: false,
		title: {
			text: "Brands in orders"
		},
		data: [{
			type: "column",
			dataPoints: this.dataPoints
		}]
  });


  chart.render();
  // chart1.render();
    }
    ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
