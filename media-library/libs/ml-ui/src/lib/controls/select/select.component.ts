import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
  EventEmitter,
  forwardRef,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, noop, Observable, Subscription } from 'rxjs';
import { SelectOption } from './interfaces/SelectOption.interface';
import { SelectOptionComponent } from './select-option/select-option.component';

export type SelectValueComparer<T> = (obj1: T, obj2: T) => boolean;

@Component({
  selector: 'ml-select',
  templateUrl: './select.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent<T> implements AfterContentInit, ControlValueAccessor {
  /** The text that appears when no select options are present. */
  @Input() public placeholder?: string;
  /** A flag that allows multiple options to be selected. */
  /** TODO: @Input() */ public multiple = false;
  /** A list of all the SelectOptionComponent children  */
  @ContentChildren(SelectOptionComponent, {descendants: true}) 
  private _selectOptionComponents!: QueryList<SelectOptionComponent<T>>;
  /** An event that is triggered when the select value changes. */
  @Output() public selectedItemChange = new EventEmitter<SelectOption<T> | null>();

  /** A list of all the SelectOption children. */
  private _selectOptions: SelectOption<T>[] = [];
  /** A flag that is set to true in AfterContentInit after the option children are loaded. */
  private _initialized = false;
  /** Used to create an observable to control the dropdown visibility. */
  private _isDropdownOpen$ = new BehaviorSubject<boolean>(false);
  /** The internal values of the select. */
  private _values: T[] = [];
  /** An observable that is used to control the dropdown visibility. */
  protected isDropdownOpen$!: Observable<boolean>;
  /** An observable that emits the currently selected option. */
  private _selectedItem: SelectOption<T> | null = null;
  private _optionSubscriptions: Subscription[] = [];
  private _onChange: (_: T | T[] | null) => void = noop;
  private _onTouched: () => void = noop;
  private _valueComparerFn: SelectValueComparer<T> = (obj1: T, obj2: T) => obj1 === obj2;

  /** A public accessor for the internal value of the select. */
  public get value(): T | null {
    return !this.multiple && this.values.length > 0 ? this._values[0] : null;
  }

  /** A public setter for the internal value of the select. */
  public set value(obj: T | null) {
    this._values = obj !== null ? [obj] : [];
    this._onChange(obj);
  }

  /** A public accessor for the internal value of the select. */
  public get values(): T[] {
    return this._values;
  }

  /** A public setter for the internal value of the select. */
  public set values(obj: T[]) {
    if (obj.length !== this.values.length ||
      !this.values.every(value => obj.find(newValue => this.valueComparer(value, newValue)))) {
      this._values = obj;
      this._onChange(obj);
    }
  }

  /** A public accessor for the currently selected option. */
  public get selectedItem(): SelectOption<T> | null {
    return this._selectedItem;
  }

  /** 
   * A custom function used for comparing option values.
   * 
   * Default: (obj1, obj2) => obj1 === obj2
   */
  @Input() 
  public set valueComparer(fn: SelectValueComparer<T>) {
    if (typeof fn !== 'function') {
      throw Error('valueComparer is not a function.');
    }

    this._valueComparerFn = fn;
  }

  /** 
   * A custom function used for comparing option values.
   * 
   * Default: (obj1, obj2) => obj1 === obj2
   */
  public get valueComparer(): SelectValueComparer<T> {
    return this._valueComparerFn;
  }

  constructor(private _cd: ChangeDetectorRef) {
    this.isDropdownOpen$ = this._isDropdownOpen$.asObservable();
  }
  
  public ngAfterContentInit(): void {
    this._initialized = true; // options have been initialized
    this._selectOptionComponents.changes.subscribe(changes => {
      this._refreshItems(Array.from(changes));
    });
    this._refreshItems(Array.from(this._selectOptionComponents));
  }

  private _refreshItems(options: SelectOptionComponent<T>[]) : void {
    this._selectOptions = [];
    this._optionSubscriptions.forEach(subscription => subscription.unsubscribe());
    this._isDropdownOpen$.next(false);
    options.forEach(option => {
      const selectOption = option as SelectOption<T>;
      // add option to SelectOption array and subscribe to its click event
      this._selectOptions.push(selectOption);
      this._optionSubscriptions.push(
        option.optionClicked.subscribe((item: SelectOption<T>) => this._handleOptionClick(item))
      );
      // load initial value from the model after options are initialized
      if (this.value !== null && 
          this._valueComparerFn(selectOption.value, this.value) && !selectOption.selected) {
        this._select(selectOption);
      }
    });
  }

  private _handleOptionClick(option: SelectOption<T>) : void {
    this.writeValue([option.value]);
    this._select(option);
  }

  /** This method selects a given select option as selected an updates the select's value */
  private _select(option: SelectOption<T>): void {
    if (option) {
      if (!this.multiple) {
        if (!option.selected) {
          this._unselect(this.selectedItem);
          option.selected = true;
          this._selectedItem = option;
          this._cd.detectChanges();
        }
        this._isDropdownOpen$.next(false);
      }
    }
  }

  /** This method unselects a given select option as selected an updates the select's value */
  private _unselect(option: SelectOption<T> | null): void {
    if (option && option.selected) {
      if (!this.multiple) {
        option.selected = false;
        this._selectedItem = null;
        this._cd.detectChanges();
      }
    }
  }

  /** This method shows/hides the select dropdown */
  protected toggleDropdown(): void {
    this._isDropdownOpen$.next(!this._isDropdownOpen$.value);
  }

  public writeValue(obj: T[]): void {
    const values = obj,
      //.filter(value => this._selectOptions.find(option => this._valueComparerFn(option.value, value))),
      options = this._selectOptions.filter(option => values.find(value => this.valueComparer(option.value, value)));

    if (!this.multiple) {
      this.value = values.length > 0 ? values[0] : null;
    } else {
      this.values = values;
    }

    if (this._initialized) { 
      if (!this.multiple) {
        this.selectedItemChange.emit(options[0] || null);
        if (options.length > 0) {
          this._select(options[0]);
        }
      } else {
        options.filter(option => !option.selected).forEach(option => this._select(option));
      }
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
