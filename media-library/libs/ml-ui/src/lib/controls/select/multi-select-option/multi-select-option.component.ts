import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { SelectOption } from '../interfaces/SelectOption.interface';

@Component({
  selector: 'ml-multi-select-option',
  templateUrl: './multi-select-option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MultiSelectOptionComponent {
  @Input({ required: true }) public option!: SelectOption;

  @HostBinding('class') private _class = 'inline-flex w-full pointer-events-none';
}
