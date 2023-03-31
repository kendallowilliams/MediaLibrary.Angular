import { Injectable, Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalConfig } from '../models/ModalConfig.model';
import { ModalRef } from '../models/ModalRef.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public showComponent<T>(componentType: Type<T>, vcr: ViewContainerRef, modalConfig: ModalConfig) : ModalRef<T> {
    const modalRef = new ModalRef(componentType);
    const injector = Injector.create({ 
      providers: [{ 
          provide: ModalRef<T>, useValue: modalRef
        }, {
          provide: ModalConfig, useValue: modalConfig
      }]
    }),
    componentRef = vcr.createComponent(ModalComponent<T>, { injector: injector });

    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.showModal();

    return modalRef;
  }

  public showTemplate<T>(template: TemplateRef<T>, templateCtx: unknown, vcr: ViewContainerRef, modalConfig: ModalConfig) : ModalRef<T> {
    const modalRef = new ModalRef<T>(undefined, template, templateCtx);
    const injector = Injector.create({ 
      providers: [{ 
          provide: ModalRef<T>, useValue: modalRef
        }, {
          provide: ModalConfig, useValue: modalConfig
      }]
    }),
    componentRef = vcr.createComponent(ModalComponent<T>, { injector: injector });

    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.showModal();

    return modalRef;
  }
}
