import {ListItemType} from "../../../types/api";
import useApiQuery from "../../../app/api/hooks/useApiQuery";
import {api} from "../../../app/api/api";
import {useEffect, useState} from "react";
import {dbItemType} from "../../../types/common";

interface Props {
    collection: string;
}

export interface OneItemProps extends Props {
    formData: dbItemType | null;
}

export interface ManyItemsProps extends Props {
    formData: dbItemType[];
}

function useSimplified(props: OneItemProps): ListItemType | null;
function useSimplified(props: ManyItemsProps): ListItemType[];

function useSimplified({formData, collection}: OneItemProps | ManyItemsProps): ListItemType | null | ListItemType[] {
    let _formData = Array.isArray(formData) ? formData : [formData];
    const initialSimplified = Array.isArray(formData) ? [] : null;
    const [simplified, setSimplified] = useState<ListItemType | ListItemType[] | null>(initialSimplified);

    const {queryTrigger: query} = useApiQuery({
        actionName: 'Get one object simplified request',
        apiQueryMethod: api.useLazyGetOneObjectSimplifiedQuery,
    });

    const getData = async (item: dbItemType) => {
        const result = await query({modelName: collection, id: item.id});
        if (result.isSuccess) {
            return result.data;
        } else {
            throw new Error(result.error.message);
        }
    };

    useEffect(() => {
        if (_formData.length === 0 || _formData[0] === null) return setSimplified(Array.isArray(formData) ? [] : null);

        Promise.all(_formData.map((item) => getData(item as dbItemType)))
            .then((result) => {
                setSimplified(Array.isArray(formData) ? result : result[0]);
            });
    }, [formData]);

    return simplified;
}

export default useSimplified;
