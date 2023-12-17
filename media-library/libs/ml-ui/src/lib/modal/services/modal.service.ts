import { Injectable, Injector, Optional, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalConfig } from '../models/ModalConfig.model';
import { ModalRef } from '../models/ModalRef.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppRootVcrService } from '@media-library/ml-utility';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(@Optional() private _vcrService: AppRootVcrService) {}
  
  public showComponent<T>(componentType: Type<T>, modalConfig: ModalConfig<T>, vcr?: ViewContainerRef) : ModalRef<T> {
    const modalRef = new ModalRef<T>(componentType);

    return this._show(modalRef, modalConfig, vcr);
  }

  public showTemplate<T>(template: TemplateRef<T>, templateCtx: unknown, modalConfig: ModalConfig<T>, vcr?: ViewContainerRef) : ModalRef<T> {
    const modalRef = new ModalRef<T>(undefined, template, templateCtx);

    return this._show(modalRef, modalConfig, vcr);
  }

  private _show<T>(modalRef: ModalRef<T>, modalConfig: ModalConfig<T>, vcr?: ViewContainerRef) : ModalRef<T> {
    const vcrToUse = vcr || this._vcrService.vcr;

    if (vcrToUse) {
      const injector = Injector.create({ 
        providers: [{ 
            provide: ModalRef<T>, useValue: modalRef
          }, {
            provide: ModalConfig, useValue: modalConfig
        }]
      }),
      componentRef = vcrToUse.createComponent(ModalComponent<T>, { injector: injector });

      modalRef.setModalComponentRef(componentRef);  
      componentRef.changeDetectorRef.detectChanges();
    } else {
      console.error('No valid ViewContainerRef provided. Apply AppRootVcrDirective or pass in a valid ViewContainerRef to ModalService.')
    }

    return modalRef;
  }

  public showLoadingModal() : ModalRef<FaIconComponent> {
    const modalRef = new ModalRef(FaIconComponent),
      config = new ModalConfig<FaIconComponent>();

    config.static = true;
    config.configureComponentInputs = (faIcon: FaIconComponent) : void => {
      faIcon.icon = faSpinner;
      faIcon.spin = true;
      faIcon.ngOnChanges({});
    };
    
    return this._show(modalRef, config);
  }
}
