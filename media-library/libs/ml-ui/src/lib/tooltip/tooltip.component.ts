import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

type Placement = 'top' | 'left' | 'right' | 'bottom';

@Component({
  selector: 'ml-tooltip',
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  @Input() public placement: Placement | null = null;

  @HostBinding('class') private _class = 'relative';
}
