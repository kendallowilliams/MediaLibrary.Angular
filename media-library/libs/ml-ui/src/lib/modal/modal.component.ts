import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Output,
  ViewChild,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ml-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @ViewChild('mlDialog') private _dialog!: ElementRef<HTMLDialogElement>;

  @Output() public modalClose = new EventEmitter<Event>();

  public show() : void {
    this._dialog.nativeElement.show();
  }

  public showModal() : void {
    this._dialog.nativeElement.showModal();
  }

  public hide() : void {
    this._dialog.nativeElement.close();
  }

  @HostListener('close', ['$event'])
  protected handleClose(event: Event) : void {
    this.modalClose.emit(event);
  }
}
