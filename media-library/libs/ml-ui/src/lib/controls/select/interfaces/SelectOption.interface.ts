import { TemplateRef } from "@angular/core";

export interface SelectOption {
  text: string;
  value: string | number | unknown;
  template?: TemplateRef<unknown>;
  selected?: boolean;
  hidden?: boolean;
}