import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  HostBinding,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop, Subject } from 'rxjs';
import { SelectOption } from './interfaces/SelectOption.interface';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

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
export class SelectComponent<T> implements ControlValueAccessor, OnChanges {
  @HostBinding('class') private _class = 'relative h-fit w-full';
  /** The text that appears when no select options are present. */
  @Input() public placeholder = '';
  @Input() public options: SelectOption<T>[] | null = null;

  /** The internal values of the select. */
  private _value: T | null = null;
  /** An observable that is used to control the dropdown visibility. */
  public isDropdownOpen = false;
  private _onChange: (_: T | T[] | null) => void = noop;
  private _onTouched: () => void = noop;
  public valueChange = new Subject<T | null>();
  public selectLabel = '';
  public faCaretUp = faCaretUp;
  public faCaretDown = faCaretDown;

  /** A public accessor for the internal value of the select. */
  public get value(): T | null {
    return this._value;
  }

  /** A public setter for the internal value of the select. */
  public set value(obj: T | null) {
    this._value = obj;
    this._onChange(obj);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      // TODO: fix
    }
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  public writeValue(value: T | null): void {
    if (value) {
      if (this._value !== value) {
        this.value = value;
        this.valueChange.next(value);
      }
    } else {
      this.value = null;
      this.valueChange.next(null);
    }

    this._setSelectLabel();
  }

  private _setSelectLabel() : void {
    if (this.value) {
      this.selectLabel = this.options?.find(option => option.value === this.value)?.text || '';
    } else {
      this.selectLabel = '';
    }
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
