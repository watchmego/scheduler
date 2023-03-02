import { useContext, useEffect, useState, useCallback } from "react";
import 'react-calendar/dist/Calendar.css';
import { MainViewContext } from "../../pages/home/Main";
import { format } from 'date-fns';
import { findByDate } from "../db/dbQueries";

import './sideBar.scss';

export const SideBar = () => {

    const { setMainView, dbUpdated, editValues, setEditValues } = useContext(MainViewContext);

    const today = new Date();

    const [toDoToday, setToDoToday] = useState()
    useEffect(() => {
            findByDate(today)
                .then((result) => {
                    console.log(today);
                    console.log(result);
                    setToDoToday(result);
                    // do something with toDoToday
                })
                .catch((error) => {
                    console.error(error);
                    // handle the error
                });
      },[dbUpdated]);

      const OnSelectEvent = useCallback((id) => {
        setEditValues(id);
        setMainView("Edit");
      }, [])

    return (
        <div className="sideBar">
           
            <div>
                <h3>Today:</h3>

                {/* List of today's items */}
                
                <ul >
                    {toDoToday && toDoToday.map((item) => {
                        return(
                            <li key={item[1].id} value={item}>
                                <button onClick={() => OnSelectEvent(item[1])}>
                                    {item[1].title}
                                </button>
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