import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-song',
  templateUrl: './app-song.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSongComponent {
  @Input() public trackId?: number;

  public faHeadphones = faHeadphones;
}
