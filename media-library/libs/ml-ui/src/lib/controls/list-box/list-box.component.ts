import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { ListBoxItemValueType, ListItem } from '@media-library/ml-data';
import { ListBoxItemComponent } from './list-box-item/list-box-item.component';
import { ListBoxItemContext } from './directives/list-box-item-template.directive';

@Component({
  selector: 'ml-list-box',
  templateUrl: './list-box.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListBoxComponent),
      multi: true,
  }]
})
export class ListBoxComponent implements ControlValueAccessor, OnChanges, AfterContentInit {
  @Input() public readonly = false;
  @Input() public items: ListItem[] = [];
  @Input() public itemTemplate: TemplateRef<ListBoxItemContext> | null = null;

  @HostBinding('class') private _class = `inline-flex flex-row flex-wrap gap-[10px] rounded-[5px] select-none outline-none`;
  @HostBinding('attr.role') private _role = 'listbox';
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  @ContentChildren(ListBoxItemComponent) private _children!: QueryList<ListBoxItemComponent>;

  public disabled = false;
  public get value(): ListBoxItemValueType[] {
    return this._value;
  }
  private _value: ListBoxItemValueType[] = [];
  private _onChange: (_: ListBoxItemValueType[]) => void = noop;
  private _onTouched: () => void = noop;
  public isDirty = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if ('items' in changes) {
      this.items.forEach(o => o.isSelected = this._value?.includes(o.value));
    }
  }

  public ngAfterContentInit(): void {
    this._children.forEach(child => {
      this.items.push(child.item);
    });
    this.items.forEach(o => o.isSelected = this._value?.includes(o.value));
  }

  public getValues<T>() : T[] {
    return this.value as T[];
  }

  public writeValue(obj: ListBoxItemValueType[]): void {
    this._value = obj;
    this.items.forEach(o => o.isSelected = this._value?.includes(o.value));
    this._onChange(this._value);
  }

  public registerOnChange(fn: never): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: never): void {
    this._onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public handleAdd(val: ListBoxItemValueType): void {
    this.isDirty = true;
    this.writeValue(this._value ? [...this._value, val] : [val]);
  }

  public handleRemove(val: ListBoxItemValueType): void {
    this.isDirty = true;
    this.writeValue(this._value?.filter(v => v !== val));
  }
}
