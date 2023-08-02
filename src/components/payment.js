import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button } from "@mui/material";
import React, { useState } from "react";
import logo from '../Images/logo.svg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import address from '../Images/summarypage/address.svg';
import calendar from '../Images/summarypage/calendar.svg';


export default function Payment(){
  const model1 = useSelector((state) => state.model.value)
  const issues1 = useSelector((state) => state.issues.value)
  const address1  = useSelector((state) => state.address.value)
  const date1 = useSelector((state)=> state.date.value);
  const mobile = useSelector((state) => state.mobile.value);
  const image = useSelector((state)=>state.image.value);
    const history = useHistory();

    var total = 0;
    for (let i = 0; i < issues1.length; i++) {
       total += Number(issues1[i]['cost']);
      }
    const gst = total/10 ;
    total = gst + total;

    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
    
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    
      async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
    
        // creating a new order
        const result = await  fetch('https://us-central1-backendapp-89bd1.cloudfunctions.net/app/orders' , {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          
        });
        //axios.post("http://localhost:8000/payment/orders");
    
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
    
        const js = await result.json();
       console.log(js);
        // Getting the order details back
        const { amount, id: order_id, currency } = js;
    
        const options = {
            key: "rzp_test_hjnHnpkynNqw7v", // Enter the Key ID generated from the Dashboard
            amount: value==='later'? 20000 : total*100,
            currency: currency,
            name: "Gadset",
            description: "Test Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
               // axios.post("http://localhost:8000/payment/success", data) 
                const result = await fetch('https://us-central1-backendapp-89bd1.cloudfunctions.net/app/success' , {
                  data : data,
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  
                });;

                history.push({
                  pathname : '/paymentsuccess'
                })
    
               alert(result.data.msg);
            },
            // prefill: {
            //     name:address1['name'],
            //     contact: mobile,
            // },
            // notes: {
            //     address: address1['city'],
            // },
            theme: {
                color: "#61dafb",
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    
    return(
        <Grid container sx={{display:'flex', flexDirection:'column', padding:'8px', width:'100%', justifyContent:'center', alignItems:'center'}}>
        <Typography style={{color: '#056AB5',fontSize : '24px',fontFamily:'Poppins', fontStyle:'normal',lineHeight : '28px', fontWeight :600, marginTop:'4px'}}>Payment</Typography>
        <Typography style={{color: '#056AB5',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :400, marginTop:'4px'}}>Selected Device : {model1}</Typography>
        <Grid item spacing={1} sx={{display:'flex', flexDirection:'column',width:'100%'}}>
      
          {
            address1.length > 0 ?   <Grid item sx={{marginTop : '8px'}}>  <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <img src={address} alt="address icon" style={{marginLeft:'-5px'}} />
            <div>
            <Typography style={{color: '#494949',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :400, margin:'4px'}}>Address: {mobile}, {address1['name']}, {address1['flat']} </Typography>
            <Typography style={{color: '#494949',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :400, margin:'4px'}}>{address1['city']}, {address1['landmark']}, {address1['pin']}</Typography>
            </div>
          </Box>   </Grid>
           : <></>
          }
  {
    date1.length > 0 ? 
    <Grid item sx={{marginTop : '8px'}}>
    <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
      <img src={calendar} alt="address icon" />
      <div>
      <Typography style={{color: '#494949',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :400, margin:'4px'}}>Date : {date1['date']} </Typography>
      </div>
    </Box>
  </Grid>
  : <></>
  }


        <Typography style={{color: '#056AB5',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :600, marginTop:'4px'}}>Select Payment Option</Typography>
        <FormControl>
      <RadioGroup
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="online" sx={{background: '#FBFBFB',
boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
borderRadius: '20px', width:'80%', marginTop:'4px', alignSelf:'center'}} control={<Radio />} label="Pay total online" />
        <FormControlLabel sx={{background: '#FBFBFB',
boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
borderRadius: '20px', width:'80%', marginTop:'4px',  alignSelf:'center'}} value="later" control={<Radio />} label="Pay Minimum deposit of 200 rupees" />
      </RadioGroup>
    </FormControl>

            {/* <Typography variant="h6"> Selected Issue </Typography>
            <TableContainer component={Paper}>
  <Table sx={{ minWidth: 400 }} aria-label="simple table">
  <TableBody>
      {issues1.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.cost}</TableCell>
        </TableRow>
      ))}
      <TableRow key='gst'
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
            GST/CGST
          </TableCell>
          <TableCell align="right">{gst}</TableCell>
          </TableRow>
      <Divider/>
<TableRow key='total'
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
            Total
          </TableCell>
          <TableCell align="right">{total}</TableCell>
          </TableRow>
    </TableBody>
  </Table>
</TableContainer> */}
<Button variant="contained" onClick={displayRazorpay} sx={{width:'100px',  alignSelf:'center', margin:'4px', background: '#056AB5',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',}}>Pay Now</Button>
</Grid>
</Grid>
    )
}