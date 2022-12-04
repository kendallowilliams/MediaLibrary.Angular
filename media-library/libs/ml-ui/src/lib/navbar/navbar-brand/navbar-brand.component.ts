import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-navbar-brand',
  templateUrl: './navbar-brand.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarBrandComponent {
  @HostBinding('class') private _class = 'flex items-center';
}
