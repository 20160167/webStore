import { Combination, CombinationSearch } from './../../../products/products.model';
import { AdminService } from './../../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './combination-list.component.html',
  styleUrls: ['./combinations-list.component.css'],
  //moramo ovako da dodamo servis u komponentu
})
export class CombinationsListComponent implements OnInit {
  public combinations:Array<CombinationSearch>=[];
  private sub;


  //dodati pfiltered products pa da reaguje na promeni u combo
  constructor(
       private AdminService:AdminService,
       private router: Router
  ) { }

  ngOnInit() {
      this.load();
  }
  load = () => {
    this.sub=this.AdminService.getCombinations().subscribe((combination:CombinationSearch[])=>{
        this.combinations=combination;
    })

  };
  ngOnDestroy() {
      this.sub.unsubscribe();
  }
  prebaci(){
    this.router.navigateByUrl('/combinations/new');
  }
}
