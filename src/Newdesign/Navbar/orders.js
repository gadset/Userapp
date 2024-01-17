import { Box, Button, Grid, Typography } from '@mui/material';
import React, { Component, useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import CustomerQuotes from '../Misc/CustomerQuotes';
import styled from '@emotion/styled';
import { useCookies } from 'react-cookie';

const ButtonStyled = styled(Button) `
    text-transform: none;
    // background-color: #505050;
    // color: #FFFFFF;
    border: 1px solid #C5C5C5;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 400;
    font-family: Work Sans;

`

export default function Orders(){
  const [data, setdata ] = useState([]);
  const [show, setshow] = useState(false);
  const [cookies] = useCookies([]);

  useEffect(()=>{
 fetch(process.env.REACT_APP_BACKEND+ 'users/getorder', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
		  'x-token' : cookies.token
        }, 
        body : JSON.stringify({
          "id" : localStorage.getItem("gadsetid"),
        }),   
      })
      .then(response => response.json())
    .then(json => { setdata(json['data']);
          toast.success(json['message']);})  
}, [])

    const backgroundColor = show ? '#000000' : '';
    const bg = !show ? '#000000' : '';
    const length = data.length;
    return(
        <Box sx={{marginTop :'8px'}} >
            <Grid container sx={{width: '100%', display: 'flex', flexDirection: 'row',justifyContent: 'space-around'}}>
                <ButtonStyled  sx={{backgroundColor: backgroundColor}} onClick={(e) => setshow(true)} variant='contained'>Orders Booked</ButtonStyled>
                <ButtonStyled variant='contained' sx={{backgroundColor: bg}} onClick={(e) => setshow(false)}>Order's Bids</ButtonStyled>
            </Grid>
            {
                show ? 
                    (
                        length > 0 ?
                        data.reverse().map((data1, index) => (
                            <Box sx={{marginTop :'8px'}}>
                                <Typography variant='h4'>Order no :{index +1 } </Typography>
                                <Typography variant='body2'>Date : {data1.date}</Typography>
                                <Typography variant='body2'>Model : {data1.model}</Typography>
                                <Typography variant='body2'>Device : {data1.device}</Typography>
                                <Typography variant='body2'>Payment remaining : {data1.payment}</Typography>
                                {
                                    data1.issues.map((iss) => (
                                        <Typography>{iss}</Typography>
                                    ))
                                }
                                <Typography variant='h4' sx={{marginTop :'8px'}}>Partner Data</Typography>
                                <Typography variant='body2'>Delivery type : {data1.service} </Typography>
                                <Typography variant='body2'>Email : {data1.email} </Typography>
                                <Typography variant='body2'>Partnerid :  {data1.partnerid}</Typography>
                                <Typography variant='body2'>Name :  {data1.name}, amount :  {data1.amount}</Typography>
                                <Typography variant='body2'>Warranty :  {data1.warranty}</Typography>
                                <Typography variant='body2'>Mobile number :  {data1.phone}</Typography>     
                            </Box>
                        ))
                        :
                        <Typography  sx={{paddingTop: '20px'}}>No Previous orders to show</Typography>
                    )
                : (
                    <CustomerQuotes />
                )
            } 
        </Box>
    )
}