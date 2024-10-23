import { Component, Input, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ml-tab',
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content *ngIf="isSelected"></ng-content>`
})
export class TabComponent {
  @Input() public headerText?: string;
  @Input() public headerTemplate?: TemplateRef<unknown>;
  @Input() public isSelected = false;

  constructor(public vcr: ViewContainerRef) {}
}
