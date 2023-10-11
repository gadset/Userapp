import { MenuItem, Typography, Grid , Button} from '@mui/material';
import { styled } from '@mui/system';
import { TextField, IconButton, Box } from '@mui/material';
import {InputAdornment} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useState } from 'react';
import { setMobileValue, setModelValue, setUserIdValue, setdeviceValue } from '../reduxstore';
import { useDispatch } from 'react-redux';
import search from './Newlogos/search.svg';
import { useTheme } from '@emotion/react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const StyledTextField = styled(TextField)`
  border-radius: 5px;
  border: none
`;


const Selectdevice = () => {
    const [cookies] = useCookies(['access_token']);
    const history = useHistory();
    const [brand, setBrand]= useState("");
    const [devices, setDevices] = useState([]);
    const [data1, setdata1] = useState([]);
    const [phone,setPhone] = useState('');
    const location = useLocation();
    const theme = useTheme();
    const dispatch = useDispatch();

    const width = 500;


    const handleChangebrand = async(e) => {
      let bra = e.target.value;
      console.log(bra);
      setBrand(bra);
      try{
        const response = await axios.get(
          `https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=8346&keys=Brand,Model&where={"Brand":"${bra}"}`,
          {
            headers: {
              'X-Parse-Application-Id': '8DqRF1XoWp8wGKjNlOanRTNPm4LIH6aLdg0Sxqu5', // This is your app's application id
              'X-Parse-REST-API-Key': 'YhU35J5XJPyAZjfmstAD8CrWU0UrKY3cudWsJNic', // This is your app's REST API key
            }
          }
        );
        const data = response.data.results; // Here you have the data that you need
        console.log(data);
        setDevices(data);
      }
      catch{
        toast.error("some error occured");
      }
     
    }
    

    useEffect(() => {
      const GetData = async() => {
        const response = await axios.get(
          'https://parseapi.back4app.com/classes/Cellphonedataset_Cell_Phone_Models_By_Brand?count=1&limit=108',
          {
            headers: {
              'X-Parse-Application-Id': '8DqRF1XoWp8wGKjNlOanRTNPm4LIH6aLdg0Sxqu5', // This is your app's application id
              'X-Parse-REST-API-Key': 'YhU35J5XJPyAZjfmstAD8CrWU0UrKY3cudWsJNic', // This is your app's REST API key
            }
          }
        ); 
        const data = await response.data.results; 
        console.log(data);
        setdata1(data);
      }
      GetData();
    }, [])

    const handleDeviceSelected = () =>{
      dispatch(setModelValue(phone));
      dispatch(setdeviceValue(brand));
      localStorage.setItem('device', brand);
      localStorage.setItem('model', phone);
      localStorage.setItem('LoginToNavbar', 1);

      console.log(cookies.access_token)
      if ( cookies.access_token === 'undefined' || cookies.access_token === null || cookies.access_token === '') {
          history.push('/loginpage');
      } else {
          history.push({
              pathname: '/issuepage',
          });
      }
    }
    
    return(
        <Grid container sx={{display:'flex', justifyContent:'center', textAlign:'left', marginTop:'10px'}}>
          {
            width === 500 ? <>
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
                  >
                    {
                        data1.map((brand1) => (
                            <MenuItem key={brand1.objectId} value={brand1.Cell_Phone_Brand}>
                                {brand1.Cell_Phone_Brand}
                            </MenuItem>
                        ))
                    }
                  </StyledTextField>
              </Grid>


              <Grid item sx={{width:'95%', marginTop: theme.spacing(2)}}>
                <Typography variant='h4'>Select Device</Typography>
                <StyledTextField
                  hiddenLabel
                  size="small"
                  select
                  placeholder="Search your device"
                  fullWidth
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                >
                  {
                      devices.map((brand1) => (
                          <MenuItem key={brand1.Model} value={brand1.Model}>
                              {brand1.Model}
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
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">
                    //       <IconButton edge="end">
                    //       <img src={search} alt='searchbox'/>
                    //       </IconButton>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  >
                  </StyledTextField>
                </Grid>
          
          <Grid item sx={{width:'95%', marginTop: theme.spacing(2)}}>
            <Typography variant='h4'>Select Device</Typography>
            <StyledTextField
              hiddenLabel
              size="small"
              placeholder="Search your device"
              fullWidth
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton edge="end">
              //       <img src={search} alt='searchbox'/>
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
            >
            </StyledTextField>
          </Grid></>

          }
           
          
          <Button sx={{padding:'4px', width:'150px', marginTop: theme.spacing(2)}} onClick={() => handleDeviceSelected()}>Submit</Button>
        </Grid>
    )
}


export default Selectdevice;