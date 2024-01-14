import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TooltipComponent } from "./tooltip.component";
import { TooltipDirective } from "./directives/tooltip.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    TooltipComponent,
    TooltipDirective
  ],
  exports: [
    TooltipDirective
  ],
})
export class TooltipModule {}