import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { noop } from 'rxjs';
import { ListItem } from '@media-library/ml-data';

type ItemComparerFn<TValue> = (item1: ListItem<TValue>, item2: ListItem<TValue>) => boolean;

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
export class ListBoxComponent<TValue> implements ControlValueAccessor {
  @Input() public readonly = false;
  @Input() public itemComparer: ItemComparerFn<TValue> = 
    (item1: ListItem<TValue>, item2: ListItem<TValue>) => item1.Value === item2.Value;
  @HostBinding('class') private _class = `inline-flex flex-row flex-wrap gap-[10px] rounded-[5px] select-none outline-none`;
  @HostBinding('attr.role') private _role = 'listbox';
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  public items: ListItem<TValue>[] = [];
  public disabled = false;
  public faTrashCan = faTrashCan;
  private _value: ListItem<TValue>[] = [];
  private _onChange: (_: ListItem<TValue>[]) => void = noop;
  private _onTouched: () => void = noop;

  public writeValue(obj: ListItem<TValue>[]): void {
    this._value = obj;
    this.items = this._value;
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

  public handleDelete(item: ListItem<TValue>): void {
    this.writeValue(this.items.filter(i => !this.itemComparer(i, item)));
  }
}
