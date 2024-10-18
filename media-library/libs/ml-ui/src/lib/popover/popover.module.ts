import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PopoverDirective } from "./directives/popover.directive";
import { PopoverContentComponent } from "./popover-content.component";

@NgModule({
  declarations: [PopoverContentComponent],
  imports: [CommonModule, PopoverDirective],
  exports: [PopoverDirective],
})
export class PopoverModule {

}