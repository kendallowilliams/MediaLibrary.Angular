import { DestroyRef, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";
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
      } else {
        fromEvent(this._host.nativeElement, 'mouseover')
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this.show());
      }

      fromEvent(this._host.nativeElement, 'blur')
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this.hide());
    }
  }
  
  public ngOnDestroy(): void {
    this.popper?.destroy();
  }

  public show() : void {
    this._createPopperInstance();
  }

  private _createPopperInstance(): void {
    const componentRef = this._vcr.createComponent(TooltipComponent);

    this.popper = createPopper(
      this._host.nativeElement, 
      componentRef.location.nativeElement, {
        placement: this.ttPlacement
    });
  }

  public hide() : void {
    this.popper?.destroy();
  }
}