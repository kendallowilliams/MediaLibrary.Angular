import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  ChangeDetectorRef,
  HostBinding,
  OnInit
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';
import { NavbarMenuService } from '../services/navbar-menu.service';

@Component({
  selector: 'ml-navbar-toggler',
  templateUrl: './navbar-toggler.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarTogglerComponent implements OnInit {
  @HostBinding('class') private _class = 'block';

  private _menuOpen = false;
  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService, private _cd: ChangeDetectorRef, private _navbarMenuService: NavbarMenuService) {
  }

  public ngOnInit(): void {
    this._navbarMenuService.getMenuOpen$().subscribe(menuOpen => {
      this._menuOpen = menuOpen;
      this._setIcon();
    });
    this._navbarMenuService.getMenuOpen$().next(false);
  }

  @HostListener('click', ['$event'])
  private _handleClick(event: MouseEvent) : void {
    event.stopPropagation();
    this._navbarMenuService.getMenuOpen$().next(!this._menuOpen);
  }

  private _setIcon() : void {
    if (this._menuOpen) {
      this.faIcon = this._faIconService.getIconDefinition('fas', 'times');
    } else {
      this.faIcon = this._faIconService.getIconDefinition('fas', 'bars');
    }
  }
}

