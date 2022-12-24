import { Directive, ElementRef,  Input,  OnDestroy,  OnInit,  Renderer2 } from '@angular/core';

type Dimensions = { 
  width: number, 
  height: number, 
  parentWidth: number, 
  parentHeight: number 
};

@Directive({
  selector: '[mlHideIfLargerThanParent]'
})
export class HideIfLargerThanParentDirective implements OnInit, OnDestroy {
  @Input() public ignoreHeight = false;
  @Input() public ignoreWidth = false;
  @Input() public observeParentResize = false;

  private _parent: HTMLElement;
  private _resizeObserver?: ResizeObserver;
  private _timeoutId: number | undefined = undefined;
  private _timeoutDelayMs = 15;

  constructor(private _host: ElementRef<HTMLElement>, private _renderer: Renderer2) {
    this._parent = this._renderer.parentNode(this._host.nativeElement);
  }

  public ngOnInit() : void {
    if (this.observeParentResize) {
      this._resizeObserver = new ResizeObserver(this._handleResize.bind(this));
      this._resizeObserver.observe(this._parent);
    }
  }

  public ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
  }

  private _handleResize(/*entries: ResizeObserverEntry[], observer: ResizeObserver*/) : void {
    if (this._timeoutId) {
      return;
    }

    this._timeoutId = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        const dimensions = this._getDimensions(),
          isTaller = !this.ignoreHeight && dimensions.height > dimensions.parentHeight,
          isWider = !this.ignoreWidth && dimensions.width > dimensions.parentWidth;

        this._renderer.addClass(this._host.nativeElement, 'hidden');
        this._renderer.addClass(this._host.nativeElement, 'invisible');

        if (!isTaller && !isWider) {
          this._renderer.removeClass(this._host.nativeElement, 'hidden');
          this._renderer.removeClass(this._host.nativeElement, 'invisible');
        }
        
        this._timeoutId = undefined;
      });
    }, this._timeoutDelayMs);
  }

  private _getDimensions() : Dimensions {
    const host = this._host.nativeElement;
    let height = 0,
      width = 0,
      parentHeight = 0,
      parentWidth = 0;

    this._renderer.addClass(host, 'hidden');
    parentHeight = this._parent.clientHeight;
    parentWidth = this._parent.clientWidth;
    this._renderer.removeClass(host, 'hidden');
    height = host.clientHeight;
    width = host.clientWidth;

    return { 
      width: width, 
      height: height, 
      parentHeight: parentHeight, 
      parentWidth: parentWidth 
    };
  }
}
