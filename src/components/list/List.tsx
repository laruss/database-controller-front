import ListMUI from '@mui/material/List';
import ListItem from "./ListItem";
import {ListProps} from "../../types/components";
import Box from "@mui/material/Box";
import React, {useEffect} from "react";
import ListNewItem from "./ListNewItem";
import useApiQuery from "../../app/api/hooks/useApiQuery";
import {api} from "../../app/api/api";
import {selectCurrentObjectId, selectListItemFields, selectObjects} from "../../app/slices/tabDataSlice";
import {useAppSelector} from "../../app/hooks";
import {containerStyle} from "../../styles/list";
import {SxProps} from "@mui/material";
import {getIdAndOtherField} from "../../helpers/functions";

const List = ({ modelName }: ListProps) => {
    const itemFields = useAppSelector(selectListItemFields);
    const {id, other} = getIdAndOtherField(itemFields as string[]);
    const items = useAppSelector(selectObjects);
    const selectedItemId = useAppSelector(selectCurrentObjectId);
    const haveItems = items && items.all.length > 0;

    const {queryTrigger: getAllItems} = useApiQuery({
        actionName: 'Get all items request',
        apiQueryMethod: api.useLazyGetAllObjectsQuery
    });

    useEffect(() => {
        getAllItems({modelName});
    }, [getAllItems, modelName]);

    if (!items) return <div><h1>Loading...</h1></div>;

    if (id === undefined) throw new Error('id must be defined, check your backend model');

    return (
        <Box
            display='flex'
            alignItems='stretch'
            sx={containerStyle as SxProps}
        >
            <ListMUI
                style={{width: '100%'}}
            >
                <ListNewItem/>
                {
                    haveItems ?
                        items.all.map((item, index) => (
                            <ListItem
                                key={index}
                                itemId={String(item.id)}
                                itemName={item[other as string] as string}
                                modelName={modelName}
                                selectedItemId={selectedItemId}
                            />
                        )) :
                        <div
                            style={{
                                width: 'var(--items-list-width)',
                                textAlign: 'center',
                                paddingTop: '1em',
                                color: '#939393'
                        }}
                        >
                            No Items
                        </div>
                }
            </ListMUI>
        </Box>
    )
};

export default List;
