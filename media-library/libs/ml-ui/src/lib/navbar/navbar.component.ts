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
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'ml-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private _defaultClasses = 'block h-navbar bg-light dark:bg-dark text-dark dark:text-light shadow';
  @HostBinding('class') private _class = this._defaultClasses;
  @ViewChild('mlNav') private _mlNav!: ElementRef<HTMLDivElement>;

  private _observer: ResizeObserver;
  private _timeoutId?: number;
  private _timeoutMs = 10;
  private _subscriptions!: Subscription[];

  protected isMobile$: BehaviorSubject<boolean>;
  protected menuOpen$: BehaviorSubject<boolean>;

  constructor(private _host: ElementRef, private _renderer: Renderer2, private _cd: ChangeDetectorRef) {
    this._observer = new ResizeObserver(this._handleResize.bind(this));
    this.menuOpen$ = new BehaviorSubject<boolean>(false);
    this.isMobile$ = new BehaviorSubject<boolean>(false);
    this._subscriptions = [];
  }
  
  public ngOnDestroy(): void {
    this._observer.disconnect();
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public ngAfterViewInit(): void {
    this._subscriptions.push(this.isMobile$.subscribe(() => {
      this.menuOpen$.next(false);
      this._cd.detectChanges();
    }));

    if (this._mlNav) {
      this._observer.observe(this._mlNav.nativeElement, { box: 'border-box' });
      this.isMobile$.next(this._mlNav.nativeElement.clientWidth === 0);
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
          previousIsMobile = this.isMobile$.getValue(),
          isMobile = borderBox[0].inlineSize === 0;

        if (previousIsMobile != isMobile) {
          this.isMobile$.next(isMobile);
        }
      });
    }, this._timeoutMs);
  }
}
