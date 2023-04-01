import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';

@Component({
  selector: 'ml-loading',
  template: `<fa-icon *ngIf="faIcon" [icon]="faIcon" [classes]="['fa-spin']"></fa-icon>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService) {
    this.faIcon = this._faIconService.getIconDefinition('fas', 'spinner');;
  }
}
