import { Directive, Input } from '@angular/core';
import { SelectComponent } from '../select.component';
import { strMatch } from '@media-library/ml-utility';
import { SelectSearchComponent } from '../select-search/select-search.component';

@Directive({
  selector: '[mlSelectSearch]'
})
export class SelectSearchDirective {
  @Input() public caseInsensitive = true;
  @Input() public partial = true;
  @Input() public searchPlaceholder = '';

  private _search: SelectSearchComponent | null = null;

  constructor(private _select: SelectComponent) {}

  public setSearch(search: SelectSearchComponent) : void {
    this._showAll();
    this._search = search;
    this._search.queryChange
      .subscribe(query => {
        this._applyFilter(query);
      });
  }

  private _applyFilter(query: string | null) : void {
    this._select.getOptions().forEach(o => {
      o.hidden = !!query && !strMatch(o.text, query, this.caseInsensitive, this.partial);
    });
    this._select.internalGroups?.forEach(group => group.hidden = !group.options.some(option => !option.hidden));
  }

  private _showAll() : void {
    this._select.getOptions().forEach(option => option.hidden = false);
    this._select.internalGroups?.forEach(group => group.hidden = false);
  }
}
