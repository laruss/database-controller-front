import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useAppSelector} from "../app/hooks";
import {changeTab} from "../helpers/dispatchers";
import DataPage from "../pages/DataPage";
import {selectModels} from "../app/slices/appSlice";
import useApiQuery from "../app/api/hooks/useApiQuery";
import {api} from "../app/api/api";
import {selectModel} from "../app/slices/tabDataSlice";
import {SyntheticEvent, useEffect} from "react";
import {handleItemSwitch} from "../helpers/functions";

export default function Tabs() {
    const models = useAppSelector(selectModels);
    const currentModel = useAppSelector(selectModel);

    const {queryTrigger: getModels} = useApiQuery({
        actionName: 'Get models request',
        apiQueryMethod: api.useLazyGetModelsQuery
    });

    const {queryTrigger: getListItemFields} = useApiQuery({
        actionName: 'Get list item fields request',
        apiQueryMethod: api.useLazyGetListItemFieldsQuery
    });

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        handleItemSwitch(() => changeTab(newValue));
    };

    useEffect(() => {
        getModels({});
        getListItemFields({});
    }, [getModels, getListItemFields]);

    if (!models) return <div><h1>Loading...</h1></div>;

    return (
        <Box
            sx={{width: '100%', typography: 'body1', height: '100vh', display: 'flex', flexDirection: 'column'}}
        >
            <TabContext value={currentModel as string}>
                <Box sx={{borderBottom: 1, borderColor: 'divider', height: "var(--header-height)"}}>
                    <TabList onChange={handleChange}>
                        {
                            Object.keys(models).map((model, index) => (
                                <Tab key={index} label={model} value={model}/>
                            ))
                        }
                    </TabList>
                </Box>
                {
                    currentModel &&
                    <TabPanel
                        sx={{flexGrow: 1, padding: 0, overflow: 'hidden'}}
                        value={currentModel}
                    >
                        {currentModel && <DataPage/>}
                    </TabPanel>
                }
            </TabContext>
        </Box>
    );
};
