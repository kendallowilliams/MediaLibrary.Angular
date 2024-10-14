import { ListBoxItemValueType, ListItem } from "@media-library/ml-data";

export interface ListBoxItem {
  item: ListItem;
  readonly: boolean;
  disabled: boolean;
  handleAdd: (value: ListBoxItemValueType) => void;
  handleRemove: (value: ListBoxItemValueType) => void;
}