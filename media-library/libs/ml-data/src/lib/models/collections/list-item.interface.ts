export interface ListItem<TValue> {
    name: string;
    value: TValue;
    isSelected?: boolean;
}