import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { DeviceService } from '../../../services/device/device.service';

@Component({
  selector: 'ml-navbar-icon',
  templateUrl: './navbar-icon.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarIconComponent implements OnInit {
  private _defaultClasses = 'data-[is-mobile=false]:hover:text-info data-[is-mobile=false]:dark:hover:text-info cursor-pointer';
  @HostBinding('class') private _class = this._defaultClasses;

  constructor(private _deviceService: DeviceService, private _renderer: Renderer2,
    private _host: ElementRef) {
  }

  public ngOnInit(): void {
    const isMobile = !this._deviceService.hasMouse();

    this._renderer.setAttribute(this._host.nativeElement, 'data-is-mobile', isMobile.toString());
  }
}
