import {FieldProps} from "@rjsf/utils";
import ObjectField from "@rjsf/core/lib/components/fields/ObjectField";
import RefDropdown from "./RefDropdown";

const CustomObjectField = (props: FieldProps) => {
    const {schema, required, name, disabled, formData, onChange} = props;
    const {properties} = schema as { [key: string]: any };
    const isRef = Boolean(properties.collection && properties.database && properties.id);

    if (isRef) {
        return (
            <RefDropdown
                label={name}
                required={Boolean(required)}
                disabled={disabled}
                formData={formData.id ? formData : null}
                onChange={onChange}
                schema={schema}
            />
        );
    }

    return <ObjectField {...props} />;
};

export default CustomObjectField;
