import { ComponentRef, Directive, OnDestroy, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { SelectSearchDirective } from './select-search.directive';
import { SelectSearchComponent } from '../select-search/select-search.component';

@Directive({
  selector: '[mlSelectSearchTemplate]'
})
export class SelectSearchTemplateDirective implements OnInit, OnDestroy {
  private _componentRef: ComponentRef<SelectSearchComponent> | null = null;

  constructor(private _vcr: ViewContainerRef, @Optional() private _search: SelectSearchDirective) {}
  
  public ngOnInit(): void {
    if (this._search) {
      this._createComponent();
    }
  }

  public ngOnDestroy(): void {
    this._componentRef?.destroy();
  }

  private _createComponent() : void {
    this._componentRef = this._vcr.createComponent(SelectSearchComponent);
    this._componentRef.setInput('placeholder', this._search.searchPlaceholder);
    this._search.setSearch(this._componentRef.instance);
  }
}
