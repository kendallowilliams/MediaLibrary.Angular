import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMenuComponent {
  private _defaultClasses = `hidden data-[menu-open=true]:block relative float-right 
    h-[calc(100vh-theme(height.navbar)-theme(height.footer))] bg-light text-dark
    dark:text-light dark:bg-dark sm:w-[100%] md:w-[50%]`;
  @HostBinding('class') private _class = this._defaultClasses;
}
