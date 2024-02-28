import { Box, Button, Grid, Typography } from '@mui/material';
import React, { Component, useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
// import CustomerQuotes from '../Misc/CustomerQuotes';
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
  const [show, setshow] = useState(true);
  const [cookies] = useCookies([]);

  useEffect(()=>{
	try{

		fetch(process.env.REACT_APP_BACKEND+ 'users/getorder', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
		//   'x-token' : cookies.access_token
		'x-token' : localStorage.getItem('access_token'),
        }, 
        body : JSON.stringify({
          "id" : localStorage.getItem("userid"),
        }),   
      })
      .then(response => response.json())
    .then(json => { setdata(json['data']);
          toast.success(json['message']);})  
	}
 
	catch(error){
		console.log(error);
		toast.error("Error retireveing data");
	}
}, [])

    const backgroundColor = show ? '#000000' : '';
    const bg = !show ? '#000000' : '';
    const length = data.length;
    return(
        <Box sx={{marginTop :'8px'}} >
			<Typography>All orders are shown here</Typography>
            {/* <Grid container sx={{width: '100%', display: 'flex', flexDirection: 'row',justifyContent: 'space-around'}}>
                <ButtonStyled  sx={{backgroundColor: backgroundColor}} onClick={(e) => setshow(true)} variant='contained'>Orders Booked</ButtonStyled>
                <ButtonStyled variant='contained' sx={{backgroundColor: bg}} onClick={(e) => setshow(false)}>Order's Bids</ButtonStyled>
            </Grid> */}
            {
                show ? 
                    (
                        length > 0 ?
                        data?.map((data1, index) => (
                            <Box sx={{marginTop :'8px', border : '1px solid black', marginBottom : '50px'}}>
                                <Typography variant='h4'><strong>Order no :</strong>{index + 1 } </Typography>
                                <Typography variant='body2'><strong>Date : </strong> {data1.date?.date} - {data1?.date?.time}</Typography>
                                <Typography variant='body2'><strong>Model : </strong> {data1?.model}</Typography>
                                <Typography variant='body2'> <strong> Device : </strong> {data1?.device}</Typography>
                                <Typography variant='body2'><strong>Payment remaining :</strong> {data1.amount}</Typography>
                                {
                                    data1.issues.map((iss) => (
                                        <Typography>{iss}</Typography>
                                    ))
                                }
                                <Typography variant='h4' sx={{marginTop :'8px'}}>Partner Data</Typography>
                                <Typography variant='body2'><strong>Delivery type :</strong> {data1.service} </Typography>
                                <Typography variant='body2'><strong>Email : </strong>{data1.email} </Typography>
                                <Typography variant='body2'><strong>Partnerid : </strong> {data1.partnerid}</Typography>
                                <Typography variant='body2'><strong>Name : </strong> {data1.name}</Typography>
                                <Typography variant='body2'><strong>Warranty : </strong>{data1.warranty}</Typography>
                                <Typography variant='body2'><strong>Mobile number : </strong>  {data1.phone}</Typography>     
                            </Box>
                        ))
                        :
                        <Typography  sx={{paddingTop: '20px'}}>No Previous orders to show</Typography>
                    )
                : (
                    // <CustomerQuotes />
					<></>
                )
            } 
        </Box>
    )
}