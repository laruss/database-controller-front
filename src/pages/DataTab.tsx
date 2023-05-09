import {useAppDispatch, useAppSelector} from "../app/hooks";
import {api} from "../app/api/api";
import React, {useEffect} from "react";
import {setCurrentObject, setFields, setObjects} from "../app/slices/tabDataSlice";
import List from "../components/list/List";
import DataForm from "../components/data/DataForm";
import Box from "@mui/material/Box";
import {OneObjectResponseType} from "../types/api";

const DataTab = () => {
    const dispatch = useAppDispatch();

    const currentModel = useAppSelector(state => state.app.currentModel);
    const objects = useAppSelector(state => state.tabData.objects);

    const { data: dataScheme } = api.useGetSchemesQuery({modelName: currentModel as string});
    const { data: dataAllObjects } = api.useGetAllObjectsQuery({modelName: currentModel as string});

    useEffect(() => {
        dataScheme && dispatch(setFields(dataScheme));
    }, [dataScheme, dispatch]);

    const handleFetchCurrentObject = (object: OneObjectResponseType) => {
        dispatch(setCurrentObject(object));
    };

    useEffect(() => {
        dataAllObjects && dispatch(setObjects(dataAllObjects));
    }, [dataAllObjects, dispatch]);

    return (
        <Box
            display={'flex'}
            sx={{overflow: 'hidden'}}
        >
            <List
                selectedItemId={objects.current.id}
                items={objects.all}
                modelName={currentModel as string}
            />
            {
                objects.current.id && dataScheme && (
                    <DataForm
                        fields={dataScheme}
                        selectedItemId={objects.current.id}
                        modelName={currentModel as string}
                        setCurrentObject={handleFetchCurrentObject}
                    />
                )
            }
        </Box>
    )
};

export default DataTab;