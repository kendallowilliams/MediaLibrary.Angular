import { Directive } from "@angular/core";
import { ListBoxItem } from "../interfaces/list-box-item.interface";

export interface ListBoxItemContext {
  $implicit: ListBoxItem<unknown>
}

@Directive({
  selector: 'ng-template[mlListBoxItemTemplate]'
})
export class ListBoxItemTemplateDirective {
  static ngTemplateContextGuard(
    dir: ListBoxItemTemplateDirective,
    ctx: ListBoxItemContext
  ): ctx is ListBoxItemContext {
    return true;
  }
}