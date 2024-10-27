import { NgModule } from "@angular/core";
import { SwitchComponent } from "./switch.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  exports: [SwitchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [SwitchComponent]
})
export class SwitchModule {}