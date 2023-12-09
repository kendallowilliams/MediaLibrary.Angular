import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { DeviceService, NavbarService } from '@media-library/ml-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent implements OnInit {
  protected isMobile = false;
  protected navHidden$?: Observable<boolean>;

  public faGear = faGear

  constructor(private _navbarService: NavbarService, private _deviceService: DeviceService, private _router: Router) {
    this.isMobile = this._deviceService.isMobile();
  }

  public ngOnInit(): void {
    this.navHidden$ = this._navbarService.getNavbarNavHidden$().asObservable();
  }

  protected handleSearch(query: string) : void {
    this._router.navigate(['search', { query: query }]);
  }

  protected handleNavHidden(isHidden: boolean) : void {
    this._navbarService.getNavbarNavHidden$().next(isHidden);
    this._navbarService.getNavbarMenuOpen$().next(false);
  }
}
