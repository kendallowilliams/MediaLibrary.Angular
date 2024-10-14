import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ListBoxItemValueType, ListItem } from '@media-library/ml-data';
import { ListBoxItem } from '../interfaces/list-box-item.interface';

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
  
  public faPlus = faPlus;
  public faTrashCan = faTrashCan;

  public handleAdd(val: ListBoxItemValueType): void {
    this.addItem.emit(val);
  }

  public handleRemove(val: ListBoxItemValueType): void {
    this.removeItem.emit(val);
  }
}
