import {setLoaderShown, setNotification} from "../app/slices/appSlice";
import {setCurrentId, setModel} from "../app/slices/tabDataSlice";
import {store} from "../app/store";

export const showLoader = (state: boolean) => {
    store.dispatch(setLoaderShown(state));
};

export const changeTab = (tab: string) => {
    const method = () => {
        store.dispatch(setCurrentId(null));
        store.dispatch(setModel(tab));
    };

    return method();
};

export const showNotification = (text: string, variant: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    store.dispatch(setNotification({
        isOpen: true,
        text,
        variant
    }));
};
