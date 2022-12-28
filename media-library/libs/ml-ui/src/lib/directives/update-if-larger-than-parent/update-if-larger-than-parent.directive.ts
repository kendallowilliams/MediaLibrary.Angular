import { Directive, ElementRef,  Input,  OnDestroy,  OnInit,  Output,  Renderer2, EventEmitter } from '@angular/core';

type Dimensions = { 
  scrollWidth: number, 
  scrollHeight: number, 
  offsetWidth: number, 
  offsetHeight: number 
};

type UpdateTarget = 'class' | 'attribute' | 'style';

@Directive({
  selector: '[mlUpdateIfLargerThanParent]',
  standalone: true
})
export class UpdateIfLargerThanParentDirective implements OnInit, OnDestroy {
  @Input() public ignoreHeight = false;
  @Input() public ignoreWidth = false;
  @Input() public observeParentResize = false;
  @Input() public updateTarget?: UpdateTarget | undefined = undefined;
  @Input() public targetName?: string | undefined = undefined;
  @Input() public targetValue?: string | ((isLarger: boolean)  => void) | undefined = undefined;

  @Output() public updateCallback = new EventEmitter<boolean>;

  private _parent!: HTMLElement;
  private _resizeObserver?: ResizeObserver;
  private _timeoutId: number | undefined = undefined;
  private _timeoutDelayMs = 15;
  private _previousDimensions?: Dimensions;
  private _isLarger?: boolean | undefined = undefined;

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2) {
  }

  public ngOnInit() : void {
    this._parent = this._renderer.parentNode(this._host.nativeElement);
    this._checkDimensions();
    if (this.observeParentResize) {
      this._resizeObserver = new ResizeObserver(this._handleResize.bind(this));
      this._resizeObserver.observe(this._parent);
    }
  }

  public ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
    this.updateCallback.unsubscribe();
  }

  private _handleResize(/*entries: ResizeObserverEntry[], observer: ResizeObserver*/) : void {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }

    this._timeoutId = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        this._checkDimensions();
        this._timeoutId = undefined;
      });
    }, this._timeoutDelayMs);
  }

  private _checkDimensions() : void {
    const dimensions = this._getDimensions(),
      isTaller = !this.ignoreHeight && dimensions.scrollHeight > dimensions.offsetHeight,
      isWider = !this.ignoreWidth && dimensions.scrollWidth > dimensions.offsetWidth,
      heightChangeValid = this._isLarger ? 
        (this._previousDimensions?.offsetHeight || 0) < dimensions.offsetHeight : 
        (this._previousDimensions?.offsetHeight || 0) !== dimensions.offsetHeight,
      widthChangeValid = this._isLarger ? 
        (this._previousDimensions?.offsetWidth || 0) < dimensions.offsetWidth :
        (this._previousDimensions?.offsetWidth || 0) !== dimensions.offsetWidth,
      isLarger = isTaller || isWider;

    if (heightChangeValid || widthChangeValid) {
      this._previousDimensions = dimensions;
      if (this._isLarger !== isLarger) {
        this._updateHost(isLarger);
        this._isLarger = isLarger;
      }
    }
  }

  private _getDimensions() : Dimensions {
    return { 
      scrollHeight: this._parent.scrollHeight,
      scrollWidth: this._parent.scrollWidth,
      offsetHeight: this._parent.offsetHeight,
      offsetWidth: this._parent.offsetWidth
    };
  }

  private _updateHost(isLarger: boolean) : void {
    switch(this.updateTarget) {
      case 'class':
        this._toggleClass(isLarger);
        break;
      case 'attribute':
        this._toggleAttribute(isLarger);
        break;
      case 'style':
        this._toggleStyle(isLarger);
        break;
      default:
        console.warn('UpdateIfLargerThanParentDirective: invalid "updateTarget"');
        break;
    }
    this.updateCallback.emit(isLarger);
  }

  private _toggleStyle(isLarger: boolean) {
    if (this.targetName) {
      if (isLarger) {
        this._renderer.setStyle(this._host.nativeElement, this.targetName, this.targetValue?.toString() || '');
      } else {
        this._renderer.removeStyle(this._host.nativeElement, this.targetName);
      }
    }
  }

  private _toggleAttribute(isLarger: boolean) {
    if (this.targetName) {
      if (isLarger) {
        this._renderer.setAttribute(this._host.nativeElement, this.targetName, this.targetValue?.toString() || '');
      } else {
        this._renderer.removeAttribute(this._host.nativeElement, this.targetName);
      }
    }
  }

  private _toggleClass(isLarger: boolean) {
    if (this.targetName) {
      if (isLarger) {
        this._renderer.addClass(this._host.nativeElement, this.targetName);
      } else {
        this._renderer.removeClass(this._host.nativeElement, this.targetName);
      }
    }
  }
}
