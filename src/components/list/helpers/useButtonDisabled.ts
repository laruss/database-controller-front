import {ListItemType} from "../../../types/api";
import {useEffect, useState} from "react";

interface useButtonDisabledInterface {
    all: ListItemType[];
}

const useButtonDisabled = ({all}: useButtonDisabledInterface) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (all) {
            const allObjectsHaveId = all.every((object) => object.id !== undefined);
            setButtonDisabled(!allObjectsHaveId);
        }
    }, [all]);

    return {buttonDisabled};
};

export default useButtonDisabled;
