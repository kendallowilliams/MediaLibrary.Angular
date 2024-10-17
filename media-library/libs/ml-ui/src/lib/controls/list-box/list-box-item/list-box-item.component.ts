import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { ListBoxItemValueType, ListItem } from '@media-library/ml-data';
import { ListBoxItem } from '../interfaces/list-box-item.interface';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'ml-list-box-item',
  templateUrl: './list-box-item.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ListBoxItemComponent implements ListBoxItem {
  @Input() public readonly = false;
  @Input() public disabled = false;
  @Input({required: true}) public item!: ListItem;
  @Output() public addItem = new EventEmitter<ListBoxItemValueType>();
  @Output() public removeItem = new EventEmitter<ListBoxItemValueType>();
  @HostBinding('attr.role') private _role = 'option';
  
  public faSquare = faSquare;
  public faSquareCheck = faSquareCheck;

  public handleAdd(val: ListBoxItemValueType): void {
    this.addItem.emit(val);
  }

  public handleRemove(val: ListBoxItemValueType): void {
    this.removeItem.emit(val);
  }
}
