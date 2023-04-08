export interface ListItem<IdType, ValueType> {
    Id: IdType;
    Name?: string;
    Value?: ValueType;
    IsSelected: boolean;
}