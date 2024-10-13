import { Directive, ElementRef, HostListener } from "@angular/core";
import { ModalRef } from "../models/modal-ref.model";

@Directive({
  selector: '[mlModalBackground]'
})
export class ModalBackgroundDirective {
  private _mouseDownTarget: EventTarget | null = null;

  constructor(private _host: ElementRef, private _modalRef: ModalRef<unknown>) {}

  @HostListener('click')
  public handleClick() : void {
    const background = this._host.nativeElement;

    if (!this._modalRef.modalComponentRef?.instance.config.static &&
        Object.is(this._mouseDownTarget, background)) {
      this._modalRef.hide();
    }
  }

  @HostListener('mousedown', ['$event'])
  public handleMouseDown(evt: MouseEvent) : void {
    this._mouseDownTarget = evt.target;
  }
}