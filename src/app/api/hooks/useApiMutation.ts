import {MutationDefinition} from "@reduxjs/toolkit/query";
import {UseMutation} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import useErrorHandler from "../../../helpers/useErrorHandler";
import {useEffect} from "react";
import {showLoader, showNotification} from "../../../helpers/dispatchers";

interface ApiMutationInterface {
    actionName: string;
    apiMutationMethod: UseMutation<MutationDefinition<any, any, any, any, any>>;
    callback?: () => void;
}

const useApiMutation = ({apiMutationMethod, actionName, callback}: ApiMutationInterface) => {
    const [
        mutationTrigger,
        {error, data, isLoading}
    ] = apiMutationMethod();

    useErrorHandler({error, message: error?.data?.error || `Error while ${actionName}`});

    useEffect(() => {
        if (data) {
            data && showNotification(data.message || `${actionName} is succeeded`);
            callback && callback();
        }
    }, [data, callback, actionName]);

    useEffect(() => showLoader(isLoading), [isLoading]);

    return {mutationTrigger};
};

export default useApiMutation;
