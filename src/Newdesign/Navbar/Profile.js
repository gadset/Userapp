import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './Login.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Profile() {
  const [cookies, removeCookie] = useCookies(['access_token']);
  const [data, setdata] = useState([]);
  const history = useHistory();
  console.log(cookies.access_token)

  useEffect(() => {
    if (cookies.access_token == 'undefined') {
      history.push({ pathname: '/loginpage' });
    }
  }, []);

  useEffect(() => {
    const Getdata = async() => {
      try {
        const res = await axios.get(process.env.REACT_APP_BACKEND + 'users/profile', {
          headers: {
            'x-token': cookies.access_token
          }
        })
        const data = res.data;
        setdata(data.user);
        console.log(data.user);
      } catch(error) {
        console.error(error);
      }
    }
    Getdata()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    removeCookie('access_token');
    localStorage.clear();
    window.location.href = '/'
  }


  return (
    <Box>
          <Grid>
            <Grid item sx={{display: 'flex', justifyContent: 'center', width: '100%', margin: '20px auto 10px auto'}}>
                <Typography sx={{fontSize: '24px', fontFamily: 'Work sans'}} >
                    Profile
                </Typography>
            </Grid>
            <Grid container sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                    <Typography sx={{textAlign: 'left', fontSize: '18px', fontFamily: 'Work sans', color: '#000000'}} >Name : </Typography>
                    <Typography sx={{textAlign: 'left', fontSize: '18px',  fontFamily: 'Work sans', color: '#000000'}} >{data.name}  </Typography>
                </Grid>
                <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                    <Typography sx={{textAlign: 'left', fontSize: '18px',  fontFamily: 'Work sans', color: '#000000'}} >Phone Number : </Typography>
                    <Typography sx={{textAlign: 'left', fontSize: '18px', fontFamily: 'Work sans', color: '#000000'}} > {data.phone} </Typography>
                </Grid>
                <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                    <Typography sx={{textAlign: 'left', fontSize: '18px', fontFamily: 'Work sans', color: '#000000'}} >Address : </Typography>
                    <Typography sx={{textAlign: 'left', fontSize: '18px',  fontFamily: 'Work sans', color: '#000000'}} > {data.address}  </Typography>
                </Grid>
                <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                    <Link to='/orders' style={{textDecoration : 'none'}}>
                      <Typography sx={{textAlign: 'left', fontSize: '18px' , fontFamily: 'Work sans', color: '#000000', color: 'blue'}} >Orders </Typography>
                    </Link>

                </Grid>
                <button onClick={handleSubmit} style={{width: '100px', padding: '8px 15px', border: 'none', backgroundColor: '#D9D9D9', borderRadius: '5px', margin: '10px 2.5%', cursor: 'pointer'}}> Sign Out </button>
            </Grid>
          </Grid>
    </Box>
  );
}

export default Profile;
