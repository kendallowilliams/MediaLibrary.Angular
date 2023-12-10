import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
  EventEmitter,
  OnInit,
  DestroyRef
} from '@angular/core';
import { SelectOption } from '../interfaces/SelectOption.interface';
import { SelectComponent } from '../select.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ml-select-option',
  templateUrl: './select-option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent<T> implements OnInit {
  @HostBinding('class') private _class = `block`;
  @Input({ required: true }) public option!: SelectOption<T>;

  public optionClicked = new EventEmitter<SelectOption<T>>();

  constructor(private _select: SelectComponent<T>, private _destroyRef: DestroyRef) {}
  
  public ngOnInit(): void {
    this._handleValueChange(this._select.value);
    this._select.valueChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: value => {
          this._handleValueChange(value);
        }
      });
  }

  private _handleValueChange(value: T | null): void {
    if (!value || this.option.value !== value) {
      this.option.selected = false;
    } else if (!this.option.selected && this.option.value === value) {
      this.option.selected = true;
    }
  }

  @HostListener('click')
  private _handleClick() : void {
    if (!this.option.selected) {
      this.option.selected = true;
      this._select.writeValue(this.option.value);
    }

    this._select.closeDropdown();
    this.optionClicked.next(this.option);
  }
}
