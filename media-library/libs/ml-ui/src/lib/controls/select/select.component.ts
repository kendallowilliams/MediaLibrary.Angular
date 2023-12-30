import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  HostBinding,
  ElementRef,
  OnInit,
  DestroyRef,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, noop, fromEvent } from 'rxjs';
import { SelectOption } from './interfaces/SelectOption.interface';
import { faCaretDown, faCaretUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type SelectValueType = SelectOption['value'] | SelectOption['value'][];

@Component({
  selector: 'ml-select',
  templateUrl: './select.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @HostBinding('class') private _class = 'inline-flex cursor-pointer group/select w-full outline-none rounded-[5px]';
  /** The text that appears when no select options are present. */
  @Input() public placeholder = '';
  @Input() public options: SelectOption[] | null = null;
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  public isDropdownOpen = false;

  @HostBinding('attr.role') private _role = 'combobox';
  @HostBinding('attr.aria-expanded') private _ariaExpanded = false;

  /** The internal values of the select. */
  private _value: SelectValueType | null = null;
  private _onChange: (_: SelectValueType | null) => void = noop;
  private _onTouched: () => void = noop;
  public valueChange = new BehaviorSubject<SelectValueType | null>(null);
  public selectLabel?: string;
  public faCaretUp = faCaretUp;
  public faCaretDown = faCaretDown;
  public faTimesCircle = faTimesCircle;

  constructor(private _host: ElementRef<HTMLElement>, private _destroyRef: DestroyRef, private _cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    fromEvent(this._host.nativeElement, 'blur')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.closeDropdown());
  }

  /** A public accessor for the internal value of the select. */
  public get value(): SelectValueType | null {
    return this._value;
  }

  /** A public setter for the internal value of the select. */
  public set value(obj: SelectValueType | null) {
    this._value = obj;
    this._onChange(obj);
    this.updateSelectLabel();
  }

  public toggleDropdown(): void {
    if (this.isDropdownOpen) {
      this._host.nativeElement.blur();
    } else {
      this.isDropdownOpen = true;
      this._ariaExpanded = true;
    }
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
    this._ariaExpanded = false;
    this._cd.detectChanges();
  }

  public writeValue(value: SelectValueType | null): void {
    if (value !== null && value !== undefined) {
      if (this._value !== value) {
        this.value = value;
        this.valueChange.next(value);
      }
    } else {
      this._clearSelectedValue();
    }
  }

  public addValue(value: SelectOption['value'] | null): void {
    let values = this._value as SelectOption['value'][] || [];

    if (value !== null && value !== undefined) {
      if (!values?.includes(value)) {
        values = values.concat(value);
        this.writeValue(values);
      }

      if (!values || values.length === 0) {
        this._clearSelectedValue();
      }
    }
  }

  public removeValue(value: SelectOption['value'] | null): void {
    let values = this._value as SelectOption['value'][] || [];

    if (value !== null && value !== undefined) {
      if (values?.includes(value)) {
        values = values.filter(v => value !== v);
        this.writeValue(values);
      }

      if (!values || values.length === 0) {
        this._clearSelectedValue();
      }
    }
  }

  public updateSelectLabel() : void {
    if (this.value !== null && this.value !== undefined) {
      if (Array.isArray(this.value)) {
        const values = this.value as SelectOption['value'][];

        this.selectLabel = this.options?.filter(o => values.includes(o.value))
          .map(o => o.text)
          .sort()
          .join(', ');
      }
      else {
        this.selectLabel = this.options?.find(o => o.value === this.value)?.text;
      }
    } else {
      this.selectLabel = undefined;
    }
  }

  public clearSelection(evt: Event) : void {
    evt.stopPropagation();
    this._clearSelectedValue();
  }

  private _clearSelectedValue() : void {
    this.selectLabel = undefined;
    this.value = null;
    this.valueChange.next(null);
  }

  public registerOnChange(fn: never): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: never): void {
    this._onTouched = fn;
  }

  /** TODO: implement, if needed. */
  /** public setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  } */
}
