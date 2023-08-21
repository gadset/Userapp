import { Box, Typography } from '@mui/material';
import React, { Component, useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify';


export default function Orders(){
  const [data, setdata ] = useState([]);

  useEffect(()=>{
 fetch(process.env.REACT_APP_BACKEND+ 'users/getorder', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }, 
        body : JSON.stringify({
          "id" : localStorage.getItem("gadsetid"),
        }),   
      })
      .then(response => response.json())
    .then(json => { setdata(json['data']);
          toast.success(json['message']);})  
}, [])
    //const data1 = JSON.parse(localStorage.getItem('orderdata'));
    return(
       <Box sx={{marginTop :'8px'}} >
            {
                data.length > 0 ?
                data.map((data1, index) => (
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
                <Typography variant='p'>No Previous orders to show</Typography>
            }
            
       </Box>
    )
}