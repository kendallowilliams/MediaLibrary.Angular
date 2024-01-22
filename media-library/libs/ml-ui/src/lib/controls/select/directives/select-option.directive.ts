import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Optional, Renderer2, ViewContainerRef } from '@angular/core';
import { SelectOption } from '../interfaces/SelectOption.interface';
import { SelectComponent } from '../select.component';
import { SelectMultiSelectDirective } from './select-multiselect.directive';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { take } from 'rxjs';

@Directive({
  selector: '[mlSelectOption]'
})
export class SelectOptionDirective implements OnInit {
  @Input({ required: true }) public option!: SelectOption;

  @HostBinding('class') private _class = `bg-light dark:bg-dark text-dark dark:text-light 
    hover:bg-dark hover:text-light hover:dark:bg-light hover:dark:text-dark
    px-[5px] cursor-pointer h-[25px]`;
  @HostBinding('attr.role') private _role = 'option';
  @HostBinding('attr.aria-selected') private _ariaSelected = false;

  public multiSelectable = false;

  constructor(
    private _host: ElementRef<HTMLElement>, 
    private _renderer: Renderer2, 
    private _vcr: ViewContainerRef,
    private _select: SelectComponent,
    @Optional() private _multiSelect: SelectMultiSelectDirective) {
    this.multiSelectable = !!this._multiSelect;
  }
  
  public ngOnInit(): void {
    this._select.valueChange
      .pipe(take(1))
      .subscribe(value => {
        if (this.multiSelectable) {
          const values = this._select.value as SelectOption['value'][] || [];
          this._setSelected(values.includes(this.option.value));
        } else {
          this._setSelected(this.option.value === value);
        }
      });
    this._createSelectOption();
  }

  private _createSelectOption() : void {
    let componentRef = undefined;

    this._vcr.clear();
    componentRef = this._vcr.createComponent(SelectOptionComponent);
    componentRef.setInput('option', this.option);
    this._renderer.appendChild(this._host.nativeElement, componentRef.location.nativeElement);
  }

  private _setSelected(selected: boolean) : void {
    this.option.selected = selected;
    this._ariaSelected = selected;
  }

  public addValue(value: SelectOption['value'] | null): void {
    let values = this._select.value as SelectOption['value'][] || [];

    if (value !== null && value !== undefined) {
      if (!values?.includes(value)) {
        values = values.concat(value);
        this._select.writeValue(values);
      }

      if (!values || values.length === 0) {
        this._select.clearSelectedValue();
      }
    }
  }

  public removeValue(value: SelectOption['value'] | null): void {
    let values = this._select.value as SelectOption['value'][] || [];

    if (value !== null && value !== undefined) {
      if (values?.includes(value)) {
        values = values.filter(v => value !== v);
        this._select.writeValue(values);
      }

      if (!values || values.length === 0) {
        this._select.clearSelectedValue();
      }
    }
  }

  @HostListener('click')
  private _handleClick() : void {
    if (this.multiSelectable) {
      this._setSelected(!this.option.selected);
      if (this.option.selected) {
        this.addValue(this.option.value);
      } else {
        this.removeValue(this.option.value);
      }
    } else {
      this._select.options?.forEach(option => option.selected = false);
      this._setSelected(true);
      this._select.writeValue(this.option.value);
      this._select.closeDropdown();
    }
  }
}