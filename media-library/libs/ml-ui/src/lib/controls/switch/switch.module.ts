import { NgModule } from "@angular/core";
import { SwitchComponent } from "./switch.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeToggleDirective } from "./theme-toggle/theme-toggle.directive";

@NgModule({
  exports: [SwitchComponent, ThemeToggleDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ThemeToggleDirective],
  declarations: [SwitchComponent]
})
export class SwitchModule {}