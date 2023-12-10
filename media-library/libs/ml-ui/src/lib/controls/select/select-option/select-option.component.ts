import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
  OnInit,
  DestroyRef,
  TemplateRef,
  Optional
} from '@angular/core';
import { SelectOption } from '../interfaces/SelectOption.interface';
import { SelectComponent } from '../select.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectMultiSelectDirective } from '../directives/select-multiselect.directive';

@Component({
  selector: 'ml-select-option',
  templateUrl: './select-option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent implements OnInit {
  @HostBinding('class') private _class = `block`;
  @Input({ required: true }) public option!: SelectOption;

  public template: TemplateRef<unknown> | null = null;
  public multiSelectable = false;

  constructor(
    private _select: SelectComponent, 
    private _destroyRef: DestroyRef,
    @Optional() private _multiSelect: SelectMultiSelectDirective) {}
  
  public ngOnInit(): void {
    this.multiSelectable = !!this._multiSelect;
    this._select.valueChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: value => {
          this._handleValueChange(value);
        }
      });
  }

  private _handleValueChange(value: SelectOption['value'] | SelectOption['value'][] | null): void {
    if (this.multiSelectable) {
      const values = value as SelectOption['value'][] || null;
      if (!values || !values.includes(this.option.value)) {
        this.option.selected = false;
      } else if (!this.option.selected && values.includes(this.option.value)) {
        this.option.selected = true;
      }
    } else {
      if (!value || this.option.value !== value) {
        this.option.selected = false;
      } else if (!this.option.selected && this.option.value === value) {
        this.option.selected = true;
      }
    }
  }

  @HostListener('click')
  private _handleClick() : void {
    if (this.multiSelectable) {
      this.option.selected = !this.option.selected;
      if (this.option.selected) {
        this._select.addValue(this.option.value);
      } else {
        this._select.removeValue(this.option.value);
      }
    } else {
      if (!this.option.selected) {
        this.option.selected = true;
        this._select.writeValue(this.option.value);
      }
      this._select.closeDropdown();
    }
  }
}
