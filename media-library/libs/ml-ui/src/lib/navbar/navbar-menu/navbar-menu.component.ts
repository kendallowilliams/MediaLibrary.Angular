import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarMenuService } from '../services/navbar-menu.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'ml-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMenuComponent implements OnInit, OnDestroy {
  private _defaultClasses = `flex flex-col hidden data-[menu-open=true]:block absolute right-0
    h-[calc(100vh-theme(height.navbar)-theme(height.footer))] bg-light text-dark
    dark:text-light dark:bg-dark w-[auto]
    top-[theme(height.navbar)] z-[1000]`;
  @HostBinding('class') private _class = this._defaultClasses;

  private _subscription?: Subscription;

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2, private _navbarMenuService: NavbarMenuService,
    private _navbarService: NavbarService) {}

  public ngOnInit() : void {
    this._subscription = this._navbarService.getNavbarMenuOpen$().subscribe(menuOpen => {
      this._renderer.setAttribute(this._host.nativeElement, 'data-menu-open', menuOpen.toString());
    });
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
