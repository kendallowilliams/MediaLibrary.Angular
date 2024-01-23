import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Renderer2,
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
  @Input() public placeholder = '';

  public query = '';
  @Output() public queryChange = new EventEmitter<string>();

  @HostBinding('class') private _class = `flex w-full`;
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  public faTimes = faTimes;
  public faSearch = faSearch;

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

  public handleQueryChange(query: string): void {
    this.queryChange.emit(query);
  }

  public handleClear() : void {
    this.query = '';
    this.queryChange.emit('');
  }
}
