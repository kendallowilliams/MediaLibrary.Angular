import { TemplateRef } from "@angular/core";

export interface SelectOption {
  text: string;
  value: string | number | unknown;
  template?: TemplateRef<unknown>;
  selected?: boolean;
  hidden?: boolean;
}

export interface SelectOptionGroup {
  name: string;
  options: SelectOption[];
  hidden?: boolean;
}