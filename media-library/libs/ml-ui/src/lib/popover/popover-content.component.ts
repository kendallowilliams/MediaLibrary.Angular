import { Component, Input, TemplateRef, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'ml-popover-content',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './popover-content.component.html'
})
export class PopoverContentComponent {
  @Input() public content: string | null = null;
  @Input() public template: TemplateRef<unknown> | null = null;
  @Input() public templateCtx: unknown;
}