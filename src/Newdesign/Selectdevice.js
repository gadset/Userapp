import { MenuItem, Typography, Grid , Button} from '@mui/material';
import { styled } from '@mui/system';
import { TextField, IconButton, Box } from '@mui/material';
import {InputAdornment} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from 'react';
import SearchComponent from './Searchcomponent';
import apple from '../logos/apple.svg';
import mi from '../logos/mi.svg';
import motorola from '../logos/motorola.svg';
import nothing from '../logos/nothing.svg';
import oneplus from '../logos/oneplus.svg';
import oppo from '../logos/oppo.svg';
import poco from '../logos/poco.svg';
import realme from '../logos/realme.svg';
import samsung from '../logos/samsung.svg';
import vivo from '../logos/vivo.svg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useState } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { setMobileValue, setModelValue } from '../reduxstore';
import { useDispatch } from 'react-redux';
import search from './Newlogos/search.svg';
import { useTheme } from '@emotion/react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const StyledTextField = styled(TextField)`
  background-color: #D9D9D9;
  border-radius: 5px;
`;
const Selectdevice = () => {
    const history = useHistory();
    const [brand, setBrand]= useState("");
    const [devices, setDevices] = useState([]);
    const [devicearray, setDevicearr]= useState([]);
    const [phone,setPhone] = useState('');
    const location = useLocation();
    const device = location.state.device;
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleChangebrand = (e) => {
      let bra = e.target.value;
      console.log(bra);
      setBrand(bra);
      const dbRef = ref(getDatabase());
        get(child(dbRef, bra)).then((snapshot) => { 
          if (snapshot.exists()) {
            setDevices(snapshot.val());    
            console.log(snapshot.val());
            setDevicearr(Object.keys(snapshot.val()))  ;        //console.log(data)
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }
    
    const data1 = [
        {"name" : "apple" , "logo" : apple},
        {"name" : "xiaomi", "logo" :mi },
        {"name" : "motorola", "logo" :motorola },
        {"name" : "nothing" , "logo" : nothing},
        {"name" : "onePlus", "logo" : oneplus },
        {"name" : "oppo", "logo" : oppo},
          {"name" : "poco", "logo" : poco},
          {"name" : "realme" , "logo" : realme },
          {"name" : "samsung", "logo" :samsung },
          {"name" : "vivo", "logo" :vivo },

    ]

    const handleDeviceSelected = () =>{
      dispatch(setModelValue(brand + phone));
      if(localStorage.getItem("verified")!=='yes'){
        history.push('/numberinput');
      }
      else{
        dispatch(setMobileValue(localStorage.getItem('phonenumber')))
        history.push({
          pathname : '/issuepage',
        })
      }
    
    }
    return(
        <Grid container sx={{display:'flex', justifyContent:'center', textAlign:'left', marginTop:'10px'}}>
          {
            device === 'phone' ? <>
             <Grid item sx={{width:'95%'}}>
                <Typography variant='h4'>Select Brand</Typography>
            <StyledTextField
            hiddenLabel
            size="small"
          select
          placeholder="Search your brand"
          fullWidth
          value={brand}
          onChange={(e) => handleChangebrand(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                <img src={search} alt='searchbox'/>
                </IconButton>
              </InputAdornment>
            ),
          }}>
            {
                data1.map((brand1) => (
                    <MenuItem key={brand1.name} value={brand1.name}>
                        {brand1.name}
                    </MenuItem>
                ))
            }

            </StyledTextField>
            </Grid>
            <Grid item item sx={{width:'95%', marginTop: theme.spacing(2)}}>
            <Typography variant='h4'>Select Device</Typography>
            <StyledTextField
           hiddenLabel
           size="small"
          select
          placeholder="Search your device"
          fullWidth
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                <img src={search} alt='searchbox'/>
                </IconButton>
              </InputAdornment>
            ),
          }}>
            {
                devices.map((brand1) => (
                    <MenuItem key={brand1} value={brand1}>
                        {brand1}
                    </MenuItem>
                ))
            }

            </StyledTextField>
            </Grid>
        

            </>

            :
            <>
                <Grid item sx={{width:'95%'}}>
                <Typography variant='h4'>Select Brand</Typography>
            <StyledTextField
            hiddenLabel
            size="small"
          placeholder="Search your brand"
          fullWidth
          value={brand}
          onChange={(e) => handleChangebrand(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                <img src={search} alt='searchbox'/>
                </IconButton>
              </InputAdornment>
            ),
          }}></StyledTextField>
          </Grid>
          
          <Grid item item sx={{width:'95%', marginTop: theme.spacing(2)}}>
            <Typography variant='h4'>Select Device</Typography>
            <StyledTextField
           hiddenLabel
           size="small"
          placeholder="Search your device"
          fullWidth
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                <img src={search} alt='searchbox'/>
                </IconButton>
              </InputAdornment>
            ),
          }}>
            </StyledTextField>
            </Grid></>

          }
           
          
          <Button sx={{padding:'4px', width:'150px', marginTop: theme.spacing(2)}} onClick={() => handleDeviceSelected()}>Submit</Button>
        </Grid>
    )
}


export default Selectdevice;