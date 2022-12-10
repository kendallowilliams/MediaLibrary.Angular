import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @HostBinding('class') private _class = 'block';
}
