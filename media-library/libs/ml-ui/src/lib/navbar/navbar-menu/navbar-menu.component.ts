import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { NavbarMenuService } from '../services/navbar-menu.service';

@Component({
  selector: 'ml-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMenuComponent implements OnInit {
  private _defaultClasses = `flex flex-col hidden data-[menu-open=true]:block absolute right-0
    h-[calc(100vh-theme(height.navbar)-theme(height.footer))] bg-light text-dark
    dark:text-light dark:bg-dark w-[auto]
    top-[theme(height.navbar)] z-[1000]`;
  @HostBinding('class') private _class = this._defaultClasses;

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2, private _navbarMenuService: NavbarMenuService) {}

  public ngOnInit() : void {
    this._navbarMenuService.getMenuOpen$().subscribe(menuOpen => {
      this._renderer.setAttribute(this._host.nativeElement, 'data-menu-open', menuOpen.toString());
    });
  }
}
