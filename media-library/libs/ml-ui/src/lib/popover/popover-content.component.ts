import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'ml-popover-content',
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  template: '<ng-container *ngIf="template" [ngTemplateOutlet]="template" [ngTemplateOutletContext]="templateContext"]></ng-container>'
})
export class PopoverContentComponent {
  @Input() public template: TemplateRef<unknown> | null = null;
  @Input() public templateContext: unknown;
}