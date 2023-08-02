import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button , Card, CardMedia, CardContent,IconButton
 ,FormControl, RadioGroup, Radio} from "@mui/material";
import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";
import address from '../Images/summarypage/address.svg';
import calendar from '../Images/summarypage/calendar.svg';
import { Edit } from '@mui/icons-material';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { makeStyles, withStyles } from "@mui/styles";
import MuiTableCell from "@mui/material/TableCell";
import FormLabel from '@mui/material/FormLabel';

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell);

export default function PriceSummary1({handlenextpage, delivery}){
  const model1 = useSelector((state) => state.model.value)
  const issues1 = useSelector((state) => state.issues.value)
  console.log(issues1);
  const address1  = useSelector((state) => state.address.value)
  console.log(address1);
  const date1 = useSelector((state)=> state.date.value);
  console.log(date1);
  const mobile = useSelector((state) => state.mobile.value);
  const image = useSelector((state)=>state.image.value);
const partner = useSelector((state)=> state.partner.value);
const [amounttotal, setamounttotal] = useState(parseInt(partner['amount']));
  const history = useHistory();
 // console.log(address1);
 const [width, setWidth] = useState(window.innerWidth);
 //const isMobile = width <= 768;
 const isMobile = true;
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
  setamounttotal(amounttotal+1000);

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
        <Grid container spacing={2} sx={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'8px', marginLeft: 0, marginTop : '8px',textAlign:'left', alignItems:'center'}}>
  
            <Typography variant="h4">Price Summary </Typography>
        <Typography variant="body1" sx={{marginLeft:'8px'}}>Device : {model1}</Typography>
        <Typography variant="h5">Selected Issues:</Typography>
        {
          issues1.map((iss) => (
            <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%'}}>
            <Typography variant="body1">{iss}</Typography>
        </Box>
          ))
        }

<Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%',alignItems:'center'}}>
         <FormControl>
<FormControlLabel control={<Checkbox sx={{padding:'0px', marginLeft:'8px'}}  checked={isChecked1}
        onChange={handleCheckboxChange1} />} label={<>
            <Typography variant='body1'>Delivery and pickup by gadset </Typography></>}/>
    </FormControl>
    <Typography variant="body2">Rs.1000</Typography>
    </Box>
        {/* <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%', mt:2}}>
            <Typography variant="body1">Promo</Typography>
            <Typography variant="body1">Apply</Typography>
        </Box> */}
        <Divider sx={{width :'80%', m:1}}/>
        <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%',  margin:'auto'}}>
            <Typography variant="h4">{model1}</Typography>
            <Typography variant="body1">Rs . {amounttotal}</Typography>
        </Box>

        <Grid item sx={{marginTop : '8px'}}>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <img src={address} alt="address icon" />
        <div>
        <Typography>Address: {address1['phone']}, {address1['name']}, {address1['flat']} </Typography>
        <Typography>{address1['city']}, {address1['landmark']}, {address1['pin']}</Typography>
        </div>
      </Box>
    </Grid>

    <Grid item sx={{marginTop : '8px'}}>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <img src={calendar} alt="address icon" />
        <div>
        <Typography>Date : {date1['date']} </Typography>
        </div>
      </Box>
    </Grid>
        
            <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange}/>}
        label="I accept the terms and conditions"
      />

      <Divider sx={{width:'80%', m:2,}}/>
      {/* <Box sx={{display:'flex',justifyContent:'start',flexDirection:'column',width:'100%'}}>
<Typography variant="body1">Select payment method</Typography>
      <FormControl>
      <RadioGroup
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="online" sx={{background: '#FBFBFB',
        boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
borderRadius: '20px', marginTop:'4px', alignSelf:'center', width:'80%', mb:1}} control={<Radio />} label="Pay total online" />
        <FormControlLabel sx={{background: '#FBFBFB',
boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
borderRadius: '20px', marginTop:'4px',  alignSelf:'center', width:'80%', mb:1}} value="later" control={<Radio />} label="Pay later" />
      </RadioGroup>
    </FormControl>
    </Box> */}
            <Button type="submit" color="primary" onClick={handlenextpage} disabled={!isChecked} >
        Book Service
      </Button>
        </Grid>
    )
}