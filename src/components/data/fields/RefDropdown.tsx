import {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Box from "@mui/material/Box";
import useApiQuery from "../../../app/api/hooks/useApiQuery";
import {api} from "../../../app/api/api";
import {ListItemType} from "../../../types/api";
import {FieldProps, RJSFSchema} from "@rjsf/utils";
import {dbItemType} from "../../../types/common";
import useSimplified from "./useSimplified";

interface RefDropdownProps {
    label: string;
    required: boolean;
    disabled: boolean;
    formData: dbItemType | null;
    onChange: FieldProps['onChange'];
    schema: RJSFSchema;
}

const RefDropdown = ({label, required, disabled, formData, onChange, schema}: RefDropdownProps) => {
    const collection: string | undefined = (schema.properties?.collection as { [key: string]: any })?.default;
    const simplified = useSimplified({collection: collection as string, formData})
    const [dropdownData, setDropdownData] = useState<ListItemType[]>([]);

    const {queryTrigger: getAllObjects} = useApiQuery({
        actionName: 'Get all objects request',
        apiQueryMethod: api.useLazyGetAllObjectsForDropDownQuery,
    });

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        onChange({...formData, id: value, database: ''});
    };

    const handleOpen = async () => {
        const data = await getAllObjects({modelName: collection});
        if (data.isSuccess) {
            setDropdownData(data.data);
        }
    };

    useEffect(() => {
        simplified && simplified.id && setDropdownData([simplified]);
    }, [simplified]);

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth required={required} disabled={disabled}>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={simplified ? simplified.id : ''}
                    label={label}
                    onChange={handleChange}
                    onOpen={handleOpen}
                >
                    <div>Search TODO</div>
                    {
                        dropdownData.map((item, index) => {
                            const other = Object.keys(item).find(key => key !== 'id');
                            return (
                                <MenuItem key={index} value={item.id}>{item[other as string]}</MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}

export default RefDropdown;
