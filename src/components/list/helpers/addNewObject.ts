import {AppDispatch} from "../../../app/store";
import {setCurrentObjectAsNew} from "../../../app/slices/tabDataSlice";

interface AddNewObjectInterface {
    dispatch: AppDispatch;
}

const addNewObject = ({dispatch}: AddNewObjectInterface) => {
    dispatch(setCurrentObjectAsNew());
};

export default addNewObject;
