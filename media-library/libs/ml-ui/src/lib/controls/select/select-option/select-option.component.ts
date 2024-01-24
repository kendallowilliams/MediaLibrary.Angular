import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { SelectOption } from '../interfaces/select-option.interface';
import { SelectMultiSelectDirective } from '../directives/select-multiselect.directive';

@Component({
  selector: 'ml-select-option',
  templateUrl: './select-option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelectOptionComponent {
  @Input({ required: true }) public option!: SelectOption;

  @HostBinding('class') private _class = 'inline-flex w-full pointer-events-none';

  public isMultiSelectable = false;

  constructor(@Optional() private _multiselect: SelectMultiSelectDirective) {
    this.isMultiSelectable = !!this._multiselect;
  }
}
