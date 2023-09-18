import {FieldProps, findSchemaDefinition, RJSFSchema} from "@rjsf/utils";
import ArrayField from "@rjsf/core/lib/components/fields/ArrayField";
import MultiRefDropdown from "./MultiRefDropdown";

const CustomArrayField = (props: FieldProps<any[], RJSFSchema, any>) => {
    const {schema, required, name, disabled, formData, onChange, registry} = props;
    const {items} = schema as { [key: string]: any };
    const isRefsArray = Boolean(items && items['$ref'].includes('DbRefModel'));
    const realSchema = findSchemaDefinition(items["$ref"], registry.rootSchema);

    if (isRefsArray) {
        return (
            <MultiRefDropdown
                label={name}
                required={Boolean(required)}
                disabled={disabled}
                formData={formData}
                onChange={onChange}
                schema={realSchema}
            />
        );
    }

    return <ArrayField {...props} />;
};

export default CustomArrayField;
