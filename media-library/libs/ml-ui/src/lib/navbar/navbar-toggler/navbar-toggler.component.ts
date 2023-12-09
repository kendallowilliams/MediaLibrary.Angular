import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'ml-navbar-toggler',
  templateUrl: './navbar-toggler.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarTogglerComponent {
  @HostBinding('class') private _class = 'block';

  constructor(private _navbarService: NavbarService) {
  }
  @HostListener('click', ['$event'])
  private _handleClick(event: MouseEvent) : void {
    event.stopPropagation();
    this._navbarService.getNavbarMenuOpen$().next(!this._navbarService.getNavbarMenuOpen$().value);
  }
}

