import { NgModule } from "@angular/core";
import { ListBoxComponent } from './list-box.component';
import { ListBoxItemComponent } from "./list-box-item/list-box-item.component";
import { ButtonModule } from "../button";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FontAwesomeModule
  ],
  declarations: [
    ListBoxComponent,
    ListBoxItemComponent
  ],
  exports: [
    ListBoxComponent,
    ListBoxItemComponent
  ]
})
export class ListBoxModule {

}