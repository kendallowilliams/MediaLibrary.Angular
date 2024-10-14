import { ListItem } from "@media-library/ml-data";

export interface ListBoxItem<TValue> {
  item: ListItem<TValue>;
  readonly: boolean;
  disabled: boolean;
  handleAdd: (value: TValue) => void;
  handleRemove: (value: TValue) => void;
}