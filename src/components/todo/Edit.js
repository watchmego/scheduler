import React, { useContext } from "react";
import { mainContext } from "../../pages/home/Main";
import { Write } from "../db/dbQueries";
import { ToDoForm } from "./toDoForm";


export const EditToDo = () => {

    const { editValues } = useContext(mainContext)



    // regex - leaving in case the date format needs to be changed
    // const regex = /(\d{4})\-(\d{2})\-(\d{2})/;
    // const regexData = id.start .match(regex);
    // const formattedDate = `${regexData[3]}/${regexData[2]}/${regexData[1]}`;


    return(
        <ToDoForm props={{editValues}} />
     )
}