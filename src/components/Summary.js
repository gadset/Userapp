import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button , Card, CardMedia, CardContent,IconButton} from "@mui/material";
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

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell);

export default function PriceSummary({handlenextpage, delivery}){
  const model1 = useSelector((state) => state.model.value)
  const issues1 = useSelector((state) => state.issues.value)
  const address1  = useSelector((state) => state.address.value)
  const date1 = useSelector((state)=> state.date.value);
  const mobile = useSelector((state) => state.mobile.value);
  const image = useSelector((state)=>state.image.value);
  const history = useHistory();
 // console.log(address1);
 const [width, setWidth] = useState(window.innerWidth);
 //const isMobile = width <= 768;
 const isMobile = true;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
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
        <Grid container spacing={2} sx={{width:'100%', display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center', padding:'8px', marginLeft: 0, marginTop : '10px',}}>
            <Typography style={{color: '#056AB5',fontSize : '24px',fontFamily:'Poppins', fontStyle:'normal',lineHeight : '28px', fontWeight :600, marginTop:'4px'}}>Price Summary </Typography>
            <Typography>Delivary type: {delivery}</Typography>
            <Grid item>
        <Card sx={{display:'flex', flexdirection:'row', justifyContent:'center', alignItems:'center' }}>
      <CardMedia
        component="img"
        sx={{ height: '70px', width:'50px'}} 
        image={image}
        alt={model1}
      />
      <CardContent>
        <Typography>{model1}</Typography>
      </CardContent>
      <IconButton onClick={handleclickedit}>
        <Edit />
      </IconButton>
    </Card>
    </Grid>
            <Grid item sx={{width: isMobile ? '95%' : '70%', display:'flex', flexDirection:'column', justifyContent:'start',alignItems:'start',margin:'8px', padding:'8px'}}>
                <Typography style={{color: '#056AB5',fontSize : '18px',fontFamily:'Poppins', fontStyle:'normal',lineHeight : '18px', fontWeight :500, marginTop:'4px'}}>Selected Issue(s) </Typography>
                {/* <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
<Grid container sx={{display:'flex',justifyContent:'flex-start'}}>
<Grid item xs={7} sx={{display:'flex',justifyContent:'flex-start', marginTop:'16px'}}>
{issues1.map((row) => (
  <Typography style={{color: '#0494949',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :600, marginTop:'4px'}}>{row.name}</Typography>
))}
</Grid>
<Grid item xs={3} sx={{display:'flex',justifyContent:'flex-start',marginTop:'16px'}}>
{issues1.map((row) => (
  <Typography style={{color: '#0494949',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :600, marginTop:'4px'}}>{row.cost}</Typography>
))}
</Grid>

<Divider variant="middle" sx={{width:'80%',marginTop:'16px'}} />
<Grid item xs={7} sx={{display:'flex',justifyContent:'flex-start'}}>
  <Typography style={{color: '#0494949',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :600, marginTop:'4px'}}>Total</Typography>

</Grid>
<Grid item xs={3} sx={{display:'flex',justifyContent:'flex-start'}}>
  <Typography style={{color: '#0494949',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :600, marginTop:'4px'}}>{total}</Typography>
</Grid>
<Divider variant="middle" sx={{width:'80%'}} />
</Grid>
    {/* <Grid item sx={{marginTop : '8px', textAlign:'left'}}>
      <Typography>Add tip to the technician</Typography>
      <Stack direction="row" spacing={2}>
        {
          tip.map((t, index) => (
            <Button variant="contained" onClick={() => handletotal(t)}>{t}</Button>
          ))
        }

      </Stack>
    </Grid> */}


    {/* <Grid item sx={{marginTop : '8px'}}>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <img src={address} alt="address icon" />
        <div>
        <Typography>Address: {mobile}, {address1['name']}, {address1['flat']} </Typography>
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
    </Grid> */}


    <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
        label="I accept the terms and conditions"
      />
    
    
            </Grid>
            <Button type="submit" variant="contained" color="primary" onClick={handlenextpage} disabled={!isChecked}  sx={{ background: '#056AB5',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',}}>
        Next
      </Button>
        </Grid>
    )
}