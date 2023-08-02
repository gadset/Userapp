import React, { Component, useEffect, useState } from 'react'
import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button , Card, CardMedia, CardContent,IconButton
    ,FormControl, RadioGroup, Radio, TextField} from "@mui/material";
    import { useSelector } from "react-redux";
    import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { useHistory} from 'react-router-dom/cjs/react-router-dom.min';
import { doc, setDoc, getFirestore,addDoc, collection, updateDoc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth, firestoredb } from '../index';

export default function Placeorder(){
    const [captcha, setCaptcha] = useState('');
    const history = useHistory();
    const address1  = useSelector((state) => state.address.value);
    const partner = useSelector((state)=> state.partner.value);
    const model1 = useSelector((state) => state.model.value)
    const issues1 = useSelector((state) => state.issues.value)
    const date1 = useSelector((state)=> state.date.value);

const [amounttotal, setamounttotal] = useState(parseInt(partner['amount']));
const number = localStorage['number'];

//     useEffect(()=>{
// loadCaptchaEnginge(6);
//     }, [])

    const handledosubmit = () => {
        if (validateCaptcha(captcha, false)==true) {
            alert('Captcha Matched');
        }
 
        else {
            alert('Captcha Does Not Match');
        }
    }

    const handlenextpage = () => {
      //  if (validateCaptcha(captcha, false)==true) {
     //       alert('Captcha Matched');
            //const docRef = doc(firestoredb, "Users", number);
            const data = {
                       "address" : address1,
                       "date" : date1,
                       "model" : model1,
                       "issues" : issues1,
                       "partner" : partner
                       };
        localStorage.setItem('orderdata', JSON.stringify(data));
        //    updateDoc(docRef, data)

        //    .then(() => {
        //        console.log("Document has been added successfully");
        //    })
            history.push({
                pathname : '/orders'
         })
      //  }
 
        // else {
        //     alert('Captcha Does Not Match');
        // }
      

    }
    return(
       <Grid container sx={{display:'flex', flexDirection:'column', padding:'8px', width:'100%', justifyContent:'center', alignItems:'center', textAlign:'left'}} >
        <Typography variant='h4' sx={{m:1}}>Place Order</Typography>
         <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%', alignItems:'center'}}>
            <Typography variant="h4">Service cost</Typography>
            <Typography variant="body1">Rs. {amounttotal}</Typography>
        </Box>
        {/* <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%', mt:2}}>
            <Typography variant="body1">Additional charges</Typography>
            <Typography variant="body1">0</Typography>
        </Box> */}
        <Divider sx={{width :'80%', m:1}}/>
        <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%',alignItems:'center'}}>
            <Typography variant="h4">Total amount</Typography>
            <Typography variant="body1">Rs. {amounttotal}</Typography>
        </Box>
        <Divider sx={{width :'80%', m:1}}/>
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifySelf:'start',width:'80%'}}>   <Typography variant='body1' sx={{color:'#056AB5'}}>Payment Option :</Typography>
        <Typography variant='body2'>Online Payment</Typography></Box>
     
     {/* <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifySelf:'start', width:'80%'}}>  <Typography variant='body1' sx={{color:'#056AB5'}}>Address:</Typography>
     <Typography variant='body2'>{address1['name']},
      {address1['mobileNumber']},
      {address1['pinCode']},
      {address1['flatNumber']},
      {address1['landmark']},
      {address1['city']},
      {address1['state']},
       </Typography>
     </Box> */}

    {/* <Typography variant='body1' sx={{mt:2}}>Captcha Verification</Typography>
     <div>
        <LoadCanvasTemplateNoReload />
         </div>
         <TextField
         variant="outlined"
         required
         id="captcha"
         name="captcha"
         value={captcha}
         size='small'
         sx={{width:'50%', m:1}}
         onChange={(e) => setCaptcha(e.target.value)}/> */}

<Button type="submit" color="primary" onClick={handlenextpage} >
        Place order
      </Button>
      
       </Grid>
    )
}