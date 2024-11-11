import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [SidebarComponent],
  declarations: [SidebarComponent]
})
export class SidebarModule {}