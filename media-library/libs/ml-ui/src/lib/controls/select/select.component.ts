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
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, noop, Observable } from 'rxjs';
import { SelectOption } from './interfaces/SelectOption.interface';
import { SelectOptionComponent } from './select-option/select-option.component';

export type SelectValueComparer = (obj1: any, obj2: any) => boolean;

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
export class SelectComponent implements AfterContentInit, ControlValueAccessor {
  /** The text that appears when no select options are present. */
  @Input() public placeholder?: string;
  /** A flag that allows multiple options to be selected. */
  /** TODO: @Input() */ public multiple = false;
  /** A list of all the SelectOptionComponent children  */
  @ContentChildren(SelectOptionComponent, {descendants: true}) 
  private _selectOptionComponents!: QueryList<SelectOptionComponent>;
  /** An event that is triggered when the select value changes. */
  @Output() public selectionChange = new EventEmitter<any | any[]>();

  /** A list of all the SelectOption children. */
  private _selectOptions: SelectOption[] = [];
  /** A flag that is set to true in AfterContentInit after the option children are loaded. */
  private _initialized = false;
  /** Used to create an observable to control the dropdown visibility. */
  private _isDropdownOpen$ = new BehaviorSubject<boolean>(false);
  /** The internal value of the select. */
  private _value: any | any[];
  /** An observable that is used to control the dropdown visibility. */
  protected isDropdownOpen$!: Observable<boolean>;
  /** An observable that emits the currently selected option. */
  protected selectedOption$ = new BehaviorSubject<SelectOption | undefined>(undefined);
  private _onChange: (_: any) => void = noop;
  private _onTouched: () => void = noop;
  private _valueComparer: SelectValueComparer = (obj1, obj2) => obj1 === obj2;

  /** A public accessor for the internal value of the select. */
  public get value(): any | any[] {
    return this._value;
  }

  /** A public accessor for the currently selected option. */
  public get selectedOption(): SelectOption | undefined {
    return this.selectedOption$.getValue();
  }

  /** 
   * A custom function used for comparing option values.
   * 
   * Default: (obj1, obj2) => obj1 === obj2
   */
  @Input() 
  public set valueComparer(fn: SelectValueComparer) {
    if (fn && typeof fn !== 'function') {
      throw Error('valueComparer is not a function.');
    }

    this._valueComparer = fn;
  }

  /** 
   * A custom function used for comparing option values.
   * 
   * Default: (obj1, obj2) => obj1 === obj2
   */
  public get valueComparer(): SelectValueComparer {
    return this._valueComparer;
  }

  constructor() {
    this.isDropdownOpen$ = this._isDropdownOpen$.asObservable();
  }
  
  public ngAfterContentInit(): void {
    this._selectOptionComponents
      .forEach(optionComponent => {
        const selectOption = optionComponent as SelectOption;
        // add option to SelectOption array and subscribe to its click event
        this._selectOptions.push(selectOption);
        optionComponent.optionClicked.subscribe(clickedOption => {
          this._select(clickedOption);
      });
      // load initial value from the model after options are initialized
      if (this._valueComparer(selectOption.value, this.value)) {
        this.writeValue(selectOption.value);
      }
    });
    this._initialized = true; // options have been initialized
  }

  /** This method selects a given select option as selected an updates the select's value */
  private _select(option: SelectOption): void {
    if (!this.multiple) {
      this._unselect(this.selectedOption);
      this.writeValue(option.value);
      this._onChange(this.value);
      this._isDropdownOpen$.next(false);
    }
  }

  /** This method unselects a given select option as selected an updates the select's value */
  private _unselect(option: SelectOption | undefined): void {
    if (!this.multiple) {
      if (option && option.selected) {
        option.selected = false;
        if (this.value) {
          this.writeValue(undefined);
        }
      }
    }
  }

  /** This method unselects all select options and updates the select's value */
  private _clearSelectedOptions(): void {
    this._selectOptions.forEach(option => this._unselect(option));
  }

  /** This method shows/hides the select dropdown */
  protected toggleDropdown(): void {
    this._isDropdownOpen$.next(!this._isDropdownOpen$.value);
  }

  public writeValue(obj: any): void {
    const option = this._selectOptions?.find((_option) =>
      this._valueComparer(_option.value, obj));

    this.selectedOption$.next(option);
    this._value = obj;

    if (this._initialized) { 
      this.selectionChange.emit(this.value);
    }
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /** TODO: implement, if needed. */
  /** public setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  } */
}
