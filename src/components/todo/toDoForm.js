import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Write } from "../db/dbQueries";


const priority = [
    { value: 1, label: "High"},
    { value: 2, label: "Medium"},
    { value: 3, label: "Low"}
];



export const ToDoForm = ({props}) => {

    const { setMainView, setDbUpdated} = useContext(mainContext);
    // console.log(props);
    // const formFields = props.formFields;
    // console.log(formFields);

    const [formFields, setFormFields] = useState({
        title: "",
        description: "", 
        priority: 2,
        start: new Date(),
        end: new Date(),        
    });   

    const { control, handleSubmit } = useForm({
        values: formFields,
        mode: 'onChange'
    });
    
 


    const validationRules = {
        name: {
          required: 'Please input todo name',
          maxLength: { value: 30, message: 'Name must be 30 characters or less' },
        },
        description: {
          maxLength: { value: 1000, message: 'Description must be 1000 characters or less' },
        },
        priority: {
          required: 'Please select a priority',
        },
        start: {
          validate: (start) => {
            if (start === null) {
                console.log('start is null');
              return 'Please input the deadline';
            }

            console.log(Date.parse(start));
            // if (!format(start,'DDMMYYYY').match(/^\d{8}$/g)) {
            //   return 'Invalid date format';
            // }
            if (formFields.end && start >= formFields.end) {
                return 'Start must be earlier than End'
            }
            return true;
          },
          end: {
            validate: (end) => {
              if (end === null) {
                return 'Please input the deadline';
              }
              if (!end.format('DDMMYYYY').match(/^\d{8}$/g)) {
                return 'Invalid date format';
              }
              if (formFields.start && formFields.start >= end) {
                return 'Start must be earlier than End'
            }
              return true;
            },
          },
        },
      };

    const submitForm = (values) => {

        //submit todo to indexedDB
        console.log(values);
        Write(values);
        setDbUpdated(true);
        setMainView('default');
        
    };

    useEffect(() => {
        console.log('re-rendering', props);
        if(props) {
            setFormFields({
                ...formFields,
                title: props.editValues.title,
                start: props.editValues.start,
                end: props.editValues.end,
            })
        }

    },[props])


    return(
        <Container maxWidth="sm" sx={{ py: 6}}>
            <Typography variant="h5" sx={{ mb: 3}}>
                What do you need to do?
            </Typography>


            <Stack component="form" noValidate onSubmit={handleSubmit(submitForm)} spacing={3}>
                <Controller 
                    name="title"
                    control={control}
                    rules={validationRules.name}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}                            
                            fullwidthtype="text"
                            label="Name"
                            error={fieldState.error?.message}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Controller 
                    name="description"
                    control={control}
                    rules={validationRules.description}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            fullwidthtype="text"
                            label="Description"
                            error={fieldState.error?.message}
                            helperText={fieldState.error?.message}
                            multiline
                            rows={4}
                        />
                    )}
                />
                <Controller 
                    name="priority"
                    control={control}
                    rules={validationRules.priority}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error?.message}>
                            <InputLabel id="area-label">Priority</InputLabel>
                            <Select {...field} labelId="area-label" label="Priority">
                            {priority.map(({ label, value }) => (
                                <MenuItem key={value} value={value}>
                                {label}
                                </MenuItem>
                            ))}
                            </Select>
                            <FormHelperText>{fieldState.error?.message}</FormHelperText>
                      </FormControl>
                    )}
                />
                <Controller
                    name="start"
                    control={control}
                    rules={validationRules.start}
                    render={({ field, fieldState }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enNZ}>
                            <DateTimePicker
                                {...field}
                                label="Deadline"
                                inputFormat="dd/MM/yyyy HH:mm"
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                />
                                )}
                                // Validation is not fired with the default react-hook-form mode. So you need this custom onChange event handling.
                                onChange={(date) => 
                                    {
                                        field.onChange(date)
                                    } 
                                }
                            />
                        </LocalizationProvider>
                    )}
                />
                <Controller
                    name="end"
                    control={control}
                    rules={validationRules.end}
                    render={({ field, fieldState }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DateTimePicker
                                {...field}
                                label="End"
                                inputFormat="dd/MM/yyyy HH:mm"
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={!!fieldState.error?.message}
                                    helperText={fieldState.error?.message}
                                />
                                )}
                                // Validation is not fired with the default react-hook-form mode. So you need this custom onChange event handling.
                                onChange={(date) => 
                                    {
                                        field.onChange(date)
                                    } 
                                }
                            />
                        </LocalizationProvider>
                    )}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                    <Button onClick={() => setMainView("default")}>
                        Cancel
                    </Button>
                </Box>
            </Stack>
        </Container>
    )
}