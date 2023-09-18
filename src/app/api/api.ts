import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ListItemFieldsType, ListItemType, ModelsApiInterface, OneObjectResponseType} from "../../types/api";
import {RJSFSchema} from "@rjsf/utils";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['Models', 'Schema', 'ListItemFields', 'Objects', 'OneObject'],
    endpoints: (builder) => ({
        getModels: builder.query<ModelsApiInterface, void>({
            query: () => '/models',
            providesTags: ['Models'],
        }),
        getSchemas: builder.query<RJSFSchema, { modelName: string }>({
            query: ({modelName}) => `/${modelName}/schema`,
            providesTags: ['Schema'],
        }),
        getListItemFields: builder.query<ListItemFieldsType, { modelName: string }>({
            query: () => '/list/item/fields',
            providesTags: ['ListItemFields'],
        }),
        getAllObjects: builder.query<ListItemType[], { modelName: string }>({
            query: ({modelName}) => `/${modelName}`,
            providesTags: ['Objects']
        }),
        getAllObjectsForDropDown: builder.query<ListItemType[], { modelName: string }>({
            query: ({modelName}) => `/${modelName}`,
        }),
        getOneObject: builder.query<OneObjectResponseType, { modelName: string, id: string }>({
            query: ({modelName, id}) => `/${modelName}/${id}`,
            providesTags: ['OneObject'],
        }),
        getOneObjectSimplified: builder.query<ListItemType, { modelName: string, id: string }>({
            // is used to get object as the list of objects type
            query: ({modelName, id}) => `/${modelName}/${id}?simplified=true`,
        }),
        updateObject: builder.mutation<OneObjectResponseType, {
            modelName: string,
            id: string,
            data: OneObjectResponseType
        }>({
            query: ({modelName, id, data}) => ({
                url: `/${modelName}/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['OneObject', 'Objects'],
        }),
        createObject: builder.mutation<OneObjectResponseType, { modelName: string, data: OneObjectResponseType }>({
            query: ({modelName, data}) => ({
                url: `/${modelName}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['OneObject', 'Objects'],
        }),
        deleteObject: builder.mutation<OneObjectResponseType, { modelName: string, id: string }>({
            query: ({modelName, id}) => ({
                url: `/${modelName}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Objects'],
        }),
    }),
});
