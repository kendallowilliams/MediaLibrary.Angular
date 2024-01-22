import { Directive, Input } from '@angular/core';
import { SelectComponent } from '../select.component';
import { strMatch } from '@media-library/ml-utility';

@Directive({
  selector: '[mlSelectSearch]'
})
export class SelectSearchDirective {
  @Input() public caseInsensitive = true;
  @Input() public partial = true;
  @Input() public searchPlaceholder = '';

  constructor(private _select: SelectComponent) {}

  private _applyFilter(query: string | null) : void {
    this._select.options?.forEach(o => {
      o.hidden = !!query && !strMatch(o.text, query, this.caseInsensitive, this.partial);
    });
  }
}
