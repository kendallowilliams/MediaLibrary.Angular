import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private _defaultClasses = 'block h-navbar bg-light dark:bg-dark text-dark dark:text-light shadow';
  @HostBinding('class') private _class = this._defaultClasses;
  @ViewChild('mlNav') private _mlNav!: ElementRef;

  private _observer: ResizeObserver;
  private _timeoutId?: number;
  private _timeoutMs = 10;

  protected isMobile = false;
  protected menuOpen = false;

  constructor(private _host: ElementRef, private _renderer: Renderer2, private _cd: ChangeDetectorRef) {
    this._observer = new ResizeObserver(this._handleResize.bind(this));
  }
  
  public ngOnDestroy(): void {
    this._observer.disconnect();
  }

  public ngAfterViewInit(): void {
    if (this._mlNav) {
      this._observer.observe(this._mlNav.nativeElement, { box: 'border-box' });
      this.isMobile = this._mlNav.nativeElement.clientWidth === 0;
      this._cd.detectChanges();
    }
  }

  private _handleResize(entries: ResizeObserverEntry[]): void {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }

    this._timeoutId = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        const borderBox = entries[0].borderBoxSize,
          previousIsMobile = this.isMobile;

        this.isMobile = borderBox[0].inlineSize === 0;

        if (previousIsMobile != this.isMobile) {
          this.menuOpen = false;
          this._cd.detectChanges();
        }
      });
    }, this._timeoutMs);
  }
}
