import { useContext } from "react";
import 'react-calendar/dist/Calendar.css';
import { MainViewContext } from "../../pages/home/Main";
import { format, parseISO } from 'date-fns';
import './sideBar.scss';

export const SideBar = () => {

    const { mainView, setMainView, toDo } = useContext(MainViewContext);
    console.log(new Date());


    return (
        <div className="sideBar">
           
            <div>
                <h3>Today:</h3>
                {/* List of today's items */}
                
                {/* <ul >
                    {toDo.map((item) =>
                        {if(item.date === format(new Date(), 'yyyy-MM-dd')) {
                            return(
                                <li
                                    key={item.id}
                                    value={item}>{item.label}
                                </li>
                            )
                        }}
                    )}
                </ul> */}
            </div>
            <div>
                <button onClick={() => setMainView("Create")}>Create</button>
            </div>
        </div>
    )
}