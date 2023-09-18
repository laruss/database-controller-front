import {QueryDefinition} from "@reduxjs/toolkit/query";
import {UseLazyQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import useErrorHandler from "../../../helpers/useErrorHandler";
import {useEffect} from "react";
import {showLoader, showNotification} from "../../../helpers/dispatchers";

interface ApiQueryInterface {
    actionName: string;
    apiQueryMethod: UseLazyQuery<QueryDefinition<any, any, any, any, any>>;
    callback?: () => void;
}

const useApiQuery = ({actionName, apiQueryMethod, callback}: ApiQueryInterface) => {
    const [
        queryTrigger,
        {error, data, isLoading}
    ] = apiQueryMethod();

    useErrorHandler({error, message: error?.data?.error || `Error while ${actionName}`});

    useEffect(() => {
        if (data) {
            data && showNotification(data.message || `${actionName} is succeeded`);
            callback && callback();
        }
    }, [data, callback, actionName]);

    useEffect(() => showLoader(isLoading), [isLoading]);

    return {queryTrigger};
};

export default useApiQuery;
