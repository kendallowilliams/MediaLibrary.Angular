import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-card-subtitle',
  templateUrl: './card-subtitle.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSubtitleComponent {
  @HostBinding('class') private _class = 'text-secondary';
}
