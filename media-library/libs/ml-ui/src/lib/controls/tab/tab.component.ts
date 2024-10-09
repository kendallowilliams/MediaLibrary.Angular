import { Component, HostBinding, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ml-tab',
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TabComponent {
  @HostBinding('class') private _class = 'block h-full';

  @Input({required: true}) public header!: string;
  @Input() public isSelected = false;

  constructor(public vcr: ViewContainerRef) {}
}
