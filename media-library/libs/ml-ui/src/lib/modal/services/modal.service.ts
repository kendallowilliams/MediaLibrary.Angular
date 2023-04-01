import { Injectable, Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalConfig } from '../models/ModalConfig.model';
import { ModalRef } from '../models/ModalRef.model';
import { LoadingComponent } from '../../controls/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public showComponent<T>(componentType: Type<T>, vcr: ViewContainerRef, modalConfig: ModalConfig<T>) : ModalRef<T> {
    const modalRef = new ModalRef<T>(componentType);

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

    return modalRef;
  }

  public showLoadingModal(vcr: ViewContainerRef) : ModalRef<LoadingComponent> {
    const modalRef = new ModalRef(LoadingComponent);

    return this._show(modalRef, new ModalConfig<LoadingComponent>(), vcr);
  }
}
