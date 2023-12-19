import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DeviceService } from '@media-library/ml-utility';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-search',
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private _defaultClasses = 'flex items-center gap-[10px] bg-light text-dark dark:bg-dark dark:text-light';
  @HostBinding('class') private _class = this._defaultClasses;
  
  @ViewChild('txtSearch') private _txtSearch?: ElementRef;
  @ViewChild('btnSearch') private _btnSearch?: ElementRef;

  private _inputVisible = false;
  private _isMobile = false;

  public faSearch = faSearch;

  @Output() public search = new EventEmitter<string>();

  constructor(private _cd: ChangeDetectorRef, private _deviceService: DeviceService,
    private _renderer: Renderer2) {
    this._isMobile = !this._deviceService.hasMouse();
  }

  @HostListener('click', ['$event'])
  private _handleClick(event: MouseEvent) : void {
    const input = this._getInputElement();

    if (this._isMobile) {
      if (!this._inputVisible) {
        this._toggleInputVisibility(true);
        input.focus();
      } else if (!this._getInputElement().value) {
        this._toggleInputVisibility(false);
      }
    }
  }

  @HostListener('mouseenter', ['$event'])
  private _handleMouseEnter(event: MouseEvent) : void {
    if (!this._isMobile) {
      if (!this._inputVisible) {
        this._toggleInputVisibility(true);
        this._toggleButtonHover(true);
      }
    }
  }

  @HostListener('mouseleave', ['$event'])
  private _handleMouseLeave(event: MouseEvent) : void {
    if (!this._isMobile && !Object.is(document.activeElement, this._getInputElement())) {
      if (!this._getInputElement().value) {
        this._toggleInputVisibility(false);
        this._toggleButtonHover(false);
      }
    }
  }

  public handleSearch(event: MouseEvent) : void {
    if (this._getInputElement().value) {
      event.stopPropagation();
    }

    this._search();
  }

  private _search() : void {
    const input = this._getInputElement();

    if (input.value) {
      this.search.emit(input.value);
      this._toggleInputVisibility(false);
      input.value = '';
      
      if (!this._isMobile) {
        this._toggleButtonHover(false);
      }
    }
  }

  public handleFocusOut(event: FocusEvent) : void {
    if (!this._getInputElement().value && !Object.is(event.relatedTarget, this._getButtonElement())) {
      this._toggleInputVisibility(false);
      
      if (!this._isMobile) {
        this._toggleButtonHover(false);
      }
    }
  }

  public handleKeyPress(event: KeyboardEvent) : void {
    if (event.key === 'Enter') {
      this._search();
    }
  }

  private _toggleInputVisibility(visible: boolean) : void {
    this._renderer.setAttribute(this._getInputElement(), 'data-visible', visible.toString());
    this._inputVisible = visible;
  }

  private _toggleButtonHover(hoverable: boolean) : void {
    this._renderer.setAttribute(this._getButtonElement(), 'data-hover', hoverable.toString());
  }

  private _getInputElement() : HTMLInputElement {
    return this._txtSearch?.nativeElement;
  }

  private _getButtonElement() : HTMLButtonElement {
    return this._btnSearch?.nativeElement;
  }
}
