import {ObjectIdType} from "./common";

export interface ListProps {
    modelName: string;
}

export interface ListItemDeleteInterface {
    itemId: string;
    modelName: string;
}

export interface ListItemInterface {
    itemId: ObjectIdType;
    itemName: string;
    modelName: string;
    selectedItemId: ObjectIdType;
}
