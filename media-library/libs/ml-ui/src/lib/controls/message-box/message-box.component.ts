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
import { ModalRef } from '../../modal/models/ModalRef.model';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type MessageType = 'alert' | 'confirm' | 'yes_no' | 'error' | 'warn';

@Component({
  selector: 'ml-message-box',
  template: `
  <ml-modal-content class="w-[400px]">
    <ml-modal-header>
      <span class="mr-[5px]">
        <ng-container [ngSwitch]="messageType"]>
          <ng-container *ngSwitchCase="'alert'"><fa-icon *ngIf="faExclamationCircle" [icon]="faExclamationCircle" [classes]="['text-info']"></fa-icon></ng-container>
          <ng-container *ngSwitchCase="'warn'"><fa-icon *ngIf="faWarning" [icon]="faWarning" [classes]="['text-warning']"></fa-icon></ng-container>
          <ng-container *ngSwitchCase="'error'"><fa-icon *ngIf="faBan" [icon]="faBan" [classes]="['text-danger']"></fa-icon></ng-container>
          <ng-container *ngSwitchDefault><fa-icon *ngIf="faQuestionCircle" [icon]="faQuestionCircle" [classes]="['text-warning']"></fa-icon></ng-container>
        </ng-container>
      </span>
      <ml-modal-title>{{title}}</ml-modal-title>
    </ml-modal-header>
    <ml-modal-body>{{message}}</ml-modal-body>
    <ml-modal-footer>
      <div class="flex gap-[10px] items-center justify-end" [ngSwitch]="messageType">
        <ng-container *ngSwitchCase="'confirm'">
          <button mlButton [variant]="'secondary'" (click)="handleCancelClick()">Cancel</button>
          <button mlButton [variant]="'success'" (click)="handleOKClick()">OK</button>
        </ng-container>
        <ng-container *ngSwitchCase="'yes_no'">
          <button mlButton [variant]="'secondary'" (click)="handleCancelClick()">No</button>
          <button mlButton [variant]="'success'" (click)="handleOKClick()">Yes</button>
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

  protected faExclamationCircle?: IconDefinition;
  protected faQuestionCircle?: IconDefinition;
  protected faWarning?: IconDefinition;
  protected faBan?: IconDefinition;

  constructor(private _faIconService: FaIconService,
    @Inject(ModalRef<MessageBoxComponent>) @Optional() private _modalRef?: ModalRef<MessageBoxComponent>) {
    this.faExclamationCircle = this._faIconService.getIconDefinition('fas', 'exclamation-circle');
    this.faQuestionCircle = this._faIconService.getIconDefinition('fas', 'question-circle');
    this.faWarning = this._faIconService.getIconDefinition('fas', 'warning');
    this.faBan = this._faIconService.getIconDefinition('fas', 'ban')
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
