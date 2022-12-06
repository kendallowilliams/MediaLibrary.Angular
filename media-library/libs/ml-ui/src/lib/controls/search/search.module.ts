import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, RouterModule, FormsModule],
  declarations: [
    SearchComponent,
  ],
  exports: [
    SearchComponent,
  ],
})
export class SearchModule {}
