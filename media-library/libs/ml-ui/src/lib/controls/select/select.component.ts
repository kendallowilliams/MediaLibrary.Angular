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
  AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, noop, Observable } from 'rxjs';
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
export class SelectComponent<T> implements AfterContentInit, ControlValueAccessor, AfterViewInit {
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
  /** The internal value of the select. */
  private _value: T | null = null;
  /** The internal values of the select. */
  private _values: T[] = [];
  /** An observable that is used to control the dropdown visibility. */
  protected isDropdownOpen$!: Observable<boolean>;
  /** An observable that emits the currently selected option. */
  protected selectedItem$ = new BehaviorSubject<SelectOption<T> | null>(null);
  private _onChange: (_: T | T[] | null) => void = noop;
  private _onTouched: () => void = noop;
  private _valueComparer: SelectValueComparer<T> = (obj1: T, obj2: T) => obj1 === obj2;

  /** A public accessor for the internal value of the select. */
  public get value(): T | null {
    return this._value;
  }

  /** A public setter for the internal value of the select. */
  public set value(obj: T | null) {
    this._value = obj;
    this._onChange(obj);
  }

  /** A public accessor for the internal value of the select. */
  public get values(): T[] {
    return this._values;
  }

  /** A public setter for the internal value of the select. */
  public set values(obj: T[]) {
    this._values = obj;
    this._onChange(obj);
  }

  /** A public accessor for the currently selected option. */
  public get selectedItem(): SelectOption<T> | null {
    return this.selectedItem$.getValue();
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

    this._valueComparer = fn;
  }

  /** 
   * A custom function used for comparing option values.
   * 
   * Default: (obj1, obj2) => obj1 === obj2
   */
  public get valueComparer(): SelectValueComparer<T> {
    return this._valueComparer;
  }

  constructor() {
    this.isDropdownOpen$ = this._isDropdownOpen$.asObservable();
  }
  
  public ngAfterContentInit(): void {
    this._initialized = true; // options have been initialized
  }

  public ngAfterViewInit(): void {
    this._selectOptionComponents.changes.subscribe(changes => {
      console.log(changes)
    });
    this._refreshItems();
  }

  private _refreshItems() : void {
    this._selectOptionComponents
      .forEach(component => {
        const selectOption = component as SelectOption<T>;
        // add option to SelectOption array and subscribe to its click event
        this._selectOptions.push(selectOption);
        component.optionClicked.subscribe((item: SelectOption<T>) => {
          this.writeValue(item.value);
          this._select(item);
      });
      // load initial value from the model after options are initialized
      if (this.value && this._valueComparer(selectOption.value, this.value)) {
        this._select(selectOption);
      }
    });
  }

  /** This method selects a given select option as selected an updates the select's value */
  private _select(option: SelectOption<T>): void {
    if (option) {
      if (!this.multiple) {
        if (!option.selected) {
          this._unselect(this.selectedItem);
          option.selected = true;
          this.selectedItem$.next(option);
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
        this.selectedItem$.next(null);
      }
    }
  }

  /** This method shows/hides the select dropdown */
  protected toggleDropdown(): void {
    this._isDropdownOpen$.next(!this._isDropdownOpen$.value);
  }

  public writeValue(obj: T | null): void {
    const option = this._selectOptions?.find((_option) => obj &&
      this._valueComparer(_option.value, obj));

    if (this.multiple) {
      this.value = obj;
    } else {
      //this.values = obj;
    }

    if (this._initialized) { 
      this.selectedItemChange.emit(option || null);
    }

    if (option && !option.selected) {
      this._select(option);
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
