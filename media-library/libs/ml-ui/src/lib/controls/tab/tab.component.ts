import { Component, HostBinding, Input, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ml-tab',
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content *ngIf="isSelected"></ng-content>`
})
export class TabComponent {
  @HostBinding('class') private _class = 'block h-full';

  @Input() public headerText?: string;
  @Input() public headerTemplate?: TemplateRef<unknown>;
  @Input() public isSelected = false;

  constructor(public vcr: ViewContainerRef) {}
}
