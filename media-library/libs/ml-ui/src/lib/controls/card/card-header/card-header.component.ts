import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-card-header',
  templateUrl: './card-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  private _defaultClasses = 'flex flex-col';
  @HostBinding('class') private _class = this._defaultClasses;
}


