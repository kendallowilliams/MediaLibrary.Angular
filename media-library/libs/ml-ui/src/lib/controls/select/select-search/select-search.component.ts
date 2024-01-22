import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'ml-select-search',
  templateUrl: './select-search.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelectSearchComponent {
  @HostBinding('class') private _class = `flex h-control text-dark border-dark px-[5px] m-[5px]
    border-[1px] border-solid rounded-[5px] outline-none dark:bg-light focus:ring inline-block`;

  @Input() public placeholder = '';

  public query = '';
  @Output() public queryChange = new EventEmitter<string>();

  public faTimes = faTimes;
  public faSearch = faSearch;

  public handleQueryChange(query: string): void {
    this.queryChange.emit(query);
  }
}
