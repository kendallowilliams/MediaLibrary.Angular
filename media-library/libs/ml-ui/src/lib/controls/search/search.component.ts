import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';

@Component({
  selector: 'ml-search',
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private _defaultClasses = 'flex items-center gap-[10px] group/search bg-light text-dark dark:bg-dark dark:text-light';
  @HostBinding('class') private _class = this._defaultClasses;
  
  @Input() protected query?: string;

  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService) {
    this.faIcon = this._faIconService.getIconDefinition('fas', 'search');
  }
}
