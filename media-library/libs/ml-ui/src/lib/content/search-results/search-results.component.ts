import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ml-search-results',
  templateUrl: './search-results.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  private _query?: string;

  constructor(private _route: ActivatedRoute) {
  }
}
