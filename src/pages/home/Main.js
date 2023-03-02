import { createContext, useState } from "react"
import { SideBar } from "../../components/sideBar/SideBar";
import { InfoPanel } from "../../components/infoPanel/infoPanel";
import "./main.scss";

export const mainContext = createContext({
    mainView: "default",
    setMainView: () => {},
    dbUpdated: true,
    setDbUpdated: () => {},
    editValues: null,
    setEditValues: () => {},

});

export const Main = () => {

    const [ mainView, setMainView ] = useState('default');
    const [ dbUpdated, setDbUpdated] = useState(true);
    const [ editValues, setEditValues ] = useState(null);

    return (
        <div className="main" >
            <mainContext.Provider value={{mainView, setMainView, dbUpdated, setDbUpdated, editValues, setEditValues}}>
                <SideBar />
                <InfoPanel/>
            </mainContext.Provider>
        </div>
    )
}