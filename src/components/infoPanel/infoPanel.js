import React, { useState, useContext, useEffect, useCallback } from "react";
// import Calendar from "react-mui-calendar";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, add } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { mainContext } from "../../pages/home/Main";
import { CreateToDo } from "../todo/Create";
import { EditToDo } from "../todo/Edit";
import { getRecords } from "../db/dbQueries";
import "./infoPanel.scss"
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
    

    const { mainView, setMainView, dbUpdated, setDbUpdated, setEditValues } = useContext(mainContext);
     
    const [view, setView] = useState("month");
    const [selectAll, setSelectAll] = useState([]);

    useEffect(() => {
      if(dbUpdated === true) {
        getRecords()
          .then(function(result) {
            setSelectAll(result);
          });
      }
      setDbUpdated(false);
    },[dbUpdated]);
    
    const onSelectEvent = useCallback((id) => {
      setEditValues(id);
      setMainView("Edit");
    }, [])

    const onView = useCallback((newView) => {
      setView(newView)
    });



    return (
        <div className="infoPanel">
            {mainView === "Create" && <CreateToDo />}
            {mainView === "Edit" && <EditToDo />}
            {mainView === "default" &&          
            <div>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                events={selectAll}
                onSelectEvent={onSelectEvent}
                style={{ height: "100vh" }}
                onView={onView}
                view={view}
              />
            </div>}
        </div>
    )
}