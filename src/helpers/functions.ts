import {store} from "../app/store";
import {setDialog} from "../app/slices/appSlice";

export const getIdAndOtherField = (list: string[]) => (
    {id: list.find(item => item === 'id'), other: list.find(item => item !== 'id')}
)

export const isObjectEmpty = (obj: { [key: string]: any }) => {
    return Object.keys(obj).length === 0;
};

export const areObjectsEqual = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const handleItemSwitch = (callback: () => void) => {
    if (!store.getState().tabData.isChanged) {
        return callback();
    }
    store.dispatch(setDialog({
        isOpen: true,
        title: 'You have unsaved changes',
        text: 'You have unsaved changes. Are you sure you want to switch?',
        onConfirm: () => {
            callback();
        },
        onCancel: () => {
        }
    }));
};

export const handleItemDelete = (callback: () => void) => {
    store.dispatch(setDialog({
        isOpen: true,
        title: 'Are you sure you want to delete this item?',
        text: 'Are you sure you want to delete this item?',
        onConfirm: () => {
            callback();
        },
        onCancel: () => {
        }
    }));
};
