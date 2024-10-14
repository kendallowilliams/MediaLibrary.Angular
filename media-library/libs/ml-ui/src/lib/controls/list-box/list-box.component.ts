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
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { ListItem } from '@media-library/ml-data';
import { ListBoxItemComponent } from './list-box-item/list-box-item.component';

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
export class ListBoxComponent<TValue> implements ControlValueAccessor, OnChanges, AfterContentInit {
  @Input() public readonly = false;
  @Input() public items: ListItem<TValue>[] = [];

  @HostBinding('class') private _class = `inline-flex flex-row flex-wrap gap-[10px] rounded-[5px] select-none outline-none`;
  @HostBinding('attr.role') private _role = 'listbox';
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  @ContentChildren(ListBoxItemComponent) private _children!: QueryList<ListBoxItemComponent<TValue>>;

  public disabled = false;
  public get value(): TValue[] {
    return this._value;
  }
  private _value: TValue[] = [];
  private _onChange: (_: TValue[]) => void = noop;
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

  public writeValue(obj: TValue[]): void {
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

  public handleAdd(val: TValue): void {
    this.isDirty = true;
    this.writeValue([...this._value, val]);
  }

  public handleDelete(val: TValue): void {
    this.isDirty = true;
    this.writeValue(this._value?.filter(v => v !== val));
  }
}
