import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { ModalRef } from '../models/ModalRef.model';
import { ModalConfig } from '../models/ModalConfig.model';
import { ModalService } from '../services/modal.service';
import { Modal } from '../models/Modal.interface';

@Directive({
  selector: '[mlModal]'
})
export class ModalDirective implements OnChanges {
  @Input() public config: ModalConfig<unknown> = new ModalConfig<unknown>();
  @Input() public useAppRootVcr = true;
  @Input() public isOpen = false;
  @Output() public isOpenChange = new EventEmitter<boolean>();

  private _dropDownRef?: ModalRef<unknown>;
  public modal?: Modal;

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
        this._hide();
      }
    }
  }

  public toggle(): void {
    if (this.isOpen) {
      this._hide();
    } else {
      this._showModal();
    }
  }

  private _showModal() : void {
    this._dropDownRef = this._modalService.showTemplate<unknown>(
      this._template, 
      null, 
      this.config, 
      !this.useAppRootVcr ? this._vcr : undefined);
    this._dropDownRef.modal?.modalClose.subscribe(() => this._close());
  }

  private _hide() : void {
    this._dropDownRef?.hide();
    this._dropDownRef = undefined;
  }

  private _close() : void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}