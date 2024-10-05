import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-card',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  private _defaultClasses = `flex flex-col shadow rounded-[5px] bg-light`;
  @HostBinding('class') private _class = this._defaultClasses;
}
