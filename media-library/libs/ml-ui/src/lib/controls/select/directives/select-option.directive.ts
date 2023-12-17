import { DestroyRef, Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Optional, Renderer2, ViewContainerRef } from '@angular/core';
import { SelectOption } from '../interfaces/SelectOption.interface';
import { SelectComponent } from '../select.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectMultiSelectDirective } from './select-multiselect.directive';
import { MultiSelectOptionComponent } from '../multi-select-option/multi-select-option.component';

@Directive({
  selector: '[mlSelectOption]'
})
export class SelectOptionDirective implements OnInit {
  @Input({ required: true }) public option!: SelectOption;

  @HostBinding('class') private _class = `bg-light dark:bg-dark text-dark dark:text-light 
    hover:bg-dark hover:text-light hover:dark:bg-light hover:dark:text-dark
    px-[5px] cursor-pointer`;
  @HostBinding('attr.role') private _role = 'option';
  @HostBinding('attr.aria-selected') private _ariaSelected = false;

  public multiSelectable = false;

  constructor(
    private _host: ElementRef<HTMLElement>, 
    private _renderer: Renderer2, 
    private _vcr: ViewContainerRef,
    private _select: SelectComponent,
    private _destroyRef: DestroyRef,
    @Optional() private _multiSelect: SelectMultiSelectDirective) {
    this.multiSelectable = !!this._multiSelect;
  }
  
  public ngOnInit(): void {
    if (this.option.template) {
      this._createTemplate();
    } else if (this.multiSelectable) {
      this._createMultiSelectOption();
    } else {
      const text = this._renderer.createText(this.option.text);

      this._renderer.appendChild(this._host.nativeElement, text);
    }
    this._select.valueChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: value => {
          this._handleValueChange(value);
        }
      });
  }

  private _createTemplate() : void {
    const ctx = {
      $implicit: this.option
    };

    if (this.option.template) {
      this._vcr.clear();
      this._vcr.createEmbeddedView(this.option.template, ctx);
    }
  }

  private _createMultiSelectOption() : void {
    let componentRef = undefined;

    this._vcr.clear();
    componentRef = this._vcr.createComponent(MultiSelectOptionComponent);
    componentRef.setInput('option', this.option);
    this._renderer.appendChild(this._host.nativeElement, componentRef.location.nativeElement);
  }

  private _handleValueChange(value: SelectOption['value'] | SelectOption['value'][] | null): void {
    if (this.multiSelectable) {
      const values = value as SelectOption['value'][] || null;
      if (!values || !values.includes(this.option.value)) {
        this._setSelected(false);
      } else if (values.includes(this.option.value)) {
        this._setSelected(true);
      }
    } else {
      if (!value || this.option.value !== value) {
        this._setSelected(false);
      } else if (this.option.value === value) {
        this._setSelected(true);
      }
    }
  }

  private _setSelected(selected: boolean) : void {
    this.option.selected = selected;
    this._ariaSelected = selected;
  }

  @HostListener('click')
  private _handleClick() : void {
    if (this.multiSelectable) {
      this._setSelected(!this.option.selected);
      if (this.option.selected) {
        this._select.addValue(this.option.value);
      } else {
        this._select.removeValue(this.option.value);
      }
    } else {
      if (!this.option.selected) {
        this._setSelected(true);
        this._select.writeValue(this.option.value);
      }
      this._select.closeDropdown();
    }
  }
}