import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  HostBinding,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, noop } from 'rxjs';
import { SelectOption } from './interfaces/SelectOption.interface';
import { faCaretDown, faCaretUp, faCircleExclamation, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
export class SelectComponent implements ControlValueAccessor {
  @HostBinding('class') private _class = 'flex group/select outline-none min-w-max';
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
  public faCircleExclamation = faCircleExclamation;
  private _dropdownHover = false;

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

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
  }

  public writeValue(value: SelectValueType | null): void {
    if (value !== null && value !== undefined) {
      if (this._value !== value) {
        this.value = value;
        this.valueChange.next(value);
      }
    } else {
      this.clearSelectedValue();
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
    this.clearSelectedValue();
  }

  public clearSelectedValue() : void {
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

  public getDropdownVariables() : { [key: string]: string } {
    const host = this._host.nativeElement;

    return { '--dropdown-width': `${host.clientWidth}px` };
  }

  /** TODO: implement, if needed. */
  /** public setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  } */

  @HostListener('blur')
  private _handleBlur() : void {
    if (!this._dropdownHover) {
      this.closeDropdown();
    }
  }

  public handleMouseEnter() : void {
    this._dropdownHover = true;
  }

  public handleMouseLeave() : void {
    this._dropdownHover = false;
  }

  public handleDropdownBlur(evt: FocusEvent) : void {
    const host = this._host.nativeElement;

    if (!host.contains(evt.relatedTarget as HTMLElement)) {
      this.closeDropdown();
    }
  }
}
