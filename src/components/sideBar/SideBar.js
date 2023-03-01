import { useContext, useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { MainViewContext } from "../../pages/home/Main";
import { format, parseISO } from 'date-fns';
import { findByDate } from "../db/dbQueries";

import './sideBar.scss';

export const SideBar = () => {

    const { mainView, setMainView, dbUpdated } = useContext(MainViewContext);

    const today = format(new Date(), 'yyyy-MM-dd');
    const [toDoToday, setToDoToday] = useState()
    useEffect(() => {
            findByDate("2023-03-01")
                .then((result) => {
                    console.log(result);
                    setToDoToday(result);
                    // do something with toDoToday
                })
                .catch((error) => {
                    console.error(error);
                    // handle the error
                });
      },[dbUpdated]);



    return (
        <div className="sideBar">
           
            <div>
                <h3>Today:</h3>

                {/* List of today's items */}
                
                <ul >
                    {toDoToday && toDoToday.map((item) => {
                        return(
                            <li
                                key={item[1].id}
                                value={item}>{item[1].title}
                            </li>
                        )}
                    )}
                </ul>
            </div>
            <div>
                <button onClick={() => setMainView("Create")}>Create</button>
            </div>
        </div>
    )
}