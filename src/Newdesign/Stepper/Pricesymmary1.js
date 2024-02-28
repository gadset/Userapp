import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button , Card, CardMedia, CardContent,IconButton
 ,FormControl, RadioGroup, Radio} from "@mui/material";
import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from "react-redux";
import address from '../../Images/summarypage/address.svg';
import calendar from '../../Images/summarypage/calendar.svg';
import { Edit } from '@mui/icons-material';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { makeStyles, withStyles } from "@mui/styles";
import MuiTableCell from "@mui/material/TableCell";
import FormLabel from '@mui/material/FormLabel';
import { setpartnerValue } from "../../reduxstore";

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell);

export default function PriceSummary1({handlenextpage, delivery}){

  const issues1 = useSelector((state) => state.issues.value)
  const address1  = useSelector((state) => state.address.value)
  const date1 = useSelector((state)=> state.date.value);
  const device = useSelector((state)=> state.device.value);
  const model = useSelector((state)=> state.model.value);
  let partner = Object.assign({},useSelector((state)=> state.partner.value));
  const [amounttotal, setamounttotal] = useState(parseInt(partner['amount']));
  const history = useHistory();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);

  const [value, setValue] = React.useState('online');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleCheckboxChange1 = (event) => {
    setIsChecked1(event.target.checked);
    if(event.target.checked === true){
      setamounttotal(amounttotal+1000);
      partner['amount'] = amounttotal + 1000;
    }
    else{
      setamounttotal(amounttotal-1000);
      partner['amount'] = amounttotal - 1000;
    }
  dispatch(setpartnerValue(partner));
  };


  const handleclickedit = () => {
    history.push({
      pathname : '/brands',
    })
  }

 const handleclicked = () => {
  handlenextpage();
 }

 const handletotal = (e) => {
  total = total + e;
 }
  const tip = ['50', '100', '500'];
    //const Issues = issue;
    var total = 0;
    for (let i = 0; i < issues1.length; i++) {
       total += Number(issues1[i]['cost']);
      }
    const gst = Math.ceil(total/10) ;
    total = gst + total;
    return(
        <Grid container spacing={2} sx={{width:'100%', display:'flex', flexDirection:'column', padding:'8px', marginLeft: '16px', marginTop : '8px',textAlign:'left', alignItems:'start'}}>
  
        <Typography variant="body1" sx={{marginLeft : 0}} > <strong> Device : </strong> {device} {model}</Typography>
        <Typography variant="body1" sx={{marginLeft : 0}} > <strong>Selected Issues:  </strong></Typography>
        {
          issues1.map((iss) => (
            <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%'}}>
            <Typography variant="body1">{iss}</Typography>
        </Box>
          ))
        }

{/* <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row',alignItems:'center', marginLeft : 0}}>
         <FormControl>
<FormControlLabel control={<Checkbox sx={{padding:'0px'}}  checked={isChecked1}
        onChange={handleCheckboxChange1} />} label={<>
            <Typography variant='body1'>Delivery and pickup by gadset </Typography></>}/>
    </FormControl>
    <Typography variant="body2">Rs.1000</Typography>
    </Box> */}
        {/* <Divider sx={{width :'80%', marginTop:1}}/> */}

        <Box item sx={{marginTop : '8px'}}>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <img src={address} alt="address icon" />
        <div>
        <Typography sx={{flexWrap : 'wrap', marginLeft : '8px'}}> <strong>Address:</strong> {address1}</Typography>
        </div>
      </Box>
    </Box>

    <Box item sx={{marginTop : '8px'}}>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <img src={calendar} alt="address icon" />
        <div>
        <Typography sx={{marginLeft : '8px'}}><strong>Date :</strong> {date1['date']} </Typography>
        </div>
      </Box>
    </Box>
        
            <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange}/>}
        label={<div>I accept the <Link to='/terms'>terms and conditions </Link></div>}
      />

	  <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%', alignItems:'center', paddingLeft : '0px'}}>
            <Typography variant="h4">Total Amount</Typography>
            <Typography variant="body1">Rs .{amounttotal}</Typography>
        </Box>
	
      <Divider sx={{width:'80%', m:2,}}/>
	  <Box sx={{display:'flex',justifyContent:'center', flexDirection:'row', width:'80%', alignItems:'center', paddingLeft : '0px'}}>
		<Button onClick={handlenextpage} disabled={!isChecked} >
        Book Service
      </Button>
	  </Box>
      
        </Grid>
    )
}