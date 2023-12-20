import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageBoxComponent } from '../message-box.component';
import { ModalService } from '../../modal/services/modal.service';
import { ModalRef } from '../../modal/models/ModalRef.model';
import { ModalConfig } from '../../modal/models/ModalConfig.model';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {
  private _modalRef?: ModalRef<MessageBoxComponent>;

  constructor(private _modalService: ModalService) {}

  public alert(title: string, message: string) : void {
    const modalConfig = new ModalConfig<MessageBoxComponent>();

    modalConfig.configureComponentInputs = (c: MessageBoxComponent) => {
      c.title = title;
      c.message = message;
      c.messageType = 'alert';
    };
    this._modalRef = this._modalService.showComponent(MessageBoxComponent, modalConfig);
  }

  public error(title: string, message: string) : void {
    const modalConfig = new ModalConfig<MessageBoxComponent>();

    modalConfig.configureComponentInputs = (c: MessageBoxComponent) => {
      c.title = title;
      c.message = message;
      c.messageType = 'error';
    };
    this._modalRef = this._modalService.showComponent(MessageBoxComponent, modalConfig);
  }

  public warn(title: string, message: string) : void {
    const modalConfig = new ModalConfig<MessageBoxComponent>();

    modalConfig.configureComponentInputs = (c: MessageBoxComponent) => {
      c.title = title;
      c.message = message;
      c.messageType = 'warn';
    };
    this._modalRef = this._modalService.showComponent(MessageBoxComponent, modalConfig);
  }

  public confirm(title: string, message: string, vcr: ViewContainerRef, yesNo: boolean = false) : Observable<boolean> {
    const modalConfig = new ModalConfig<MessageBoxComponent>();

    modalConfig.configureComponentInputs = (c: MessageBoxComponent) => {
      c.title = title;
      c.message = message;
      c.messageType = yesNo ? 'yesNo' : 'confirm';
    };
    this._modalRef = this._modalService.showComponent(MessageBoxComponent, modalConfig);

    return new Observable<boolean>(subscriber => {
      this._modalRef?.component?.continueResponse.subscribe(() => {
        subscriber.next(true);
        subscriber.complete();
      });
      this._modalRef?.component?.cancelResponse.subscribe(() => {
        subscriber.next(false);
        subscriber.complete();
      });
    });
  }
}
