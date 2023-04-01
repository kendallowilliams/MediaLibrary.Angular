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
  AfterViewInit,
  Input,
  Optional,
  Injector,
  Inject
} from '@angular/core';
import { ModalConfig } from './models/ModalConfig.model';
import { ModalRef } from './models/ModalRef.model';

@Component({
  // selector: 'ml-modal',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #mlDialog (close)="handleClose($event)" (cancel)="handleCancel($event)">
      <ng-template #modalContent></ng-template>
    </dialog>
    `
})
export class ModalComponent<T> implements AfterViewInit {
  @ViewChild('mlDialog') private _dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('modalContent', {read: ViewContainerRef}) private _modalContent!: ViewContainerRef;

  @Input() public static = false;
  @Output() public modalClose = new EventEmitter<Event>();
  @Output() public modalCancel = new EventEmitter<Event>();

  constructor(@Inject(ModalRef<T>) @Optional() private _modalRef?: ModalRef<T>, @Inject(ModalConfig) @Optional() private _modalConfig?: ModalConfig) {}

  public ngAfterViewInit(): void {
    this._initialize();
  }

  private _initialize() : void {
    const injector = Injector.create({ 
        providers: [{ 
          provide: ModalRef<T>, useValue: this._modalRef
        }, {
          provide: ModalConfig, useValue: this._modalConfig
        }]
      });
    
    if (this._modalRef?.componentType) {
      const componentRef = this._modalContent.createComponent<T>(this._modalRef?.componentType, { injector: injector });
      
      this._modalRef.component = componentRef.instance;
      componentRef.changeDetectorRef.detectChanges();
    } else if (this._modalRef?.template) {
      const templateView = this._modalContent.createEmbeddedView(this._modalRef.template, this._modalRef?.templateCtx, { injector: injector });

      templateView.detectChanges();
    }
  }

  public show() : void {
    this._dialog.nativeElement.showModal();
  }

  public hide() : void {
    this._dialog.nativeElement.close();
  }

  @HostListener('click', ['$event'])
  protected handleClick(event: Event) : void {
    const dialog = this._dialog.nativeElement;

    if (Object.is(event.target, dialog) && !this.static) {
      this.hide();
    }
  }

  protected handleCancel(event: Event) : void {
    this.modalCancel.emit(event);
  }

  protected handleClose(event: Event) : void {
    this.modalClose.emit(event);
  }
}
