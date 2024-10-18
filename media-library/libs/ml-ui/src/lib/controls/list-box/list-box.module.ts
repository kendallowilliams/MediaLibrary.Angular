import { NgModule } from "@angular/core";
import { ListBoxComponent } from './list-box.component';
import { ListBoxItemComponent } from "./list-box-item/list-box-item.component";
import { ButtonModule } from "../button";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ListBoxItemTemplateDirective } from "./directives/list-box-item-template.directive";
import { ControlGroupModule } from "../control-group";

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FontAwesomeModule,
    ControlGroupModule
  ],
  declarations: [
    ListBoxComponent,
    ListBoxItemComponent,
    ListBoxItemTemplateDirective
  ],
  exports: [
    ListBoxComponent,
    ListBoxItemComponent,
    ListBoxItemTemplateDirective
  ]
})
export class ListBoxModule {

}