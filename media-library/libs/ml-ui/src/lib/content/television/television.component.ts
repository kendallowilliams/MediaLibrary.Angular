import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TelevisionService } from '@media-library/ml-data';

@Component({
  selector: 'ml-television',
  templateUrl: './television.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelevisionComponent {
  constructor(private _televisionService: TelevisionService) {}
}
