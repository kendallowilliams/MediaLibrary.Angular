import { AfterContentInit, Component, ContentChildren, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { TabComponent } from '../tab.component';

export interface TabQuery {
  headerText?: string;
  tab?: TabComponent;
}

@Component({
  selector: 'ml-tab-group',
  templateUrl: './tab-group.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent, { descendants: true }) public tabs!: QueryList<TabComponent>;

  constructor(private renderer: Renderer2) {}
  
  public ngAfterContentInit(): void {
    this.tabs.forEach(tab => this.setVisibility(tab));
  }

  private setVisibility(tab: TabComponent) : void {
    const tabElement = tab.vcr.element.nativeElement;
    if (tab.isSelected) {
      this.renderer.removeClass(tabElement, 'hidden');
    } else {
      this.renderer.addClass(tabElement, 'hidden');
    }
  }

  public goToTab(query: TabQuery) : void {
    this.tabs.forEach(tab => {
      tab.isSelected = (!!tab.headerText && tab.headerText === query?.headerText) || 
        Object.is(tab, query.tab);
      this.setVisibility(tab);
    });
  }
}
