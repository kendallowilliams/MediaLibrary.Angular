import { Injectable, Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalConfig } from '../models/ModalConfig.model';
import { ModalRef } from '../models/ModalRef.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public showComponent<T>(componentType: Type<T>, vcr: ViewContainerRef, modalConfig: ModalConfig<T>) : ModalRef<T> {
    const modalRef = new ModalRef(componentType);

    return this._show(modalRef, modalConfig, vcr);
  }

  public showTemplate<T>(template: TemplateRef<T>, templateCtx: unknown, vcr: ViewContainerRef, modalConfig: ModalConfig<T>) : ModalRef<T> {
    const modalRef = new ModalRef<T>(undefined, template, templateCtx);

    return this._show(modalRef, modalConfig, vcr);
  }

  private _show<T>(modalRef: ModalRef<T>, modalConfig: ModalConfig<T>, vcr: ViewContainerRef) : ModalRef<T> {
    const injector = Injector.create({ 
      providers: [{ 
          provide: ModalRef<T>, useValue: modalRef
        }, {
          provide: ModalConfig, useValue: modalConfig
      }]
    }),
    componentRef = vcr.createComponent(ModalComponent<T>, { injector: injector });

    modalRef.setModalComponentRef(componentRef);  
    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.show();

    return modalRef;
  }
}
