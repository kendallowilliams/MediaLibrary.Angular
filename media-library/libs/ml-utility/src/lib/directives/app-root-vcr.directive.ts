import { Directive, ViewContainerRef } from '@angular/core';
import { AppRootVcrService } from '../services/app-root-vcr.service';

@Directive({
  selector: '[mlAppRootVcr]',
  standalone: true
})
export class AppRootVcrDirective {
  constructor(private _vcrService: AppRootVcrService, private _vcr: ViewContainerRef) {
    this._vcrService.vcr = this._vcr;
  }
}
