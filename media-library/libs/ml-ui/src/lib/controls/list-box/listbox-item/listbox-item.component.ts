import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ListItem } from '@media-library/ml-data';
import { ListBoxComponent } from '../list-box.component';

@Component({
  selector: 'ml-listbox-item',
  templateUrl: './listbox-item.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ListboxItemComponent<TValue> {
  @Input() public readonly = false;
  @Input() public disabled = false;
  @Input({required: true}) public item!: ListItem<TValue>;
  @HostBinding('attr.role') private _role = 'option';
  
  public faPlus = faPlus;
  public faTrashCan = faTrashCan;

  constructor(private _listBox: ListBoxComponent<TValue>) {}

  public handleAdd(val: TValue): void {
    this._listBox.handleAdd(val);
  }

  public handleDelete(val: TValue): void {
    this._listBox.handleDelete(val);
  }
}
