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
  private _defaultClasses = 'flex flex-col lg:flex-row lg:items-stretch h-full';
  @HostBinding('class') private _class = this._defaultClasses;
}
