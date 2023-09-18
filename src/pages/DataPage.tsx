import {useAppSelector} from "../app/hooks";
import {api} from "../app/api/api";
import React, {useEffect} from "react";
import {selectModel} from "../app/slices/tabDataSlice";
import List from "../components/list/List";
import DataForm from "../components/data/DataForm";
import Box from "@mui/material/Box";
import useApiQuery from "../app/api/hooks/useApiQuery";

const DataPage = () => {
    const model = useAppSelector(selectModel);

    const {queryTrigger: getModelSchema} = useApiQuery({
        actionName: 'Get model schema request',
        apiQueryMethod: api.useLazyGetSchemasQuery
    });

    useEffect(() => {
        model && getModelSchema({modelName: model})
    }, [getModelSchema, model]);

    if (!model) return <div><h1>Loading...</h1></div>;

    return (
        <Box
            display={'flex'}
            sx={{overflow: 'hidden', gap: '1em'}}
        >
            <List modelName={model}/>
            <DataForm/>
        </Box>
    )
};

export default DataPage;
