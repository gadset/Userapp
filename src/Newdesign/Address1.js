import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setAddressValue } from "../reduxstore";
import { useTheme } from "@emotion/react";
import Geocode from "react-geocode";
import { toast } from "react-toastify";

const AddressForm1 = ({onData, handlenextpage}) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(localStorage['phonenumber'] || "");
  const [pinCode, setPinCode] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme()

const [place, setplace] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      mobileNumber,
      pinCode,
      flatNumber,
      landmark,
      city,
      state
    });
  };

  const [latlng, setlatlng] = useState({});
  Geocode.setApiKey("AIzaSyBKIByYCgUyIZYIfQUchm4ZVtowK0tvfhg");
  console.log(localStorage.getItem('DeviceId'))
  const storedData = localStorage.getItem('DeviceBook');
  console.log(storedData)

  const handlenext = () => {
    const data = {
      'name' : name,
      'phone': mobileNumber,
      'pin' : pinCode,
      'flat' : flatNumber,
      'landmark' : landmark,
      'city' : city,
      'state' : state,
      'place' : place
    };
    fetch(process.env.REACT_APP_BACKEND+'users/setaddress', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify({
        id : localStorage.getItem('gadsetid'),
        address : data
      }),   
    }).then(response => response.json())
    .then(json => {handlenextpage();});  
    onData(data)
    dispatch(setAddressValue(data));
    
  }
  return (
    <Grid container sx={{ marginLeft: 0, width: "100%", display:'flex', flexDirection:'column', alignItems:'center' ,marginBottom: '30px',}}>
      <Typography variant="h5" sx={{m:1}}>
       Add your Address
      </Typography>
        <Grid container spacing={2} sx={{ width: "95%",  display:'flex', flexDirection:'column',marginTop:theme.spacing(1),borderRadius : '10px' ,textAlign:'left' }}>
   
          <Typography variant="h4">Name<sup>*</sup></Typography>
            <TextField
              variant="outlined"
              required
              id="name"
              name="name"
              value={name}
              size='small'
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
       
          <Typography variant="h4">Mobile Number<sup>*</sup></Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size='small'
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            
            <Typography variant="h4">Address<sup>*</sup></Typography>

            <Grid container sx={{display:'flex', flexDirection : 'row', mt:1, mb:1, justifyContent:'space-between'}}>
            
            <TextField
              variant="outlined"
              required
              size='small'
              id="pinCode"
              name="pinCode"
              placeholder="Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              sx={{width:'48%'}}
            /> 

            <TextField
              variant="outlined"
              required
              size='small'
              id="state"
              name="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              sx={{width:'48%'}}
            />
            </Grid>

            <Grid container sx={{display:'flex', flexDirection : 'row', mt:1, mb:1, justifyContent:'space-between'}}>
            
            <TextField
              variant="outlined"
              required
              fullWidth
              id="city"
              size='small'
              name="city"
              value={city}
              placeholder="city"
              onChange={(e) => setCity(e.target.value)}
              sx={{width:'48%'}}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              size='small'
              id="flatNumber"
              name="flatNumber"
              placeholder="House No."
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
              sx={{width:'48%'}}
            />
            </Grid>
           

            <TextField
              variant="outlined"
              fullWidth
              id="Area"
              size='small'
              name="Area"
              placeholder="Flat, Area, Company, Apartment"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />

        </Grid>
        
        <Box sx={{ mt: 1, textAlign: "right" }}>
          <Button type="submit" onClick={handlenext} >
            Add address
          </Button>
        </Box>
    </Grid>
  );
};

export default AddressForm1;
