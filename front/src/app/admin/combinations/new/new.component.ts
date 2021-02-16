import { AdminService } from "./../../admin.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-products",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"],
  //moramo ovako da dodamo servis u komponentu
})
export class NewCombinationComponent {
  url="";
  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  onSubmit(form: NgForm) {
    // console.log(form);
    if (!form.valid) {
      return;
    }
    const color1 = form.value.color1;
    const color2 = form.value.color2;
    const url =form.value.url;
    const description =form.value.description;
    this.adminService.addCombination(color1, color2, url, description).subscribe();
      this.router.navigateByUrl('/combinations/new');
    form.reset();
  }
  onChange($event){
    this.url=$event.target.value;
  }
}
