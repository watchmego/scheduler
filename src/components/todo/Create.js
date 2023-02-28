import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { format, parseISO } from 'date-fns';
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
import { MainViewContext } from "../../pages/home/Main";
import { Stores } from "../db/initDb";
import { Write } from "../db/dbQueries";

const formFields = {
    title: "",
    description: "", 
    priority: 2,
    start: format(new Date(), 'yyyy-MM-dd'),
};    

const priority = [
    { value: 1, label: "High"},
    { value: 2, label: "Medium"},
    { value: 3, label: "Low"}
];


export const CreateToDo = () => {


    const { control, handleSubmit } = useForm({
        values: formFields,
        mode: 'onChange'
    });

    const { mainView, setMainView, setDbUpdated} = useContext(MainViewContext);

    const [ deadlineDate, setDeadlineDate ] = useState(new Date())

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
        deadline: {
          validate: (deadlineDate) => {
            if (deadlineDate === null) {
              return 'Please input the deadline';
            }
            if (!deadlineDate.format('YYYYMMDD').match(/^\d{8}$/g)) {
              return 'Invalid date format';
            }
            return true;
          },
        },
      };

    const submitForm = (values) => {

        //submit todo to indexedDB
        Write(values);
        setDbUpdated(true);
        setMainView('default');
        
    };

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
                    // rules={validationRules.deadline}
                    render={({ field, fieldState }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                {...field}
                                label="Deadline"
                                inputFormat="yyyy/MM/dd"
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