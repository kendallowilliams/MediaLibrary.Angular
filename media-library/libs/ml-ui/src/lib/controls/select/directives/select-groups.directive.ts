import { Directive, Input, OnInit } from "@angular/core";
import { SelectComponent } from "../select.component";
import { SelectOptionGroup } from "../types/select.types";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ml-select[groups]'
})
export class SelectOptionGroupsDirective implements OnInit {
  @Input() public groups: SelectOptionGroup[] = [];

  constructor(private _select: SelectComponent) {}
  
  public ngOnInit(): void {
    this._select.internalGroups = this.groups;
    this._select.updateSelectLabel();
  }
}