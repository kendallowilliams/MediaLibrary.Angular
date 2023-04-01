import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ModalRef } from '../models/ModalRef.model';

@Component({
  selector: 'ml-modal-header',
  template: `
    <div class="flex items-center w-full h-full">
      <div class="grow"><ng-content></ng-content></div>
      <fa-icon *ngIf="faXmark" [icon]="faXmark" (click)="handleClose()"
        [classes]="['cursor-pointer', 'text-dark']"></fa-icon>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent {
  @HostBinding('class') private _class = 'h-[50px] px-[30px] shadow';

  protected faXmark?: IconDefinition;

  constructor(private _faIconService: FaIconService,
    @Inject(ModalRef<ModalHeaderComponent>) @Optional() private _modalRef?: ModalRef<ModalHeaderComponent>) {
    this.faXmark = this._faIconService.getIconDefinition('fas', 'xmark');
  }

  protected handleClose() : void {
    this._modalRef?.hide();
  }
}
