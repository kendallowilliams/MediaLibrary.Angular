import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  HostBinding,
  ElementRef,
  Renderer2,
  RendererStyleFlags2,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, noop } from 'rxjs';
import { SelectOption } from './interfaces/SelectOption.interface';
import { faCaretDown, faCaretUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
  @HostBinding('class') private _class = 'inline-flex relative h-control cursor-pointer w-full';
  /** The text that appears when no select options are present. */
  @Input() public placeholder = '';
  @Input() public options: SelectOption[] | null = null;
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  public isDropdownOpen = false;

  @HostBinding('attr.role') private _role = 'combobox';
  @HostBinding('attr.aria-expanded') private _ariaExpanded = 'false';

  /** The internal values of the select. */
  private _value: SelectValueType | null = null;
  private _onChange: (_: SelectValueType | null) => void = noop;
  private _onTouched: () => void = noop;
  public valueChange = new BehaviorSubject<SelectValueType | null>(null);
  public selectLabel?: string;
  public faCaretUp = faCaretUp;
  public faCaretDown = faCaretDown;
  public faTimesCircle = faTimesCircle;
  private _scrollTimeout?: number;
  private _timeoutDelay = 0;

  constructor(public host: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

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
    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.isDropdownOpen) {
      this._updateStyles();
    } else {
      this._clearStyles();
    }

    this._ariaExpanded = this.isDropdownOpen ? 'true' : 'false';
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
    this._clearStyles();
    this._ariaExpanded = 'false';
  }

  public handleDropdownClose(isOpen: boolean) : void {
    !isOpen && this._clearStyles();
    this._ariaExpanded = 'false';
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

  private _updateStyles() : void {
    const host = this.host.nativeElement,
      clientRect = host.getBoundingClientRect();

    this._renderer.setStyle(host, '--select-width', `${host.clientWidth}px`, RendererStyleFlags2.DashCase);
    this._renderer.setStyle(host, '--select-height', `${host.clientHeight}px`, RendererStyleFlags2.DashCase);
    this._renderer.setStyle(host, '--select-top', `${clientRect.top}px`, RendererStyleFlags2.DashCase);
    this._renderer.setStyle(host, '--select-left', `${clientRect.left}px`, RendererStyleFlags2.DashCase);
  }

  private _clearStyles() : void {
    const host = this.host.nativeElement;

    this._renderer.removeStyle(host, '--select-width', RendererStyleFlags2.DashCase);
    this._renderer.removeStyle(host, '--select-height', RendererStyleFlags2.DashCase);
    this._renderer.removeStyle(host, '--select-top', RendererStyleFlags2.DashCase);
    this._renderer.removeStyle(host, '--select-left', RendererStyleFlags2.DashCase);
  }

  @HostListener('document:scroll')
  private _handleScroll(): void {
    if (this.isDropdownOpen) {
      if (this._scrollTimeout) {
        window.clearTimeout(this._scrollTimeout);
      }

      this._scrollTimeout = window.setTimeout(() => {
        this.closeDropdown();
        this._scrollTimeout = undefined;
      }, this._timeoutDelay);
    }
  }
}
