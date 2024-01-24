import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SelectComponent } from '../select.component';
import { SelectOption, SelectOptionGroup } from '../interfaces/select-option.interface';

@Component({
  selector: 'ml-select-dropdown-content',
  templateUrl: './select-dropdown-content.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelectDropdownContentComponent {
  public groups: SelectOptionGroup[] | null = null;
  public options: SelectOption[] | null = null;

  constructor(private _select: SelectComponent) {
    this.groups = this._select.internalGroups;
    this.options = this._select.internalOptions;
  }
}
