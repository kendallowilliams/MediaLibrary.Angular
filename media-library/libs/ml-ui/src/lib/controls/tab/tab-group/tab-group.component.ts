import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { TabComponent } from '../tab.component';

@Component({
  selector: 'ml-tab-group',
  templateUrl: './tab-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent {
  @ContentChildren(TabComponent) public tabs!: QueryList<TabComponent>;

  public selectTab(newTab: TabComponent) : void {
    this.tabs.forEach(tab => tab.isSelected = Object.is(tab, newTab));
  }
}
