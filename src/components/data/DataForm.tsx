import Box from "@mui/material/Box";
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import React, {useEffect} from "react";
import {api} from "../../app/api/api";
import {
    selectCurrentObject,
    selectCurrentObjectId, selectIsChanged,
    selectModel,
    selectSchema, setAsChanged,
} from "../../app/slices/tabDataSlice";
import useApiQuery from "../../app/api/hooks/useApiQuery";
import {RegistryFieldsType, RegistryWidgetsType} from "@rjsf/utils";
import AnyOfField from "./fields/AnyOfField";
import {IChangeEvent} from "@rjsf/core";
import {areObjectsEqual} from "../../helpers/functions";
import useOnSubmit from "./useOnSubmit";
import ObjectField from "./fields/ObjectField";
import ArrayField from "./fields/ArrayField";

const boxStyle = {
    width: 'calc(98vw - var(--items-list-width))',
    height: 'calc(100vh - var(--header-height))',
    overflowY: 'auto',
    overflowX: 'hidden',
}

const DataForm = () => {
    const dispatch = useAppDispatch();
    const currentId = useAppSelector(selectCurrentObjectId);
    const formData = useAppSelector(selectCurrentObject);
    const modelName = useAppSelector(selectModel);
    const schema = useAppSelector(selectSchema);
    const dataIsChanged = useAppSelector(selectIsChanged);

    const {onSubmit} = useOnSubmit({modelName: modelName as string, dataIsChanged})

    const {queryTrigger: getObject} = useApiQuery({
        actionName: 'Get object request',
        apiQueryMethod: api.useLazyGetOneObjectQuery
    });

    const fields: RegistryFieldsType = {
        AnyOfField,
        ObjectField,
        ArrayField
    };

    const onChange = ({formData: changedFormData}: IChangeEvent) => {
        dispatch(
            setAsChanged(
                !areObjectsEqual(formData as { [key: string]: any }, changedFormData as { [key: string]: any }) &&
                (currentId !== "undefined" ? formData !== null : formData === null)
            )
        );
    };

    const widgets: RegistryWidgetsType = {};

    useEffect(() => {
        currentId && currentId !== "undefined" && getObject({modelName, id: currentId});
    }, [modelName, currentId, getObject]);

    if (!schema) return null;

    return (
        <Box sx={boxStyle}>
            <Form
                schema={schema}
                fields={fields}
                widgets={widgets}
                validator={validator}
                onChange={onChange}
                formData={formData}
                onSubmit={onSubmit}
                disabled={currentId === null}
            />
        </Box>
    )
};

export default DataForm;
