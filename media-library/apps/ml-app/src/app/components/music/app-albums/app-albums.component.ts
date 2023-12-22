import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Album, MlDataFeatureState } from '@media-library/ml-data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-albums',
  templateUrl: './app-albums.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAlbumsComponent {
  @Input() public albums: Album[] = [];
  
  constructor(private _store: Store<MlDataFeatureState>) {}
}
