import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-navbar-nav',
  templateUrl: './navbar-nav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarNavComponent {
  private _defaultClasses = 'flex flex-col lg:flex-row lg:items-stretch lg:h-full px-[20px]';
  @HostBinding('class') private _class = this._defaultClasses;
}
