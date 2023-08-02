import { Box, Typography } from '@mui/material';
import React, { Component } from 'react'
import { useEffect } from 'react'


export default function Orders(){
  //  const [data, setdata] = useEffect([]);
    const data1 = JSON.parse(localStorage.getItem('orderdata'));
    return(
       <Box sx={{marginTop :'8px'}} >
        <Box sx={{marginTop :'8px'}}>
            <Typography variant='h4'>Order no :1 </Typography>
            <Typography variant='body2'>Date : {data1.date.date}</Typography>
            <Typography variant='body2'>Model : {data1.model}</Typography>
            {
                data1.issues.map((iss) => (
                    <Typography>{iss}</Typography>
                ))
            }
        </Box>

        <Box>
            <Typography variant='h4' sx={{marginTop :'8px'}}>Partner Data</Typography>
            <Typography variant='body2'>Delivery type : {data1.partner.delivery} </Typography>
            <Typography variant='body2'>Email : {data1.partner.alldata.email} </Typography>
            <Typography variant='body2'>Partnerid :  {data1.partner.alldata.partnerid}</Typography>
            <Typography variant='body2'>Name :  {data1.partner.alldata.name}, amount :  {data1.partner.amount}</Typography>
            <Typography variant='body2'>Warranty :  {data1.partner.warranty}</Typography>
            <Typography variant='body2'>Mobile number :  {data1.partner.alldata.number}</Typography>

        </Box>
       </Box>
    )
}