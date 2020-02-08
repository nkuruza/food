export interface ActionableItem{
    item: any,
    onItemAction: {
        (item: any, action: string): void;
    }
}
export interface ActionableItemList extends ActionableItem{
    list:any[]
}