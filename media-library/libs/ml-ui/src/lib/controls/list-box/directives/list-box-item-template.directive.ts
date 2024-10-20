import { Directive } from "@angular/core";
import { ListBoxItem } from "../interfaces/list-box-item.interface";

export interface ListBoxItemContext {
  $implicit: ListBoxItem
}

@Directive({
  selector: 'ng-template[mlListBoxItem]'
})
export class ListBoxItemTemplateDirective {
  static ngTemplateContextGuard(
    dir: ListBoxItemTemplateDirective,
    ctx: ListBoxItemContext
  ): ctx is ListBoxItemContext {
    return true;
  }
}