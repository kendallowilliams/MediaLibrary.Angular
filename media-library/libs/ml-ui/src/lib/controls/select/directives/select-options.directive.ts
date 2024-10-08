import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import { SelectComponent } from "../select.component";
import { SelectOption } from "../types/select.types";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ml-select[options]'
})
export class SelectOptionsDirective implements OnChanges {
  @Input() public options: SelectOption[] = [];

  constructor(private _select: SelectComponent) {}
  
  public ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this._select.internalOptions = this.options;
      this._select.updateSelectLabel();
    }
  }
}