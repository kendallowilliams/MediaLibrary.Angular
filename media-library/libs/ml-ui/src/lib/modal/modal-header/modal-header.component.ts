import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { ModalRef } from '../models/modal-ref.model';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-modal-header',
  template: `
    <div class="flex items-center w-full h-full">
      <div class="grow"><ng-content></ng-content></div>
      <fa-icon [icon]="faXmark" (click)="handleClose()"
        [classes]="['cursor-pointer', 'text-primary', 'fa-lg']"></fa-icon>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent {
  @HostBinding('class') private _class = 'h-[50px] px-[30px] shadow';

  public faXmark = faXmark;

  constructor(
    @Inject(ModalRef<ModalHeaderComponent>) @Optional() private _modalRef?: ModalRef<ModalHeaderComponent>) {
  }

  public handleClose() : void {
    this._modalRef?.hide();
  }
}
