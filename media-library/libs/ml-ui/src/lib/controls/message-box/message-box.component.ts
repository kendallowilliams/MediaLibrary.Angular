import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../../modal/modal.component';
import { MessageBoxService } from '../../services/message-box/message-box.service';

type MessageType = 'alert' | 'confirm' | 'yes_no' | 'error' | 'warn';

@Component({
  selector: 'ml-message-box',
  templateUrl: './message-box.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBoxComponent implements AfterViewInit {
  @ViewChild(ModalComponent) private _modal!: ModalComponent;

  protected title$?: Subject<string>;
  protected message$?: Subject<string>;
  protected messageType$: Subject<MessageType>;

  constructor(private _messageBoxService: MessageBoxService) {
    this.title$ = new Subject<string>();
    this.message$ = new Subject<string>();
    this.messageType$ = new Subject<MessageType>();
    this._messageBoxService.setMessageBox(this);
  }

  public ngAfterViewInit(): void {
    this._messageBoxService.getModalOpen$().subscribe(open => {
      if (open) {
        this._modal.showModal();
      } else {
        this._modal.hide();
      }
    });
  }

  public setTitle(title: string) : void {
    this.title$?.next(title);
  }

  public setMessage(message: string) : void {
    this.message$?.next(message);
  }

  public setMessageType(messageType: MessageType) : void {
    this.messageType$?.next(messageType);
  }

  protected handleOKClick() : void {
    this._reset();
    this._messageBoxService.getReturnValue$().next(true);
    this._messageBoxService.getModalOpen$().next(false);
  }

  protected handleCancelClick() : void {
    this._reset();
    this._messageBoxService.getReturnValue$().next(false);
    this._messageBoxService.getModalOpen$().next(false);
  }

  private _reset() : void {
    this.title$?.next('');
    this.message$?.next('');
    this.messageType$?.next('alert');
  }
}
