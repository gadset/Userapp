import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button } from "@mui/material";
import React, { useState } from "react";
import logo from '../../Images/logo.svg';
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
import address from '../../Images/summarypage/address.svg';
import calendar from '../../Images/summarypage/calendar.svg';
import { toast } from "react-toastify";
import { getYear } from "date-fns";
import { useCookies } from "react-cookie";

export default function Paymentnew(){
  const model1 = useSelector((state) => state.model.value)
  const device = useSelector((state)=> state.device.value);
  const issues1 = useSelector((state) => state.issues.value)
  const address1  = useSelector((state) => state.address.value)
  const date1 = useSelector((state)=> state.date.value);
  const mobile = useSelector((state) => state.mobile.value);
  const image = useSelector((state)=>state.image.value);
  const [cookies] = useCookies([]);
 let partner = Object.assign({}, useSelector((state)=> state.partner.value));
 const quoteid = localStorage.getItem('quoteid');
 const userid = localStorage.getItem('userid');
 partner['quoteid'] = quoteid;
 const d = new Date();
//  partner['date'] = d.getDate() + '/' + d.getMonth() + '/' + d.getYear();
const [amounttotal, setamounttotal] = useState(parseInt(partner['amount']));
console.log(amounttotal);

const number = localStorage['number'];
    const history = useHistory();

    const orderData = {
        "address" : address1,
        "date" : date1,
        "model" : model1,
		"device" : device,
        "issues" : issues1,
		"quoteid" : quoteid,
        };

	const details =  {
		'address' : address1,
		'quality' : partner.quality,
		'warranty' : partner.warranty,
		'deliverytype' : partner.service,
	}

    var total = 0;
    for (let i = 0; i < issues1.length; i++) {
       total += Number(issues1[i]['cost']);
      }
    const gst = total/10 ;
    total = gst + total;

    const [value, setValue] = React.useState('online');

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
    
	async function saveorder(){
		await fetch(process.env.REACT_APP_BACKEND+ 'order/saveorder' , {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
					// 'x-token' : cookies.access_token,
					'x-token' : localStorage.getItem('access_token'),
                  }, 
                  body : JSON.stringify({
                    orderdata : orderData,
                    id : userid,
					amount : amounttotal,
					details : details,
					partnerid : partner?.partnerid
                  })
				 }).then((response) => response.json())
				 .then((json) => 
				{ if(json?.message === "saved succesfully") {
					toast.success('Order Saved Successfully');
					history.push('/orders');
				 }
				 else{
					toast.error("Error not saved");
					history.push('/');
				 }
				}
				 )
				
	}
      async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // partner["payment"] = value === "online" ? amounttotal : amounttotal-200 ;
        // creating a new order
		const amount1 = value === "online" ? amounttotal : amounttotal-200 
        const result = await  fetch(process.env.REACT_APP_BACKEND + 'payment/order' , {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            amount : value === "online" ? amounttotal*100 : 200*100,
          }),   
        });
    
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
    
        const js = await result.json();
       console.log(js);
        const { amount, id: order_id, currency } = js;
        console.log(amount);
        const options = {
            key: "rzp_test_hjnHnpkynNqw7v", 
            amount: amount,
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
                const result = await fetch(process.env.REACT_APP_BACKEND+'payment/success' , {
                  data : data,
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  }, 
                });
                 fetch(process.env.REACT_APP_BACKEND+ 'order/saveorder' , {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
					// 'x-token' : cookies.access_token,
					'x-token' : localStorage.getItem('access_token'),
                  }, 
                  body : JSON.stringify({
                    orderdata : orderData,
                    id : userid,
					amount : amount1,
					details : details,
					partnerid : partner?.partnerid
                  })
                }).then(response =>response.json())
                .then(json => {
                  toast(json['message']);
                  history.push({
                    pathname : '/'
                  });
                })
            },
            theme: {
                color: "#61dafb",
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    
    return(
        <Grid container sx={{display:'flex', flexDirection:'column', padding:'8px', width:'100%', justifyContent:'center', alignItems:'center',  textAlign:'start'}}>
        <Typography variant="h5">Payment</Typography>
        <Typography variant="body2">Selected Device : {device}{model1} </Typography>
        <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%', alignItems:'center'}}>
            <Typography variant="h4">Service cost</Typography>
            <Typography variant="body1">Rs. {amounttotal}</Typography>
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%', mt:2}}>
            <Typography variant="body1">Additional charges</Typography>
            <Typography variant="body1">0</Typography>
        </Box>
        <Divider sx={{width :'80%', m:1}}/>
        <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%',alignItems:'center'}}>
            <Typography variant="h4">Total amount</Typography>
            <Typography variant="body1">Rs. {amounttotal}</Typography>
        </Box>
        <Divider sx={{width :'80%', m:1}}/>
        <Grid item spacing={1} sx={{display:'flex', flexDirection:'column',width:'100%'}}>
      
        <Box sx={{display:'flex',justifyContent:'start',flexDirection:'column',width:'100%',}}>
<Typography variant="h4">Select payment method</Typography>
      <FormControl>
      <RadioGroup
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="online" sx={{background: '#FBFBFB',
        boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px', marginTop:'4px', alignSelf:'center', width:'80%', mb:1}} control={<Radio />} label="Pay After Service" />
        {/* <FormControlLabel sx={{background: '#FBFBFB',
        boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px', marginTop:'4px',  alignSelf:'center', width:'80%', mb:1}} value="later" control={<Radio />} label="Pay booking - 200" /> */}
      </RadioGroup>
    </FormControl>
    </Box> 

            
<Button variant="contained" onClick={saveorder} sx={{width:'200px', margintop :'10px', margin:'auto'}}>Pay Now</Button>
</Grid>
</Grid>
    )
}