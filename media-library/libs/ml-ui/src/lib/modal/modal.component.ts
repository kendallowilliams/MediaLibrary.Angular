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
  DestroyRef
} from '@angular/core';
import { ModalConfig } from './models/modal-config.model';
import { ModalRef } from './models/modal-ref.model';
import { Modal } from './models/modal.interface';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // selector: 'ml-modal',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #mlDialog class="outline-0 border-0 bg-transparent appearance-none max-w-full max-h-full"
      [ngClass]="{
        'backdrop:bg-dark backdrop:opacity-50': config.backdrop === 'visible',
        'backdrop:bg-transparent': config.backdrop === 'transparent'
      }" (close)="handleClose($event)" (cancel)="handleCancel($event)">
      <div #backgroundDiv class="flex justify-center items-center h-lvh w-lvw">
        <ng-template #modalContent></ng-template>
      </div>
    </dialog>
    `
})
export class ModalComponent<T> implements AfterViewInit, Modal {
  @ViewChild('mlDialog') private _dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('backgroundDiv') private _backgroundDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('modalContent', {read: ViewContainerRef}) private _modalContent!: ViewContainerRef;
  @Input() public config = new ModalConfig();
  @Output() public modalClose = new EventEmitter<Event>();
  @Output() public modalCancel = new EventEmitter<Event>();

  constructor(
    private _destroyRef: DestroyRef,
    @Inject(ModalRef<T>) @Optional() private _modalRef?: ModalRef<T>) {}

  public ngAfterViewInit(): void {
    this._initializeContent();
  }

  private _initializeContent() : void {
    const injector = Injector.create({ 
        providers: [{ 
          provide: ModalRef<T>, useValue: this._modalRef
        }]
      });
    
    if (this._modalRef?.componentType) {
      const componentRef = this._modalContent.createComponent<T>(this._modalRef?.componentType, { injector: injector });
      
      this._modalRef.component = componentRef.instance;
      if (this.config?.inputs) {
        Object.keys(this.config.inputs)
          .forEach(input => componentRef.setInput(input, this.config?.inputs?.[input]));
      }
      componentRef.changeDetectorRef.detectChanges();
      this.show();
    } else if (this._modalRef?.template) {
      const templateView = this._modalContent.createEmbeddedView(this._modalRef.template, this._modalRef?.templateCtx, { injector: injector });

      templateView.detectChanges();
      this.show();
    }
  }

  public show() : void {
    if (this.config.modeless) {
      this._dialog.nativeElement.show();
    } else {
      this._dialog.nativeElement.showModal();
    }
    fromEvent<HTMLDialogElement>(this._dialog.nativeElement, 'close')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._modalRef?.modalComponentRef?.destroy());
  }

  public hide() : void {
    this._dialog.nativeElement.close();
  }

  @HostListener('click', ['$event'])
  public handleClick(event: Event) : void {
    const background = this._backgroundDiv.nativeElement;

    if (Object.is(event.target, background) && !this.config.static) {
      this.hide();
    }
  }

  public handleCancel(event: Event) : void {
    this.modalCancel.emit(event);
  }

  public handleClose(event: Event) : void {
    this.modalClose.emit(event);
    this._modalRef?.hide();
  }
}
