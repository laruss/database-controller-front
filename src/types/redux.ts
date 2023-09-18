import {
    ListItemFieldsType, ListItemType,
    ModelsApiInterface,
    OneObjectResponseType
} from "./api";
import {CurrentModelType, ObjectIdType} from "./common";
import {RJSFSchema} from "@rjsf/utils";

export interface AppState {
    isLoaderShown: boolean;
    models: ModelsApiInterface;
    dialog: {
        isOpen: boolean;
        title: string;
        text: string;
        onConfirm: () => void;
        onCancel: () => void;
    },
    notification: {
        isOpen: boolean;
        text: string;
        variant: 'success' | 'error' | 'warning' | 'info';
    }
}

export interface TabDataStateInterface {
    model: CurrentModelType;
    schema: RJSFSchema | null;
    listItemFields: ListItemFieldsType | null;
    objects: {
        all: ListItemType[];
        currentId: ObjectIdType;
        current: OneObjectResponseType | null;
    };
    isChanged: boolean;
}

export interface CurrentObjectInterface {
    [key: string]: any;
}
