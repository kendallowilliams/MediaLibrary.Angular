import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @ViewChild('mlDialog') private _dialog!: ElementRef<HTMLDialogElement>;

  public show() : void {
    this._dialog.nativeElement.showModal();
  }

  public hide() : void {
    this._dialog.nativeElement.close();
  }
}
