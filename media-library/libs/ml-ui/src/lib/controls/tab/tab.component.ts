import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ml-tab',
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TabComponent {
  @Input({required: true}) public header!: string;
  @Input() public isSelected = false;
}
