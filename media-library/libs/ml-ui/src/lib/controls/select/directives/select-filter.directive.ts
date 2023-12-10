import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectComponent } from '../select.component';

@Directive({
  selector: '[mlSelectFilter]'
})
export class SelectFilterDirective implements OnInit, OnChanges {
  @Input() public query: string | null = null;

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
      o.hidden = !query || o.text !== query;
    });
  }
}