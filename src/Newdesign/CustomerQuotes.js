import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie';

function CustomerQuotes() {
    const [cookies] = useCookies(['access_token']);
    const [data, setdata] = useState([]);
    // useEffect(()=>{if(!cookies.access_token){history.push({pathname: '/loginpage'})}})

    useEffect(() => {
        const GetData = async() => {
            const res = await axios.get('http://localhost:8003/users/getquotesdata', {
                headers: {
                    'x-token': cookies.access_token
                }
            })
            const data = res.data;
            console.log(data);
            setdata(data);
        }
        GetData();
    }, [])
    console.log(data);

    const handleOpenQuotes = ( data1) => {
        // e.preventDefault();
        localStorage.setItem('DeviceId', data1._id);
        // console.log(data1.device);
        localStorage.setItem('DeviceBook', data1.device);
        localStorage.setItem('ModelBook', data1.model);
        window.location.href= '/getquotes'
    }

  return (
    <Box>
        <Grid container>
            <Grid item sx={{display: 'flex', justifyContent: 'center', width: '100%', margin: '20px auto 10px auto'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '21.11px', fontFamily: 'Work sans'}} >
                    All Quotes
                </Typography>
            </Grid>

            <Grid container sx={{width: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '60px'}}>
                {
                    data.map((data1, index) => (
                        <Grid key={index} container onClick={() => handleOpenQuotes(data1)} sx={{backgroundColor: '#DEDEDE', width: '90%', margin: '10px auto', padding: '10px 15px', border: '1px solid #A19F9F', borderRadius: '5px', cursor: 'pointer'}}>
                            <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                                <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', fontFamily: 'Work sans', color: '#000000'}} > Device : {data1.device} </Typography>
                            </Grid>
                            <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                                <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', fontFamily: 'Work sans', color: '#000000'}} > Model : {data1.model} </Typography>
                            </Grid>
                            <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                                <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', width: '70px', fontFamily: 'Work sans', color: '#000000'}} > Issue :    </Typography>
                                <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                                {
                                    data1.issu.map((issue) => (
                                        <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', fontFamily: 'Work sans', color: '#000000'}} > {issue} </Typography>
                                    ))
                                }
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                }

            </Grid>
        </Grid>
    </Box>
  )
}

export default CustomerQuotes