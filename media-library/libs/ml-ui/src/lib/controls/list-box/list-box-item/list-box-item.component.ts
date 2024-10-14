import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ListItem } from '@media-library/ml-data';

@Component({
  selector: 'ml-list-box-item',
  templateUrl: './list-box-item.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ListBoxItemComponent<TValue> {
  @Input() public readonly = false;
  @Input() public disabled = false;
  @Input({required: true}) public item!: ListItem<TValue>;
  @Output() public addItem = new EventEmitter<TValue>();
  @Output() public deleteItem = new EventEmitter<TValue>();
  @HostBinding('attr.role') private _role = 'option';
  
  public faPlus = faPlus;
  public faTrashCan = faTrashCan;

  public handleAdd(val: TValue): void {
    this.addItem.emit(val);
  }

  public handleDelete(val: TValue): void {
    this.deleteItem.emit(val);
  }
}
