import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {DesktopTimePicker} from "@mui/x-date-pickers/DesktopTimePicker";
import { DateTimePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setDateValue } from "../reduxstore";

const DateTime1 = ({onDate, handlenextpage}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedDate,
      selectedTime,
    });

    console.log(selectedDate.getDate());
    console.log(selectedDate.getMonth());
    console.log(selectedDate.getFullYear());
  //  console.log(selectedDate.gett());
  };

  const handlenext = () => {
    const data = {
      'date' : selectedDate.getDate()+'/' + selectedDate.getMonth() + '/' +  selectedDate.getFullYear() ,
      'time' : selectedTime,
    }
    onDate(data);
    dispatch(setDateValue(data));
    handlenextpage();
  }
  return (
    <Grid container sx={{marginLeft: 0, width: "100%", display:'flex', flexDirection:'column', marginBottom: '16px',alignItems:'center',
    justifyContent:'flex-start'}}>
      <Typography variant="h5" sx={{m:1}}>
        Select Date and Time
      </Typography>
        <Grid container spacing={2} sx={{ width:'95%',padding:'8px', }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography variant="h4">Select Date<sup>*</sup></Typography>
              <DesktopDatePicker  
                value={selectedDate}
                minDate={new Date()}
                sx={{background: '#EDECEC',
                border: '1px solid rgba(170, 168, 168, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                width:'100%', }}
                onChange={(date) => setSelectedDate(date)}
                renderInput={(params) => <TextField {...params}
                />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography variant="h4">Select time<sup>*</sup></Typography>
              <DesktopTimePicker
               
                value={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                sx={{background: '#EDECEC',
                border: '1px solid rgba(170, 168, 168, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
              width:'100%'}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {format(selectedTime, "hh:mm a")}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
        </Grid>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button type="submit" onClick={handlenext} >
            Submit
          </Button>
        </Box>
    </Grid>
  );
};

export default DateTime1;
