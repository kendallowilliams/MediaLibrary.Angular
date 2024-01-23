import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
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

  @HostBinding('class') private _class = `flex h-control text-dark border-dark px-[5px] m-[5px]
    border-[1px] border-solid rounded-[5px] outline-none bg-white
    items-center`;
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  public faTimes = faTimes;
  public faSearch = faSearch;

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

  public handleQueryChange(query: string): void {
    this.queryChange.emit(query);
  }

  @HostListener('focusin')
  private _handleFocus() : void {
    this._renderer.addClass(this._host.nativeElement, 'ring');
  }

  @HostListener('focusout')
  private _handleBlur() : void {
    this._renderer.removeClass(this._host.nativeElement, 'ring');
  }

  public handleClear() : void {
    this.query = '';
    this.queryChange.emit('');
  }
}
