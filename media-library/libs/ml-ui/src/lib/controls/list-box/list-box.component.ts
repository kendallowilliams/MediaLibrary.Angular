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
export class ListBoxComponent implements ControlValueAccessor {
  @Input() public readonly = false;
  @HostBinding('class') private _class = `inline-flex flex-row flex-wrap gap-[10px] rounded-[5px] select-none`;
  @HostBinding('attr.role') private _role = 'listbox';
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  public items: string[] = [];
  public disabled = false;
  public faTrashCan = faTrashCan;
  private _value: string[] = [];
  private _onChange: (_: string[]) => void = noop;
  private _onTouched: () => void = noop;

  public writeValue(obj: string[]): void {
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

  public handleDelete(item: string): void {
    this.writeValue(this.items.filter(i => i !== item));
  }
}
