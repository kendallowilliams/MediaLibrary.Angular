import { ComponentRef, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { Instance, Placement, createPopper } from "@popperjs/core";
import { PopoverContentComponent } from "../popover-content.component";

@Directive({
  selector: '[mlPopover]',
  standalone: true
})
export class PopoverDirective implements OnChanges, OnDestroy {
  @Input() public placement: Placement = 'top';
  @Input() public appendTo: HTMLElement | 'body' = 'body';
  @Input() public content: string | null = null;
  @Input() public template: TemplateRef<unknown> | null = null;
  @Input() public templateCtx: unknown;
  @Input() public hidden = true;

  private _instance: Instance | null = null;
  private _popover: ComponentRef<unknown> | null = null;

  constructor(private _host: ElementRef<HTMLElement>, private _vcr: ViewContainerRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ('hidden' in changes) {
      if (this.hidden) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  public ngOnDestroy(): void {
    this.hide();
  }

  public show() : void {
    const appendTo = this.appendTo === 'body' ? document.body : this.appendTo as HTMLElement;

    this.hide();
    this._popover = this._vcr.createComponent(PopoverContentComponent);
    this._popover.setInput('content', this.content);
    this._popover.setInput('template', this.template);
    this._popover.setInput('templateContext', this.templateCtx);
    appendTo.appendChild(this._popover.location.nativeElement);
    this._instance = createPopper(
      this._host.nativeElement,
      this._popover.location.nativeElement, {
        placement: this.placement,
        modifiers: [{
          name: 'flip',
          enabled: false,
        }]
      }
    );
  }

  public hide() : void {
    this._instance?.destroy();
    this._popover?.destroy();
  }
}