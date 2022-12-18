import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MessageBoxComponent } from '../../controls/message-box/message-box.component';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {
  private _messageBox?: MessageBoxComponent;

  private _modalOpen$!: BehaviorSubject<boolean>;

  private _returnValue$!: Subject<boolean>;

  constructor() {
    this._modalOpen$ = new BehaviorSubject<boolean>(false);
    this._returnValue$ = new Subject<boolean>();
  }

  public setMessageBox(messageBox: MessageBoxComponent) : void {
    this._messageBox = messageBox;
  }

  public alert(title: string, message: string) : void {
    this._messageBox?.setTitle(title);
    this._messageBox?.setMessage(message);
    this._messageBox?.setMessageType('alert');
    this._modalOpen$.next(true);
  }

  public error(title: string, message: string) : void {
    this._messageBox?.setTitle(title);
    this._messageBox?.setMessage(message);
    this._messageBox?.setMessageType('error');
    this._modalOpen$.next(true);
  }

  public warn(title: string, message: string) : void {
    this._messageBox?.setTitle(title);
    this._messageBox?.setMessage(message);
    this._messageBox?.setMessageType('warn');
    this._modalOpen$.next(true);
  }

  public confirm(title: string, message: string, yesNo: boolean = false) : Observable<boolean> {
    const observable$ = new Observable<boolean>((subscriber) => {
      const subscription$ = this._returnValue$.subscribe(returnValue => {
        subscriber.next(returnValue);
        subscriber.complete();
        subscription$.unsubscribe();
      });
    });
    this._messageBox?.setTitle(title);
    this._messageBox?.setMessage(message);
    this._messageBox?.setMessageType(yesNo ? 'yes_no' : 'confirm');
    this._modalOpen$.next(true);

    return observable$;
  }

  public getModalOpen$() : BehaviorSubject<boolean> {
    return this._modalOpen$;
  }

  public getReturnValue$() : Subject<boolean> {
    return this._returnValue$;
  }
}
