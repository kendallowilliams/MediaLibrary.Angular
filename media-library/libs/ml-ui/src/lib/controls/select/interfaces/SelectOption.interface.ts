import { TemplateRef } from "@angular/core";

export interface SelectOption {
  text: string;
  value: unknown;
  template?: TemplateRef<unknown>;
  selected: boolean;
}