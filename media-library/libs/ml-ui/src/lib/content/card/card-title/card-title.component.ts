import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-card-title',
  templateUrl: './card-title.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {
  private _defaultClasses = 'font-bold';
  @HostBinding('class') private _class = this._defaultClasses;
}
