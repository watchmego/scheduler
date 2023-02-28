import { createContext, useState } from "react"
import { SideBar } from "../../components/sideBar/SideBar";
import { CreateToDo, Edit, Delete  } from "../../components/todo/Create";
import { InfoPanel } from "../../components/infoPanel/infoPanel";
import "./main.scss";

export const MainViewContext = createContext({
    mainView: "default",
    setMainView: () => "",
    dbUpdated: true,
    setDbUpdated: () => "",

});

export const Main = () => {

    const [ mainView, setMainView ] = useState('default');
    const [ dbUpdated, setDbUpdated] = useState(true);

    return (
        <div className="main" >
            <MainViewContext.Provider value={{mainView, setMainView, dbUpdated, setDbUpdated}}>
                <SideBar />
                <InfoPanel/>
            </MainViewContext.Provider>
        </div>
    )
}