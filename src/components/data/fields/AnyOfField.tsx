import {FieldProps} from "@rjsf/utils";
import {FormControl, FormGroup, FormLabel, Paper, TextField} from "@mui/material";
import AnyOfField from "@rjsf/core/lib/components/fields/MultiSchemaField";

const CustomAnyOfField = (props: FieldProps) => {
    const {schema, name, formData,} = props;

    if (name === "id") return (
        <TextField
            id='object-id-textfield'
            value={formData ? formData : ""}
            label={`ID will be generated automatically`}
            disabled={true}
            style={{cursor: 'not-allowed'}}
        />
    );

    if (!schema) return null;

    return (
        <Paper variant="outlined" sx={{padding: '1%'}}>
            <FormControl>
                <FormLabel id={name}>{name}</FormLabel>
                <FormGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: '1em',
                        width: 'calc(95vw - var(--items-list-width))',
                        overflowX: 'auto',
                    }}
                >
                    <AnyOfField {...props}/>
                </FormGroup>
            </FormControl>
        </Paper>
    );
};

export default CustomAnyOfField;
