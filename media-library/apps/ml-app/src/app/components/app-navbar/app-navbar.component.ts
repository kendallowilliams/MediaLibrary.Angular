import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from '@media-library/ml-ui';
import { DeviceService } from '@media-library/ml-utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent implements OnInit {
  public isMobile = false;
  public navHidden$?: Observable<boolean>;

  public faGear = faGear

  constructor(private _navbarService: NavbarService, private _deviceService: DeviceService, private _router: Router) {
    this.isMobile = this._deviceService.isMobile();
  }

  public ngOnInit(): void {
    this.navHidden$ = this._navbarService.getNavbarNavHidden$().asObservable();
  }

  public handleSearch(query: string) : void {
    this._router.navigate(['search', { query: query }]);
  }

  public handleNavHidden(isHidden: boolean) : void {
    this._navbarService.getNavbarNavHidden$().next(isHidden);
    this._navbarService.getNavbarMenuOpen$().next(false);
  }
}
