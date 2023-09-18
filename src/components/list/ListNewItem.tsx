import ListItemMUI from "@mui/material/ListItem";
import {ListItemButton, SxProps} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectObjects} from "../../app/slices/tabDataSlice";
import {newItemStyle} from "../../styles/list";
import useButtonDisabled from "./helpers/useButtonDisabled";
import addNewObject from "./helpers/addNewObject";

const ListNewItem = () => {
    const objects = useAppSelector(selectObjects);
    const {buttonDisabled} = useButtonDisabled({...objects});
    const dispatch = useAppDispatch();

    const handleClick = () => {
        addNewObject({dispatch});
    };

    return (
        <ListItemMUI>
            <ListItemButton
                sx={newItemStyle as SxProps}
                onClick={handleClick}
                disabled={buttonDisabled}
            >
                add new
            </ListItemButton>
        </ListItemMUI>
    )
};

export default ListNewItem;
