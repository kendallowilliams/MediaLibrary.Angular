import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  Optional,
  Renderer2,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'ml-navbar-nav',
  templateUrl: './navbar-nav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarNavComponent implements OnInit {
  private _defaultClasses = `flex data-[in-menu=false]:flex-row
    data-[in-menu=true]:flex-col data-[in-menu=false]:h-full`;
  @HostBinding('class') private _class = this._defaultClasses;

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2, @SkipSelf() @Optional() private _navbarMenu?: NavbarMenuComponent) {}

  public ngOnInit() : void {
    const menuFound = !!this._navbarMenu;
    
    this._renderer.setAttribute(this._host.nativeElement, 'data-in-menu', menuFound.toString());
  }
}
