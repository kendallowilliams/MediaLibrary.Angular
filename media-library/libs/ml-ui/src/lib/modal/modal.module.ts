import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalTitleComponent } from './modal-title/modal-title.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DismissableModalDirective } from './directives/dismissable-modal.directive';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    ModalComponent,
    ModalTitleComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalContentComponent,
    DismissableModalDirective
  ],
  exports: [
    ModalTitleComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalContentComponent,
    DismissableModalDirective
  ],
})
export class ModalModule {}
