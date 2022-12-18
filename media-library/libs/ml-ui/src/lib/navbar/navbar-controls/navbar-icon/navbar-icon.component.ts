import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';
import { DeviceService } from '../../../services/device/device.service';
import { FaIconService } from '../../../services/fa-icon/fa-icon.service';

@Component({
  selector: 'ml-navbar-icon',
  templateUrl: './navbar-icon.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarIconComponent implements OnInit {
  private _defaultClasses = 'data-[is-mobile=false]:hover:text-info data-[is-mobile=false]:dark:hover:text-info cursor-pointer';
  @HostBinding('class') private _class = this._defaultClasses;

  @Input() public iconName?: IconName;

  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService, private _deviceService: DeviceService, private _renderer: Renderer2,
    private _host: ElementRef) {
  }

  public ngOnInit(): void {
    const isMobile = !this._deviceService.hasMouse();

    if (this.iconName) {
      this.faIcon = this._faIconService.getIconDefinition('fas', this.iconName) || undefined;
    }

    this._renderer.setAttribute(this._host.nativeElement, 'data-is-mobile', isMobile.toString());
  }
}
