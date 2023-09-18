import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from "../store";
import {AppState} from "../../types/redux";
import {api} from "../api/api";

const initialState: AppState = {
    isLoaderShown: false,
    models: {},
    dialog: {
        isOpen: false,
        title: '',
        text: '',
        onConfirm: () => {
        },
        onCancel: () => {
        }
    },
    notification: {
        isOpen: false,
        text: '',
        variant: 'info'
    }
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<AppState['notification']>) => {
            state.notification = action.payload;
        },
        setDialog: (state, action: PayloadAction<AppState['dialog']>) => {
            state.dialog = action.payload;
        },
        setLoaderShown: (state, action: PayloadAction<boolean>) => {
            state.isLoaderShown = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            api.endpoints.getModels.matchFulfilled,
            (state, {payload}) => {
                state.models = payload;
            }
        )
    }
});

export const {
    setDialog,
    setNotification,
    setLoaderShown,
} = appSlice.actions;

export const selectIsLoaderShown = (state: any) => state.app.isLoaderShown;
export const selectModels = (state: RootState) => state.app.models;
export const selectDialog = (state: RootState) => state.app.dialog;
export const selectNotification = (state: RootState) => state.app.notification;

export default appSlice.reducer;
