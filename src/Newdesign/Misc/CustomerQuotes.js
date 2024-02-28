import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { setIssueValue, setModelValue, setdeviceValue } from '../../reduxstore';

function CustomerQuotes() {
    const [cookies] = useCookies(['access_token']);
    const [data, setdata] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();
    // useEffect(()=>{if(!cookies.access_token){history.push({pathname: '/loginpage'})}})

    useEffect(() => {
        const GetData = async() => {
            const res = await axios.get(process.env.REACT_APP_BACKEND + 'users/getquotesdata', {
                headers: {
                    // 'x-token': cookies.access_token
					'x-token' : localStorage.getItem('access_token'),
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
        localStorage.setItem('quoteid', data1._id);
        // console.log(data1.device);
        // localStorage.setItem('DeviceBook', data1.device);
		dispatch(setModelValue(data1.model));
		dispatch(setdeviceValue(data1.device));
		dispatch(setIssueValue(data1.issu));
        // localStorage.setItem('ModelBook', data1.model);
		history.push('/getquotes');
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
                    data?.map((data1, index) => (
                        <Grid key={index} container onClick={() => handleOpenQuotes(data1)} sx={{backgroundColor: '#DEDEDE', width: '90%', margin: '10px auto', padding: '10px 15px', border: '1px solid #A19F9F', borderRadius: '5px', cursor: 'pointer'}}>
                            <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                                <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', fontFamily: 'Work sans', color: '#000000'}} > <strong> Device :</strong> {data1.device} </Typography>
                            </Grid>
                            <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                                <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', fontFamily: 'Work sans', color: '#000000'}} > <strong> Model : </strong> {data1.model} </Typography>
                            </Grid>
                            <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                                <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', width: '70px', fontFamily: 'Work sans', color: '#000000'}} > <strong>Issue :  </strong> </Typography>
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