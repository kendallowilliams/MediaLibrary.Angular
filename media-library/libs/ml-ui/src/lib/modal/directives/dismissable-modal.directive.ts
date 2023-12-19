import { Directive, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { ModalRef } from '../models/ModalRef.model';
import { ModalConfig } from '../models/ModalConfig.model';
import { ModalService } from '../services/modal.service';

@Directive({
  selector: '[mlDismissableModal]'
})
export class DismissableModalDirective implements OnChanges {
  @Input() public backdrop: ModalConfig['backdrop'] = 'transparent';
  @Input() public isOpen = false;
  @Input() public useAppRootVcr = true;
  @Output() public isOpenChange = new EventEmitter<boolean>();

  private _resizeTimeout?: number;
  private _timeoutDelay = 100;
  private _dropDownRef?: ModalRef<unknown>;

  constructor(
    private _template: TemplateRef<unknown>, 
    private _modalService: ModalService,
    private _vcr: ViewContainerRef
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('isOpen' in changes) {
      if (changes['isOpen'].currentValue) {
        this._showModal();
      } else {
        this._close();
      }
    }
  }

  public toggle(): void {
    if (this.isOpen) {
      this._close();
    } else {
      this._showModal();
    }
  }

  private _showModal() : void {
    const modalConfig = new ModalConfig<unknown>();

    modalConfig.static = false;
    modalConfig.backdrop = this.backdrop;
    this._dropDownRef = this._modalService.showTemplate<unknown>(
      this._template, 
      null, 
      modalConfig, 
      !this.useAppRootVcr ? this._vcr : undefined);
    this._dropDownRef.modal?.modalClose.subscribe(() => this._close());
  }

  private _close() : void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this._dropDownRef?.hide();
    this._dropDownRef = undefined;
  }

  @HostListener('window:resize')
  private _handleResize(): void {
    if (this._resizeTimeout) {
      window.clearTimeout(this._resizeTimeout);
    }

    this._resizeTimeout = window.setTimeout(() => {
      if (this.isOpen) {
        this._close();
        this._resizeTimeout = undefined;
      }
    }, this._timeoutDelay);
  }
}