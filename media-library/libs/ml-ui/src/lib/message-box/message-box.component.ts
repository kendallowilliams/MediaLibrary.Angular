import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  Output,
  ViewEncapsulation,
  EventEmitter,
  Input,
  Optional
} from '@angular/core';
import { ModalRef } from '../modal/models/ModalRef.model';
import { faBan, faCheckCircle, faExclamationCircle, faQuestionCircle, faWarning } from '@fortawesome/free-solid-svg-icons';

export const MESSAGE_BOX_TYPES = ['alert', 'confirm', 'yes_no', 'error', 'warn'] as const;
type MessageType = typeof MESSAGE_BOX_TYPES[number];

@Component({
  selector: 'ml-message-box',
  template: `
  <ml-modal-content class="w-[400px]">
    <ml-modal-header>
      <span class="mr-[5px]">
        <ng-container [ngSwitch]="messageType"]>
          <ng-container *ngSwitchCase="'alert'"><fa-icon [icon]="faExclamationCircle" [classes]="['text-dark']"></fa-icon></ng-container>
          <ng-container *ngSwitchCase="'warn'"><fa-icon [icon]="faWarning" [classes]="['text-warning']"></fa-icon></ng-container>
          <ng-container *ngSwitchCase="'error'"><fa-icon [icon]="faBan" [classes]="['text-danger']"></fa-icon></ng-container>
          <ng-container *ngSwitchCase="'confirm'"><fa-icon [icon]="faCheckCircle" [classes]="['text-success']"></fa-icon></ng-container>
          <ng-container *ngSwitchDefault><fa-icon [icon]="faQuestionCircle" [classes]="['text-warning']"></fa-icon></ng-container>
        </ng-container>
      </span>
      <ml-modal-title>{{title}}</ml-modal-title>
    </ml-modal-header>
    <ml-modal-body>{{message}}</ml-modal-body>
    <ml-modal-footer>
      <div class="flex gap-[10px] items-center justify-end w-full h-full" [ngSwitch]="messageType">
        <ng-container *ngSwitchCase="'confirm'">
          <button mlButton [variant]="'secondary'" (click)="handleCancelClick()">Cancel</button>
          <button mlButton [variant]="'primary'" (click)="handleOKClick()">OK</button>
        </ng-container>
        <ng-container *ngSwitchCase="'yes_no'">
          <button mlButton [variant]="'secondary'" (click)="handleCancelClick()">No</button>
          <button mlButton [variant]="'primary'" (click)="handleOKClick()">Yes</button>
        </ng-container>
        <ng-container *ngSwitchDefault>
          <button mlButton [variant]="'primary'" (click)="handleOKClick()">OK</button>
        </ng-container>
      </div>
    </ml-modal-footer>
  </ml-modal-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBoxComponent implements OnDestroy {
  @Input() public title = '';
  @Input() public message = '';
  @Input() public messageType?: MessageType;

  @Output() public continueResponse = new EventEmitter();
  @Output() public cancelResponse = new EventEmitter();

  public faExclamationCircle = faExclamationCircle;
  public faQuestionCircle = faQuestionCircle;
  public faWarning = faWarning;
  public faBan = faBan;
  public faCheckCircle = faCheckCircle;

  constructor(
    @Inject(ModalRef<MessageBoxComponent>) @Optional() private _modalRef?: ModalRef<MessageBoxComponent>) {
  }

  public ngOnDestroy(): void {
    this.continueResponse.unsubscribe();
    this.cancelResponse.unsubscribe();
  }

  public handleOKClick() : void {
    this.continueResponse.emit();
    this._modalRef?.hide();
  }

  public handleCancelClick() : void {
    this.cancelResponse.emit();
    this._modalRef?.hide();
  }
}
