import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { NavbarService } from '@media-library/ml-ui';

@Component({
  selector: 'ml-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private _defaultClasses = 'block h-navbar bg-light dark:bg-dark text-dark dark:text-light shadow relative';
  @HostBinding('class') private _class = this._defaultClasses;

  constructor(private _host: ElementRef, private _renderer: Renderer2, private _navbarService: NavbarService) {
  }
}
