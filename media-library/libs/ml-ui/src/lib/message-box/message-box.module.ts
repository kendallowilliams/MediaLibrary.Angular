import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from '../controls';
import { ModalModule } from '../modal';

@NgModule({
  imports: [CommonModule, ButtonModule, ModalModule, FontAwesomeModule],
  declarations: [
    MessageBoxComponent
  ],
  exports: [
    MessageBoxComponent
  ],
})
export class MessageBoxModule {}
