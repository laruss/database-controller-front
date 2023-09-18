import ListItemMUI from "@mui/material/ListItem";
import {ListItemButton} from "@mui/material";
import ListItemDelete from "./ListItemDelete";
import React from "react";
import {ListItemInterface} from "../../types/components";
import {setCurrentId} from "../../app/slices/tabDataSlice";
import {useAppDispatch} from "../../app/hooks";
import {handleItemSwitch} from "../../helpers/functions";

const ListItem = (props: ListItemInterface) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (props.itemId === props.selectedItemId) return;
        handleItemSwitch(() => dispatch(setCurrentId(props.itemId)));
    };

    return (
        <ListItemMUI>
            <ListItemButton
                selected={props.selectedItemId === props.itemId}
                onClick={handleClick}
            >
                {props.itemName}
            </ListItemButton>
            {
                props.itemId && (
                    <ListItemDelete
                        itemId={props.itemId}
                        modelName={props.modelName}
                    />
                )
            }
        </ListItemMUI>
    )
};

export default ListItem;
