import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { MessageBoxComponent } from './message-box.component';
import { ModalModule } from '../../modal/modal.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
