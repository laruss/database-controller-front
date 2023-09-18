import {IChangeEvent} from "@rjsf/core";
import useApiMutation from "../../app/api/hooks/useApiMutation";
import {api} from "../../app/api/api";

interface useOnSubmitInterface {
    modelName: string;
    dataIsChanged: boolean;
}

const useOnSubmit = ({modelName, dataIsChanged}: useOnSubmitInterface) => {
    const {mutationTrigger: createObject} = useApiMutation({
        actionName: 'Create object request',
        apiMutationMethod: api.useCreateObjectMutation,
    });

    const {mutationTrigger: updateObject} = useApiMutation({
        actionName: 'Update object request',
        apiMutationMethod: api.useUpdateObjectMutation,
    });

    const onSubmit = (data: IChangeEvent) => {
        if (!dataIsChanged) return;
        if (data.formData.id) {
            updateObject({modelName, id: data.formData.id, data: data.formData});
        } else {
            createObject({modelName, data: data.formData});
        }
    };

    return {onSubmit};
};

export default useOnSubmit;
