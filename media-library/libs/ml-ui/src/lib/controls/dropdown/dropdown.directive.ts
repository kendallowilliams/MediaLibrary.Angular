import { Directive, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2, RendererStyleFlags2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { ModalRef } from '../../modal/models/ModalRef.model';
import { ModalConfig } from '../../modal/models/ModalConfig.model';
import { ModalService } from '../../modal/services/modal.service';

@Directive({
  selector: '[mlDropdown]'
})
export class DropdownDirective implements OnChanges {
  @Input({ required: true }) public hostElement!: HTMLElement;
  @Input() public isDropdownOpen = false;
  @Output() public isDropdownOpenChange = new EventEmitter<boolean>();

  private _resizeTimeout?: number;
  private _scrollTimeout?: number;
  private _timeoutDelay = 100;
  public dropdownStyles?: { [klass: string]: unknown };
  private _dropDownRef?: ModalRef<unknown>;

  constructor(
    private _template: TemplateRef<unknown>, 
    private _modalService: ModalService,
    private _vcr: ViewContainerRef,
    private _renderer: Renderer2) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('isDropdownOpen' in changes) {
      if (changes['isDropdownOpen'].currentValue) {
        this._showModal();
      } else {
        this._closeDropdown();
      }
    }
  }

  private _updateDropdownStyles() : void {
    const host = this.hostElement,
      clientRect = host.getBoundingClientRect();

    this._renderer.setStyle(this.hostElement, '--dropdown-width', `${host.clientWidth}px`, RendererStyleFlags2.DashCase);
    this._renderer.setStyle(this.hostElement, '--dropdown-top', `${clientRect.top + host.clientHeight}px`, RendererStyleFlags2.DashCase);
    this._renderer.setStyle(this.hostElement, '--dropdown-left', `${clientRect.left}px`, RendererStyleFlags2.DashCase);
  }

  public toggleDropdown(): void {
    if (this.isDropdownOpen) {
      this._closeDropdown();
    } else {
      this._showModal();
    }
  }

  private _showModal() : void {
    const modalConfig = new ModalConfig<unknown>();

    modalConfig.static = false;
    modalConfig.backdrop = 'transparent';
    this._dropDownRef = this._modalService.showTemplate<unknown>(this._template, null, this._vcr, modalConfig);
    this._dropDownRef.modal?.modalClose.subscribe(() => this._closeDropdown());
    this._updateDropdownStyles();
  }

  private _closeDropdown() : void {
    this._dropDownRef?.hide();
    this._dropDownRef = undefined;
    this.isDropdownOpen = false;
    this.isDropdownOpenChange.emit(this.isDropdownOpen);
  }

  @HostListener('document:scroll')
  private _handleScroll(): void {
    if (this.isDropdownOpen) {
      if (this._scrollTimeout) {
        window.clearTimeout(this._scrollTimeout);
      }

      this._scrollTimeout = window.setTimeout(() => {
        this._updateDropdownStyles();
        this._scrollTimeout = undefined;
      }, 10);
    }
  }

  @HostListener('window:resize')
  private _handleResize(): void {
    if (this._resizeTimeout) {
      window.clearTimeout(this._resizeTimeout);
    }

    this._resizeTimeout = window.setTimeout(() => {
      if (this.isDropdownOpen) {
        this._closeDropdown();
        this._resizeTimeout = undefined;
      }
    }, this._timeoutDelay);
  }
}