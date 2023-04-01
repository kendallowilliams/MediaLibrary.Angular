import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  Output,
  ViewEncapsulation,
  EventEmitter,
  Input
} from '@angular/core';
import { ModalRef } from '../../modal/models/ModalRef.model';

type MessageType = 'alert' | 'confirm' | 'yes_no' | 'error' | 'warn';

@Component({
  selector: 'ml-message-box',
  template: `
  <ml-modal-content>
    <ml-modal-header>
      <ml-modal-title>{{title}}</ml-modal-title>
    </ml-modal-header>
    <ml-modal-body>{{message}}</ml-modal-body>
    <ml-modal-footer>
      <div class="flex gap-[10px] items-center justify-end" [ngSwitch]="messageType">
        <ng-container *ngSwitchCase="'confirm'">
          <button mlButton [variant]="'success'" (click)="handleOKClick()">OK</button>
          <button mlButton [variant]="'secondary'" (click)="handleCancelClick()">Cancel</button>
        </ng-container>
        <ng-container *ngSwitchCase="'yes_no'">
          <button mlButton [variant]="'success'" (click)="handleOKClick()">Yes</button>
          <button mlButton [variant]="'secondary'" (click)="handleCancelClick()">No</button>
        </ng-container>
        <ng-container *ngSwitchDefault>
          <button mlButton [variant]="'success'" (click)="handleOKClick()">OK</button>
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

  constructor(@Inject(ModalRef<MessageBoxComponent>) private _modalRef?: ModalRef<MessageBoxComponent>) {
  }

  public ngOnDestroy(): void {
    this.continueResponse.unsubscribe();
    this.cancelResponse.unsubscribe();
  }

  protected handleOKClick() : void {
    this.continueResponse.emit();
    this._modalRef?.hide();
  }

  protected handleCancelClick() : void {
    this.cancelResponse.emit();
    this._modalRef?.hide();
  }
}
