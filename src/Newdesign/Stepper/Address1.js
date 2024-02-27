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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useCookies } from "react-cookie";
import Autocomplete from '@mui/material/Autocomplete';


const AddressForm1 = ({onData, handlenextpage}) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(localStorage['phonenumber'] || "");
  const [pinCode, setPinCode] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [addressName, setAddressName] = useState("");
  const [address, setAddress]=useState([]);
  const dispatch = useDispatch();
  const theme = useTheme()
  const [saveAddress, setSaveAddress] = useState(false);
  const [cookies] = useCookies([]);
const [selectedAddress, setSelectedAddress] = useState(null);


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
  }, [])

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

    const handleCheckboxChange = (event) => {
    setSaveAddress(event.target.checked);
  };

  const [latlng, setlatlng] = useState({});
  Geocode.setApiKey("AIzaSyBKIByYCgUyIZYIfQUchm4ZVtowK0tvfhg");
//   console.log(localStorage.getItem('DeviceId'))
//   const storedData = localStorage.getItem('DeviceBook');
//   console.log(storedData)

  const handleAddressChange = (event, newValue) => {
    setSelectedAddress(newValue);
  };

  const handleAddNewAddress = () => {
setSelectedAddress(null);
setSaveAddress(true);

  }

  const handleNext1 = () => {

	dispatch(setAddressValue(selectedAddress?.address));
	handlenextpage();
  }

  const handlenext = () => {
    // const data = {
    //   'name' : name,
    //   'phone': mobileNumber,
    //   'pin' : pinCode,
    //   'flat' : flatNumber,
    //   'landmark' : landmark,
    //   'city' : city,
    //   'state' : state,
    //   'place' : place
    // };
	// if(saveAddress) {
	let address1 = `${flatNumber}, ${landmark}, ${city}, ${state}, ${pinCode}` ; 
    fetch(process.env.REACT_APP_BACKEND+'users/setaddress', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
		// 'x-token' : cookies.access_token
		'x-token' : localStorage.getItem('access_token'),

      }, 
      body : JSON.stringify({
        addressName : addressName, 
		newAddress : address1,
		name
      }),   
    }).then(response => response.json())
    .then(json => {
		dispatch(setAddressValue(address1));
		handlenextpage();});  
	// }
	// else{
	// 	dispatch(setAddressValue(selectedAddress));
	// 	handlenextpage();
	// }
	
    
  }
  return (
	<>
	{ address?.length > 0 && !saveAddress ?
	<div style={{width : '95%', margin : 'auto', marginTop : '16px'}}>
		<Typography variant="h5" sx={{m:1}}>
       Select from previous addresses
      </Typography>
	<Autocomplete
        options={address}
        getOptionLabel={(option) => `${option.name}: ${option.address?.city}`}
        value={selectedAddress}
        onChange={handleAddressChange}
        renderInput={(params) => <TextField {...params} label="Select Address" />}
      />
	  <div style={{marginTop : '12px', display : 'flex', justifyContent : 'space-between'}}>
	  	<Button onClick={handleAddNewAddress} >
        Add New Address
      	</Button>

      	<Button onClick={handleNext1}>
        Submit
      	</Button>
	  	  </div>
	  </div>
	  :
	  <Grid container sx={{ marginLeft: 0, width: "100%", display:'flex',marginTop : '16px', flexDirection:'column', alignItems:'center' ,marginBottom: '30px',}}>
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
       
          {/* <Typography variant="h4">Mobile Number<sup>*</sup></Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
			  disabled
              size='small'
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
             */}
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
          size='small'
          variant="outlined"
          fullWidth
		  placeholder="Enter name of this address"
		  style={{marginTop : '8px'}}
          value={addressName}
          onChange={(e) => setAddressName(e.target.value)}
        />


        </Grid>

        

        
        <div style={{marginTop : '12px', display : 'flex', justifyContent : 'space-between'}}>
			{
				address?.length > 0 && (
<Button  onClick={() => setSaveAddress(false)} >
            Select from existing
          </Button>
				)
			}
		
          <Button  onClick={handlenext} >
            Add address
          </Button>
        </div>
    </Grid>
	}
	</>
  );
};

export default AddressForm1;
