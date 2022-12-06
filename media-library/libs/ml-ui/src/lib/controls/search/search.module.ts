import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    SearchComponent,
  ],
  exports: [
    SearchComponent,
  ],
})
export class SearchModule {}
