import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TooltipDirective } from "./tooltip.directive";

@NgModule({
  imports: [CommonModule, TooltipDirective],
  exports: [TooltipDirective],
  declarations: []
})
export class TooltipModule {}