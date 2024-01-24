import { Directive, Input, OnInit } from "@angular/core";
import { SelectComponent } from "../select.component";
import { SelectOption } from "../interfaces/select-option.interface";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ml-select[options]'
})
export class SelectOptionsDirective implements OnInit {
  @Input() public options: SelectOption[] = [];

  constructor(private _select: SelectComponent) {}
  
  public ngOnInit(): void {
    this._select.internalOptions = this.options;
  }
}