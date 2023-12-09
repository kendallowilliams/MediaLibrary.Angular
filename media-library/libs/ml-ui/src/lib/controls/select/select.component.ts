import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  ViewChild,
  TemplateRef,
  HostBinding,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop, Subject } from 'rxjs';
import { SelectOption } from './interfaces/SelectOption.interface';
import { DropdownDirective } from '../dropdown/dropdown.directive';

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
export class SelectComponent<T> implements ControlValueAccessor {
  @HostBinding('class') private _class = 'h-fit w-full';
  /** The text that appears when no select options are present. */
  @Input() public placeholder?: string;

  @ViewChild(DropdownDirective, { read: TemplateRef<unknown> }) private _dropDownTemplate!: TemplateRef<unknown>;
  /** The internal values of the select. */
  private _value: T | null = null;
  /** An observable that is used to control the dropdown visibility. */
  public isDropdownOpen = false;
  /** An observable that emits the currently selected option. */
  private _selectedItem: SelectOption<T> | null = null;
  private _onChange: (_: T | T[] | null) => void = noop;
  private _onTouched: () => void = noop;
  public valueChange = new Subject<T | null>();
  public selectLabel = '';

  /** A public accessor for the internal value of the select. */
  public get value(): T | null {
    return this._value;
  }

  /** A public setter for the internal value of the select. */
  public set value(obj: T | null) {
    this._value = obj;
    this._onChange(obj);
  }

  /** This method selects a given select option as selected */
  public select(option: SelectOption<T>): void {
    this.selectLabel = option.text;
    this._selectedItem = option;

    this.isDropdownOpen = false;;
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  public writeValue(obj: T | null): void {
    if (obj) {
      if (this._value !== obj) {
        this.value = obj;
        this.valueChange.next(obj);
      }
    } else {
      this.value = null;
      this._selectedItem = null;
      this.valueChange.next(null);
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
