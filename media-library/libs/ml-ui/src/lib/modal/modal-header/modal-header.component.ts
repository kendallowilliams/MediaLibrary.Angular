import {
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
    <div class="flex items-center max-w-full h-full px-[30px]" #parent>
      <div [ngStyle]="{ 'max-width.px': parent.clientWidth - sibling.clientWidth - 60 - 10 }">
        <ng-content></ng-content>
      </div>
      <div class="grow min-w-[10px]"></div>
      <div #sibling>
        <fa-icon [icon]="faXmark" (click)="handleClose()" class="cursor-pointer text-primary fa-lg" />
      </div>
    </div>`,
  encapsulation: ViewEncapsulation.None
})
export class ModalHeaderComponent {
  @HostBinding('class') private _class = 'h-[50px] shadow shrink-0';

  public faXmark = faXmark;

  constructor(
    @Inject(ModalRef<ModalHeaderComponent>) @Optional() private _modalRef?: ModalRef<ModalHeaderComponent>
  ) { }

  public handleClose() : void {
    this._modalRef?.hide();
  }
}
