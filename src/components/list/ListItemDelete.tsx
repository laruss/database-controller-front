import {IconButton, ListItemSecondaryAction} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ListItemDeleteInterface} from "../../types/components";
import {api} from "../../app/api/api";
import useApiMutation from "../../app/api/hooks/useApiMutation";
import {handleItemDelete} from "../../helpers/functions";

const ListItemDelete = ({itemId, modelName}: ListItemDeleteInterface) => {

    const {mutationTrigger: deleteItem} = useApiMutation({
        actionName: 'Delete object request',
        apiMutationMethod: api.useDeleteObjectMutation
    });

    const onClick = () => {
        handleItemDelete(() => deleteItem({modelName, id: itemId}));
    };

    if (itemId === "undefined") return null;

    return (
        <ListItemSecondaryAction sx={{paddingRight: "3%"}}>
            <IconButton edge="end" aria-label="comments" onClick={onClick}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    )
};

export default ListItemDelete;