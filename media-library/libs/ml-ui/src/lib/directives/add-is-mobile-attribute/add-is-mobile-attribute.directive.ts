import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DeviceService } from '@media-library/ml-utility';

@Directive({
  selector: '[mlAddIsMobileAttribute]'
})
export class AddIsMobileAttributeDirective implements OnInit {

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2, private _deviceService: DeviceService) { }

  public ngOnInit(): void {
    this._renderer.setAttribute(this._host.nativeElement, 'data-is-mobile', this._deviceService.isMobile().toString());
  }
}
