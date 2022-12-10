import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-navbar-controls',
  templateUrl: './navbar-controls.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarControlsComponent {
  private _defaultClasses = 'flex items-center h-full gap-[20px]';
  @HostBinding('class') private _class = this._defaultClasses;
}

