import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarModule } from "../../navbar/navbar.module";
import { CombinationsListComponent } from "./combinations-list/combination-list.component";
import { NewCombinationComponent } from "./new/new.component";
import { CombinationsComponent } from "./combinations.component";
import { CombinationssRoutingModule } from "./combinations-routing.module";

@NgModule({
    imports: [
        CommonModule,
        CombinationssRoutingModule,
        NavbarModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
      CombinationsComponent,
      CombinationsListComponent,
      NewCombinationComponent
    ]
})
export class CombinationsModule { }
