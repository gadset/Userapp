import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setAddressValue } from "../../reduxstore";
import { useTheme } from "@emotion/react";
import Geocode from "react-geocode";
import { toast } from "react-toastify";
import { Cookies, useCookies } from "react-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const UpdateAddress = ({onData, handlenextpage}) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [addressName, setAddressName] = useState('');
  const [address, setAddress] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const [cookies] = useCookies([]);
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

  useEffect(() => {

	async function start () {
	   fetch(process.env.REACT_APP_BACKEND+'users/getAddresses', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
		// 'x-token' : cookies.access_token
		'x-token' : localStorage.getItem('access_token'),
      }, 
    }).then(response => response.json())
    .then(json => {
setMobileNumber(json?.phone)
setName(json?.name);
setAddress(json?.addresses);
	});  
		
	}
	start();
  }, []);
  

  const [latlng, setlatlng] = useState({});

  const handlenext = () => {
    // const address = {
    //   'pin' : pinCode,
    //   'flat' : flatNumber,
    //   'landmark' : landmark,
    //   'city' : city,
    //   'state' : state,
    //   'place' : place
    // };

	const address = `${flatNumber}, ${landmark}, ${city}, ${state}, ${pinCode}` ; 
    fetch(process.env.REACT_APP_BACKEND+'users/addAddress', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
		// 'x-token' : cookies.access_token
		'x-token' : localStorage.getItem('access_token'),
      }, 
      body : JSON.stringify({
        addressName : addressName, 
		newAddress : address,
		name
      }),   
    }).then(response => response.json())
    .then(json => {
	toast.success('Address added succesfully') ; 
	history.push('/profile')});  
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
			  disabled={true}
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

			<TextField
              variant="outlined"
              required
              size='small'
              id="AddressName"
              name="AddressName"
              placeholder="Enter name of address"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
			  style={{marginTop : '12px'}}
            /> 

        </Grid>

{
	address?.length > 0 ?
<Grid>
	<Typography>Addresses already present are </Typography>
	{
		address.map((item) => (
			<Typography>{item?.name}</Typography>
		))
	}
</Grid>
:
<></>
}
        
        <Box sx={{ mt: 1, textAlign: "right" }}>
          <Button type="submit" onClick={handlenext} >
            Add address
          </Button>
        </Box>
    </Grid>
  );
};

export default UpdateAddress;
