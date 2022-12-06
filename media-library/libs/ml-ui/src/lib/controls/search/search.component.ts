import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
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
  
  @ViewChild('searchInput') private _input?: ElementRef;

  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService, private _cd: ChangeDetectorRef, private _router: Router) {
    this.faIcon = this._faIconService.getIconDefinition('fas', 'search');
  }

  protected search(query: string) : void {
    if (query) {
      this._router.navigate(['search', {query: query}]);
    }
  }
}
