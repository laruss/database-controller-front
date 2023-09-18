import {
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Tooltip
} from "@mui/material";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {ListItemType} from "../../../types/api";
import useApiQuery from "../../../app/api/hooks/useApiQuery";
import {api} from "../../../app/api/api";
import {RJSFSchema} from "@rjsf/utils";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import {dbItemType} from "../../../types/common";
import useSimplified from "./useSimplified";

interface MultiRefDropdownProps {
    label: string;
    required: boolean;
    disabled: boolean;
    formData: dbItemType[] | undefined;
    onChange: (value: any) => void;
    schema: RJSFSchema;
}

const MultiRefDropdown = ({label, required, disabled, formData, onChange, schema}: MultiRefDropdownProps) => {
    const collection: string | undefined = (schema.properties?.collection as { [key: string]: any })?.default;
    const simplified = useSimplified({collection: collection as string, formData: formData || []});
    const database = '';
    const [dropdownData, setDropdownData] = useState<ListItemType[]>([]);

    const {queryTrigger: getAllObjects} = useApiQuery({
        actionName: 'Get all objects request',
        apiQueryMethod: api.useLazyGetAllObjectsForDropDownQuery,
    });

    const handleOpen = async () => {
        const data = await getAllObjects({modelName: collection});
        if (data.isSuccess) {
            setDropdownData(data.data);
        }
    };

    const handleChange = (event: SelectChangeEvent<any>) => {
        const ids = event.target.value as string[];

        ids.forEach(id => {
            if (simplified.find(item => item.id === id) === undefined) {
                onChange([...(formData || []), {collection, id, database}]);
            }
        });
    };

    const handleDelete = (id: string) => {
        onChange(
            (formData || []).filter((item) => item.id !== id)
        );
    };

    useEffect(() => {
        if (formData) {
            onChange(formData.map(item => ({...item, database})));
        }
    }, [formData]);

    return (
        <Box>
            <FormControl fullWidth required={required} disabled={disabled}>
                <InputLabel>{label}</InputLabel>
                <Select
                    multiple
                    disabled={disabled}
                    value={simplified}
                    onChange={handleChange}
                    onOpen={handleOpen}
                    input={<OutlinedInput label="Multiple Select"/>}
                    renderValue={(selected) => (
                        <Stack gap={1} direction="row" flexWrap="wrap">
                            {selected.map((value, index) => {
                                const other = Object.keys(value).find(key => key !== 'id');
                                return (
                                    <Tooltip title={value[other as string]} key={index}>
                                        <Chip
                                            label={value[other as string]}
                                            style={{maxWidth: 200}}
                                            onDelete={() => handleDelete(value.id as string)}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                        />
                                    </Tooltip>
                                )
                            })}
                        </Stack>
                    )}
                >
                    <div>Search TODO</div>
                    {
                        dropdownData.map((item, index) => {
                            const other = Object.keys(item).find(key => key !== 'id');
                            return (
                                <MenuItem key={index} value={item.id}>
                                    {item[other as string]}
                                    {simplified.some(simpItem => item.id === (simpItem.id)) ?
                                        <CheckIcon color="info"/> : null}
                                </MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
};

export default MultiRefDropdown;
