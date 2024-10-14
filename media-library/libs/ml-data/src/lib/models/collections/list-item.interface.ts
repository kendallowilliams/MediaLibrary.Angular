export type ListBoxItemValueType = string | number; 

export interface ListItem {
    name: string;
    value: ListBoxItemValueType;
    isSelected?: boolean;
}