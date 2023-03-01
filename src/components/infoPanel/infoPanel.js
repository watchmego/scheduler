import React, { useState, useContext, useEffect, useCallback } from "react";
// import Calendar from "react-mui-calendar";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, add } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { MainViewContext } from "../../pages/home/Main";
import { CreateToDo } from "../todo/Create";
import { EditToDo } from "../todo/Edit";
import { Select } from "../db/dbQueries";
import "./infoPanel.scss"
import {
    Box,
    Button,
} from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})



export const InfoPanel = () => {
    

    const { mainView, setMainView, dbUpdated, setDbUpdated } = useContext(MainViewContext);
    const [ editId, setEditId ] = useState();
    const [selectAll, setSelectAll] = useState([]);

    useEffect(() => {
      if(dbUpdated === true) {
      Select().then(function(result) {setSelectAll(result); console.log('wtf',selectAll);});
      }
      setDbUpdated(false);
    },[dbUpdated]);
    
    const OnSelectEvent = useCallback((id) => {
      setEditId(id);
      setMainView("Edit");
    }, [])

    return (
        <div className="infoPanel">
            {mainView === "Create" && <CreateToDo />}
            {mainView === "Edit" && <EditToDo id={editId}/>}
            {mainView === "default" &&          
            <div>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={selectAll}
                onSelectEvent={OnSelectEvent}
                style={{ height: "100vh" }}
              />
            </div>}
        </div>
    )
}