import {TabDataStateInterface} from "../../types/redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ListItemFieldsType, ListItemType, OneObjectResponseType} from "../../types/api";
import {api} from "../api/api";
import {CurrentModelType, ObjectIdType} from "../../types/common";

const initialState: TabDataStateInterface = {
    model: null,
    schema: null,
    listItemFields: null,
    objects: {
        all: [],
        currentId: null,
        current: null,
    },
    isChanged: false
};

export const tabDataSlice = createSlice({
    name: 'tabData',
    initialState,
    reducers: {
        setModel: (state, action: PayloadAction<CurrentModelType>) => {
            state.model = action.payload;
        },
        setObjects: (state, action: PayloadAction<ListItemType[]>) => {
            state.objects.all = action.payload;
        },
        setCurrentId: (state, action: PayloadAction<ObjectIdType>) => {
            if (action.payload !== "undefined") {
                state.objects.all = state.objects.all.filter(object => object.id !== undefined);
            }
            state.objects.currentId = action.payload;
            state.objects.current = null;
        },
        setCurrentObject: (state, action: PayloadAction<OneObjectResponseType>) => {
            state.objects.currentId = action.payload.id as string || undefined;
            state.objects.current = action.payload;
        },
        setCurrentObjectAsNew: (state) => {
            const other = (state.listItemFields as ListItemFieldsType).find(item => item !== 'id');
            state.objects.all.push({id: undefined, [other as string]: "New object"});
            state.objects.current = initialState.objects.current;
            state.objects.currentId = "undefined";
            state.isChanged = false;
        },
        setAsChanged: (state, action: PayloadAction<boolean>) => {
            state.isChanged = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            api.endpoints.getSchemas.matchFulfilled,
            (state, {payload}) => {
                state.schema = payload;
            }
        ).addMatcher(
            api.endpoints.getListItemFields.matchFulfilled,
            (state, {payload}) => {
                state.listItemFields = payload;
            }
        ).addMatcher(
            api.endpoints.getAllObjects.matchFulfilled,
            (state, {payload, meta}) => {
                if (meta.arg.originalArgs.modelName === state.model)
                    state.objects.all = payload;
            }
        ).addMatcher(
            api.endpoints.getOneObject.matchFulfilled,
            (state, {payload}) => {
                state.objects.current = payload;
            }
        ).addMatcher(
            api.endpoints.updateObject.matchFulfilled,
            (state, {payload}) => {
                state.objects.current = payload;
                state.isChanged = false;
            }
        ).addMatcher(
            api.endpoints.createObject.matchFulfilled,
            (state, {payload}) => {
                state.objects.currentId = payload.id as string;
                state.objects.current = payload;
                state.isChanged = false;
            }
        ).addMatcher(
            api.endpoints?.deleteObject.matchFulfilled,
            (state, {meta}) => {
                if (meta.arg.originalArgs.id === state.objects.currentId) {
                    state.objects.currentId = null;
                    state.objects.current = null;
                    state.isChanged = false;
                }
            }
        )
    }
});

export const {
    setModel,
    setObjects,
    setCurrentObject,
    setCurrentId,
    setCurrentObjectAsNew,
    setAsChanged
} = tabDataSlice.actions;

export default tabDataSlice.reducer;

export const selectModel = (state: { tabData: TabDataStateInterface }) => state.tabData.model;
export const selectSchema = (state: { tabData: TabDataStateInterface }) => state.tabData.schema;
export const selectListItemFields = (state: { tabData: TabDataStateInterface }) => state.tabData.listItemFields;
export const selectObjects = (state: { tabData: TabDataStateInterface }) => state.tabData.objects;
export const selectCurrentObject = (state: { tabData: TabDataStateInterface }) => state.tabData.objects.current;
export const selectCurrentObjectId = (state: { tabData: TabDataStateInterface }) => state.tabData.objects.currentId;
export const selectIsChanged = (state: { tabData: TabDataStateInterface }) => state.tabData.isChanged;
