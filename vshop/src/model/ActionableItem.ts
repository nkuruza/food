export interface ActionableItem {
    item: any,
    onItemAction: {
        (item: any, action: string): void;
    }
}
export interface ActionableItemList extends ActionableItem {
    list: any[]
}

export interface SelectorList extends Partial<ActionableItem> {
    title: string;
    list: any[];
}

export interface Selectable {
    selected: string;
}