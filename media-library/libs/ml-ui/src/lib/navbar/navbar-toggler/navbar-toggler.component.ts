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
import { Subscription } from 'rxjs';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'ml-navbar-toggler',
  templateUrl: './navbar-toggler.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarTogglerComponent implements OnInit {
  @HostBinding('class') private _class = 'block';

  private _subscription?: Subscription;
  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService, private _cd: ChangeDetectorRef, private _navbarService: NavbarService) {
  }

  public ngOnInit(): void {
    this._subscription = this._navbarService.getNavbarMenuOpen$().subscribe(() => this._setIcon());
  }

  @HostListener('click', ['$event'])
  private _handleClick(event: MouseEvent) : void {
    event.stopPropagation();
    this._navbarService.getNavbarMenuOpen$().next(!this._navbarService.getNavbarMenuOpen$().value);
  }

  private _setIcon() : void {
    if (this._navbarService.getNavbarMenuOpen$().value) {
      this.faIcon = this._faIconService.getIconDefinition('fas', 'times');
    } else {
      this.faIcon = this._faIconService.getIconDefinition('fas', 'bars');
    }
  }
}

