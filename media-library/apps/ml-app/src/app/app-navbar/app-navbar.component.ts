import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService, NavbarMenuService, NavbarService } from '@media-library/ml-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html'
})
export class AppNavbarComponent implements OnInit {
  protected isMobile = false;
  protected navHidden$?: Observable<boolean>;

  constructor(private _navbarService: NavbarService, private _deviceService: DeviceService, private _router: Router,
    private _cd: ChangeDetectorRef, private _navbarMenuService: NavbarMenuService) {
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
    this._navbarMenuService.getMenuOpen$().next(false);
    this._cd.detectChanges();
  }
}
