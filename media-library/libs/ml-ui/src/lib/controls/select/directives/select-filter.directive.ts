import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectComponent } from '../select.component';
import { strMatch } from '@media-library/ml-utility';

@Directive({
  selector: '[mlSelectFilter]'
})
export class SelectFilterDirective implements OnInit, OnChanges {
  @Input() public query: string | null = null;
  @Input() public caseInsensitive = false;
  @Input() public partial = false;

  constructor(private _select: SelectComponent) {}
  
  public ngOnInit(): void {
    this._applyFilter(this.query);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('query' in changes) {
      this._applyFilter(this.query);
    }
  }

  private _applyFilter(query: string | null) : void {
    this._select.options?.forEach(o => {
      o.hidden = !!query && !strMatch(o.text, query, this.caseInsensitive, this.partial);
    });
  }
}
