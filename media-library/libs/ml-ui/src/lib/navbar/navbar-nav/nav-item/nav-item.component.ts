import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-nav-item',
  templateUrl: './nav-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  private _defaultClasses = `flex items-center hover:bg-dark hover:text-light 
    dark:hover:bg-light dark:hover:text-dark lg:px-[10px]`;
  @HostBinding('class') private _class = this._defaultClasses;
}
