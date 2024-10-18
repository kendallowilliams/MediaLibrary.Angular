import { Directive, HostListener, Input } from "@angular/core";
import { PopoverDirective } from "../popover";

@Directive({
  selector: '[mlTooltip]',
  standalone: true,
  hostDirectives: [{
    directive: PopoverDirective,
    inputs: [
      'content: mlTooltip',
      'appendTo',
      'placement',
      'template',
      'templateCtx'
    ]
  }]
})
export class TooltipDirective {
  @Input() public mlTooltip: string | null = null;

  constructor(private _popoverDirective: PopoverDirective) {}

  @HostListener('mouseenter')
  private _handleMouseOver() : void {
    this._popoverDirective.show();
  }
  
  @HostListener('mouseleave')
  private _handleMouseLeave() : void {
    //this._popoverDirective.hide();
  }
}