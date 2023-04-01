import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-card-header',
  template: `
    <ng-content select="ml-card-title"></ng-content>
    <ng-content select="ml-card-subtitle"></ng-content>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  private _defaultClasses = 'flex items-center h-[50px] px-[30px] shadow';
  @HostBinding('class') private _class = this._defaultClasses;
}


