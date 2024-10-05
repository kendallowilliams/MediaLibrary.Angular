import { NgModule } from "@angular/core";
import { TabGroupComponent } from "./tab-group/tab-group.component";
import { TabComponent } from "./tab.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [TabGroupComponent, TabComponent],
  imports: [CommonModule],
  exports: [TabGroupComponent, TabComponent]
})
export class TabModule {

}