export interface ModelsApiInterface {
    [key: string]: string;
}

export type OneObjectResponseType = {
    [key: string]: string | number | boolean | string[] | number[] | boolean[] | null;
}

export type ListItemFieldsType = string[];

export type ListItemType = {
    [key in ListItemFieldsType[number]]?: string;
}
