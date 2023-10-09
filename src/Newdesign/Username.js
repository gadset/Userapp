import { Box, Grid , Typography, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import './Login.css'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

function Username() {
    const history = useHistory();
    const [name, setname] = useState('');
    const [cookies] = useCookies(['access_token']);
    useEffect(()=>{if(!cookies.access_token){history.push({pathname: '/loginpage'})}})
    const loginInfo = localStorage.getItem('LoginToNavbar');
    console.log(loginInfo);

    const handleSubmit = async() => {
        try {
            const res = await axios.post('http://localhost:8003/users/addname', {name}, {
                headers: {
                    'x-token': cookies.access_token
                }
            })
            const data = res.data;
            console.log(data);
            if(loginInfo == 0) {
                history.push({pathname : "/"})
            } else {
                history.push({pathname : "/issuepage"})
            }
        } catch(error) {
            console.error(error)
        }
    }

  return (
    <Box>
        <Grid>
            <Grid item sx={{display: 'flex', justifyContent: 'center', width: '100%', margin: '20px auto 10px auto'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '21.11px', fontFamily: 'Work sans'}} >
                    Username
                </Typography>
            </Grid>
            <Grid container sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', fontFamily: 'Work sans', color: '#000000'}} >Enter Username</Typography>
                    <TextField  
                        sx={{
                            width: '100%',
                            height: '41px',
                            border: 'none',
                            backgroundColor: '#D9D9D9',
                            margin: '5px auto'
                        }}
                        type='tel' 
                        placeholder='Praveen'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                </Grid>
                <button onClick={handleSubmit} className='btn-submit'> Submit </button>
            </Grid>
        </Grid>
    </Box>
  )
}

export default Username