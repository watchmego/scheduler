import { Select } from '../db/dbQueries';

export const EditToDo = ({id}) => {


    const currentToDo = Select(id);
    console.log('editing todo',currentToDo);
    // const submitForm = (values) => {
    //     //submit todo to browserStorage
    //     const start = values.deadline;
    //     const end = values.deadline;

    //     const data = {
    //         start: start,
    //         end: end,
    //         title: values.name,
    //         id: id
    //     }
    //     setToDo([...toDo, data]);
    //     setMainView("default");
    // };

    // return(
    //     <Container maxWidth="sm" sx={{ py: 6}}>
    //         <Typography variant="h5" sx={{ mb: 3}}>
    //             What do you need to do?
    //         </Typography>


    //         <Stack component="form" noValidate onSubmit={handleSubmit(submitForm)} spacing={3}>
    //             <Controller 
    //                 name="name"
    //                 control={control}
    //                 rules={validationRules.name}
    //                 render={({ field, fieldState }) => (
    //                     <TextField
    //                         {...field}                            
    //                         fullwidthtype="text"
    //                         label="Name"
    //                         error={fieldState.error?.message}
    //                         helperText={fieldState.error?.message}
    //                     />
    //                 )}
    //             />
    //             <Controller 
    //                 name="description"
    //                 control={control}
    //                 rules={validationRules.description}
    //                 render={({ field, fieldState }) => (
    //                     <TextField
    //                         {...field}
    //                         fullwidthtype="text"
    //                         label="Description"
    //                         error={fieldState.error?.message}
    //                         helperText={fieldState.error?.message}
    //                         multiline
    //                         rows={4}
    //                     />
    //                 )}
    //             />
    //             <Controller 
    //                 name="priority"
    //                 control={control}
    //                 rules={validationRules.priority}
    //                 render={({ field, fieldState }) => (
    //                     <FormControl fullWidth error={!!fieldState.error?.message}>
    //                         <InputLabel id="area-label">Priority</InputLabel>
    //                         <Select {...field} labelId="area-label" label="Priority">
    //                         {priority.map(({ label, value }) => (
    //                             <MenuItem key={value} value={value}>
    //                             {label}
    //                             </MenuItem>
    //                         ))}
    //                         </Select>
    //                         <FormHelperText>{fieldState.error?.message}</FormHelperText>
    //                   </FormControl>
    //                 )}
    //             />
    //             <Controller
    //                 name="deadline"
    //                 control={control}
    //                 // rules={validationRules.deadline}
    //                 render={({ field, fieldState }) => (
    //                     <LocalizationProvider dateAdapter={AdapterDateFns}>
    //                         <DatePicker
    //                             {...field}
    //                             label="Deadline"
    //                             inputFormat="yyyy/MM/dd"
    //                             renderInput={(params) => (
    //                             <TextField
    //                                 {...params}
    //                                 error={!!fieldState.error?.message}
    //                                 helperText={fieldState.error?.message}
    //                             />
    //                             )}
    //                             // Validation is not fired with the default react-hook-form mode. So you need this custom onChange event handling.
    //                             onChange={(date) => 
    //                                 {
    //                                     field.onChange(date)
    //                                 } 
    //                             }
    //                         />
    //                     </LocalizationProvider>
    //                 )}
    //             />
    //             <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
    //                 <Button type="submit" color="primary" variant="contained">
    //                     Submit
    //                 </Button>
    //                 <Button onClick={() => setMainView("default")}>
    //                     Cancel
    //                 </Button>
    //             </Box>
    //         </Stack>
    //     </Container>
    // )
}