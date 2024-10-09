import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { TabComponent } from '../tab.component';

@Component({
  selector: 'ml-tab-group',
  templateUrl: './tab-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent) public tabs!: QueryList<TabComponent>;

  constructor(private renderer: Renderer2) {}
  
  public ngAfterContentInit(): void {
    this.tabs.forEach(tab => this.setVisibility(tab));
  }

  public selectTab(newTab: TabComponent) : void {
    this.tabs.forEach(tab => {
      tab.isSelected = Object.is(tab, newTab);
      this.setVisibility(tab);
    });
  }

  private setVisibility(tab: TabComponent) : void {
    const tabElement = tab.vcr.element.nativeElement;

    if (tab.isSelected) {
      this.renderer.removeClass(tabElement, 'hidden');
    } else {
      this.renderer.addClass(tabElement, 'hidden');
    }
  }
}
