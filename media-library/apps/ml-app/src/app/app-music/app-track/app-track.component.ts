import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Track } from '@media-library/ml-data';

@Component({
  selector: 'app-song',
  templateUrl: './app-track.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTrackComponent {
  @Input() public track?: Track | null;
}
