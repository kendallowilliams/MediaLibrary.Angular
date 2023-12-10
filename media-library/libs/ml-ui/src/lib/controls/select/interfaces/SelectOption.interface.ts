import { TemplateRef } from "@angular/core";

export interface SelectOption<T> {
  text: string;
  value: T;
  template?: TemplateRef<unknown>;
  selected: boolean;
}