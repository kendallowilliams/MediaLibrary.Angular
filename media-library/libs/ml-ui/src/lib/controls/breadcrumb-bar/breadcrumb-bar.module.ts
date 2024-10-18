import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbBarComponent } from './breadcrumb-bar.component';

@NgModule({
  imports: [],
  exports: [
    BreadcrumbComponent,
    BreadcrumbBarComponent
  ],
  declarations: [
    BreadcrumbComponent,
    BreadcrumbBarComponent
  ]
})
export class BreadcrumbBarModule {
}
