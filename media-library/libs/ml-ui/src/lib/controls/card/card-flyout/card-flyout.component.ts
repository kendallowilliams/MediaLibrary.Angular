import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-card-flyout',
  templateUrl: './card-flyout.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFlyoutComponent {
  private _defaultClasses = '';
  @HostBinding('class') private _class = this._defaultClasses;
}
