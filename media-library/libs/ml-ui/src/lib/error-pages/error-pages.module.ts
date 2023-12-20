import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';

@NgModule({
  declarations: [
    NotFoundPageComponent,
    InternalServerErrorComponent
  ],
  exports: [
    NotFoundPageComponent,
    InternalServerErrorComponent
  ],
  imports: [CommonModule],
})
export class ErrorPagesModule {}
