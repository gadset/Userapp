import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
  FormControl, FormControlLabel, Checkbox, FormGroup
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setAddressValue } from "../reduxstore";

const AddressForm = ({onData, handlenextpage}) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      mobileNumber,
      pinCode,
      flatNumber,
      landmark,
      city,
    });
  };

  const handlenext = () => {
    const data = {
      'name' : name,
      'phone': mobileNumber,
      'pin' : pinCode,
      'flat' : flatNumber,
      'landmark' : landmark,
      'city' : city,
    };
    onData(data)
    dispatch(setAddressValue(data));
    handlenextpage();

  }
  return (
    <Grid container sx={{ marginLeft: 0, marginTop : '10px', width: "100%", display:'flex', flexDirection:'column', alignItems:'center' ,    marginBottom: '16px',
 }}>
      <Typography style={{color: '#056AB5',fontSize : '16px',fontFamily:'Poppins', fontStyle:'normal', margin:'8px',lineHeight : '24px', fontWeight :600}}>
       Add your Address
      </Typography>
      {/* <Button sx={{background:' #F0F0F0',
border:' 1px solid #EDECEC',
borderRadius: '20px', color:'black', width:'90%'}} variant="contained"> Use my current location</Button>
      <Divider sx={{margin:'4px', color:'black'}} /> */}
        <Grid container spacing={2} sx={{ width: "90%",  display:'flex', flexDirection:'column',      padding: '8px',marginTop:'10px',
    borderRadius : '10px' ,
    textAlign:'left' }}>
            <Typography sx={{ mb: 1 }}>Name</Typography>
            <TextField
              variant="outlined"
              required
              id="name"
              name="name"
              value={name}
              size='small'
              fullWidth
              onChange={(e) => setName(e.target.value)}
              sx={{background: '#EDECEC',
                border: '1px solid rgba(170, 168, 168, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',}}
            />
        
            <Typography sx={{ mb: 1 }}>Mobile Number</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size='small'
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              sx={{background: '#EDECEC',
                border: '1px solid rgba(170, 168, 168, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',}}
            />

            <Typography sx={{ mb: 1 }}>Pin Code</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size='small'
              id="pinCode"
              name="pinCode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              sx={{background: '#EDECEC',
                border: '1px solid rgba(170, 168, 168, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',}}
            />

            <Typography sx={{ mb: 1 }}>
              Flat, House no., Building, Company, Apartment
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size='small'
              id="flatNumber"
              name="flatNumber"
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
              sx={{background: '#EDECEC',
                border: '1px solid rgba(170, 168, 168, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',}}
            />

            <Typography sx={{ mb: 1 }}>Landmark (Optional)</Typography>
            <TextField
              variant="outlined"
              fullWidth
              id="landmark"
              size='small'
              name="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              sx={{background: '#EDECEC',
                border: '1px solid rgba(170, 168, 168, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',}}
            />

            <Typography sx={{ mb: 1 }}>City</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="city"
              size='small'
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{background: '#EDECEC',
                border: '1px solid rgba(170, 168, 168, 0.6)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',}}
            />
            <FormGroup>
  <FormControlLabel control={<Checkbox />} label="Use this as default address" />
</FormGroup>
        </Grid>
        
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button type="submit" onClick={handlenext} variant="contained"  sx={{ background: '#056AB5',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',}}>
            Add address
          </Button>
        </Box>
    </Grid>
  );
};

export default AddressForm;
