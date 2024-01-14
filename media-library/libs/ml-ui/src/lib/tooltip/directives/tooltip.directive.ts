import { ComponentRef, DestroyRef, Directive, ElementRef, EmbeddedViewRef, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef, ViewRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BasePlacement, Instance } from "@popperjs/core";
import { createPopper } from "@popperjs/core/lib/createPopper";
import { fromEvent } from "rxjs";
import { TooltipComponent } from "../tooltip.component";

@Directive({
  selector: '[mlTooltip]'
})
export class TooltipDirective implements OnDestroy, OnInit {
  @Input() public ttPlacement: BasePlacement = 'top';
  @Input() public ttContent: string | TemplateRef<unknown> | null = null;
  @Input() public ttTrigger: 'hover' | 'focus' | 'manual' | null = null;

  public popper?: Instance;
  public viewRef?: ComponentRef<unknown> | EmbeddedViewRef<unknown>;

  constructor(
    private _host: ElementRef<HTMLElement>, 
    private _vcr: ViewContainerRef, 
    private _renderer: Renderer2,
    private _destroyRef: DestroyRef
  ) {}
  
  public ngOnInit(): void {
    if (this.ttTrigger === 'focus' || this.ttTrigger === 'hover') {
      if (this.ttTrigger === 'focus') {
        fromEvent(this._host.nativeElement, 'focus')
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe(() => this.show());

          fromEvent(this._host.nativeElement, 'blur')
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.hide());
      } else {
        fromEvent(this._host.nativeElement, 'mouseover')
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this.show());

        fromEvent(this._host.nativeElement, 'mouseleave')
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe(() => this.hide());
      }
    }
  }
  
  public ngOnDestroy(): void {
    this.popper?.destroy();
  }

  public show() : void {
    this._createPopperInstance();
  }

  private _createPopperInstance(): void {
    if (this.ttContent) {
      this.viewRef = typeof this.ttContent === 'string' ?
        this._vcr.createComponent(TooltipComponent) :
        this._vcr.createEmbeddedView(this.ttContent);

      if (typeof this.ttContent === 'string') {
        const componentRef = this._vcr.createComponent(TooltipComponent);
        this.popper = createPopper(
          this._host.nativeElement, 
          componentRef.location.nativeElement, {
            placement: this.ttPlacement
        });
      } else {
        const viewRef = this._vcr.createEmbeddedView(this.ttContent);
      }
    }
  }

  public hide() : void {
    this.popper?.destroy();
    this._vcr.clear();
  }
}