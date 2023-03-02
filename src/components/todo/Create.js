import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { format, parseISO } from 'date-fns';
import {enNZ} from 'date-fns/locale';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { mainContext } from "../../pages/home/Main";
import { Stores } from "../db/initDb";
import { Write } from "../db/dbQueries";
import { ToDoForm } from "./toDoForm";


export const CreateToDo = () => {

    return(
        <ToDoForm />
    )
}