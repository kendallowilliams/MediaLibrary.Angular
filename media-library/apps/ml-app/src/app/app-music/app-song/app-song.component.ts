import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Track } from '@media-library/ml-data';

@Component({
  selector: 'app-song',
  templateUrl: './app-song.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSongComponent {
  @Input() public track?: Track | null;
}
