import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Output,
  ViewChild,
  ViewEncapsulation,
  EventEmitter,
  ViewContainerRef,
  Input,
  Optional,
  Injector,
  Inject,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { ModalConfig } from './models/ModalConfig.model';
import { ModalRef } from './models/ModalRef.model';
import { Modal } from './models/Modal.interface';

@Component({
  // selector: 'ml-modal',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #mlDialog class="outline-0 border-0 bg-transparent appearance-none p-0 m-0 max-w-full"
      (close)="handleClose($event)" (cancel)="handleCancel($event)">
      <ng-template #modalContent></ng-template>
    </dialog>
    `
})
export class ModalComponent<T> implements AfterViewInit, Modal {
  @ViewChild('mlDialog') private _dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('modalContent', {read: ViewContainerRef}) private _modalContent!: ViewContainerRef;
  @Input() public static = false;
  @Output() public modalClose = new EventEmitter<Event>();
  @Output() public modalCancel = new EventEmitter<Event>();

  constructor(private _renderer: Renderer2,
    @Inject(ModalRef<T>) @Optional() private _modalRef?: ModalRef<T>, 
    @Inject(ModalConfig<T>) @Optional() private _modalConfig?: ModalConfig<T>) {}

  public ngAfterViewInit(): void {
    this._initializeDialog();
    this._initializeContent();
  }

  private _initializeDialog(): void {
    const dialog = this._dialog.nativeElement;

    if (this._modalConfig?.backdrop === 'hidden') {
      this._renderer.addClass(dialog, 'backdrop:hidden');
    } else if (this._modalConfig?.backdrop === 'transparent') {
      this._renderer.addClass(dialog, 'backdrop:bg-transparent');
    }

    this.static = this._modalConfig?.static || false;
  }

  private _initializeContent() : void {
    const injector = Injector.create({ 
        providers: [{ 
          provide: ModalRef<T>, useValue: this._modalRef
        }, {
          provide: ModalConfig<T>, useValue: this._modalConfig
        }]
      });
    
    if (this._modalRef?.componentType) {
      const componentRef = this._modalContent.createComponent<T>(this._modalRef?.componentType, { injector: injector });
      
      this._modalRef.component = componentRef.instance;
      this._modalConfig?.configureComponentInput?.call(this, this._modalRef.component);
      componentRef.changeDetectorRef.detectChanges();
      this.show();
    } else if (this._modalRef?.template) {
      const templateView = this._modalContent.createEmbeddedView(this._modalRef.template, this._modalRef?.templateCtx, { injector: injector });

      templateView.detectChanges();
      this.show();
    }
  }

  public show() : void {
    this._dialog.nativeElement.showModal();
  }

  public hide() : void {
    this._dialog.nativeElement.close();
  }

  @HostListener('click', ['$event'])
  public handleClick(event: Event) : void {
    const dialog = this._dialog.nativeElement;

    if (Object.is(event.target, dialog) && !this.static) {
      this.hide();
    }
  }

  public handleCancel(event: Event) : void {
    this.modalCancel.emit(event);
  }

  public handleClose(event: Event) : void {
    this.modalClose.emit(event);
  }
}
