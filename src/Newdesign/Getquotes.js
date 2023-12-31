import { useTheme } from '@emotion/react';
import { Box, Typography, Grid,  Button, Card, Rating, Checkbox } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Star } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setpartnerValue } from '../reduxstore';
import loader from './Newlogos/loader02.gif'
import axios from 'axios';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles( theme => ({
    root: {
        '& .MuiRating-iconEmpty': {
          color : "#FFFFFF", 
        },
        '& .MuiRating-iconFilled': {
            color : "#000000", 
          },
      },
    filterbutton : {
        fontSize : '15px'
    },
    boxstyles :{
        borderRadius: '5px',
        border: '1px solid #AAA',
        background: '#F6F6F6',
        display:'flex',
        width:'100%',
        padding :theme.spacing(1),
        justifyContent :'space-between',
        marginTop:theme.spacing(2)
    },
    percentagetypo : {
        color: '#000',
        fontFamily: 'Work Sans',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
   
    },
    subbox1 : {
        display:'flex',
        flexDirection :'column',
        justifyContent:'space-between',
        textAlign : 'left',
        width :'60%'
    },
    subbox2 : {
        display:'flex',
        flexDirection :'column',
        justifyContent:'space-between',
        textAlign : 'right',
        alignItems:'flex-end'

    }
}))


const BlackStarIcon = () => {
  return <Star style={{color : "#333"}}/>;
};

const Getquotes = () => {
    const [show, setShow] = useState(false);
    const [lenght, setlenght] = useState('');
    const [cookies] = useCookies(['access_token']);
    const [data, setdata] = useState([]);
    const [totaldata, settotaldata] = useState([]);
    const theme = useTheme();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [quality, setquality] = useState("normal");
    const Model = useSelector((state) => state.model.value);
    const subscription = JSON.parse(localStorage.getItem('subscription'));


    useEffect(() => {
        const id = localStorage.getItem("DeviceId");
        console.log(id);
        const Getdata = async() => {
            const res = await axios.post('http://localhost:8003/users/getbidsfordevice', {id}, {
                headers: {
                    'x-token': cookies.access_token
                }
            })
            const dat = res.data.data;
            console.log(res.data);
            setdata(dat);
            setlenght(dat.quotesbypartner.length);
            console.log(dat.quotesbypartner.length)
        }
        Getdata();
    }, [])


    const quotedata = 2;

    const handlebookpartner = (partner) => {
        dispatch(setpartnerValue(partner));
        localStorage['quotedata'] = JSON.stringify(partner);
        history.push({
            pathname : '/stepper1',
        })
    }
    console.log(data.quotesbypartner);
    console.log(localStorage.getItem("DeviceBook"))

    return(
<Box sx={{marginTop:'8px', display:'flex', flexDirection : 'column', alignItems:'center', justifyContent:'center'}}>
    {
        show ? <Box sx={{display:'flex',flexDirection : 'column', alignItems:'center', justifyContent:'center' }}>
              <Typography variant='h4' sx={{marginTop :'4px'}}>Getting Quote's</Typography>
            <img src={loader} style={{width: '174px',
            height: '174px'}} alt="loading gif"/>
        </Box>
        : 
        <Box sx={{width:'90%', display:'flex', justifyContent:'center', flexDirection :'column', alignItems:'center',marginTop:theme.spacing(1)}}>
            <Typography variant='h4'>Quote's</Typography>
            <Card sx={{  borderRadius: '5px',
                width:'100%',
                borderBottom: '1px solid #AAA',
                background: '#D9D9D9',
                padding:'4px'}}>
                Repair price quotes for {data.device}
            </Card>
            <Box sx={{marginTop:theme.spacing(1), display:'flex', justifyContent:'space-between', width:'100%'}} >
            <Button sx={{fontSize:'10px',}} endIcon={<ArrowDropUpIcon/>}>
                warranty
            </Button>
            <Button sx={{fontSize:'10px'}} endIcon={<ArrowDropUpIcon/>}>
                price
            </Button>
            <Button sx={{fontSize:'10px'}} endIcon={<ArrowDropUpIcon/>}>
                ratings
            </Button>
            <Button sx={{fontSize:'10px'}} endIcon={<ArrowDropUpIcon/>}>
                distance
            </Button>
            </Box>

            <Grid container spacing={3} sx={{ marginTop:'10px',width:'98%',paddingBottom: '70px'}} >
                {
                    lenght >0 ?
                    data.quotesbypartner.map((partner)=> (
                    <Box className={classes.boxstyles}>
                        <Box className={classes.subbox1}>
                            <Typography variant='body1'>PartnerId : {partner.partnerid}</Typography>
                            <Typography variant='body1'>Warranty : {partner.warranty}</Typography>
                            <Typography variant='body1'>Service : {partner.service}</Typography>
                            <FormControl>
                                {/* <FormControlLabel control={<Checkbox sx={{padding:'0px', marginLeft:'8px'}} />} label={<><Typography variant='body1'>Normal :  {partner.amount}</Typography></>}/> */}
                                <Typography variant='body1'>Normal :  {partner.amount}</Typography>
                            </FormControl>
                        </Box>
                 
                        <Box>
                            <Box className={classes.subbox2}>
                                <Rating
                                    name="read-only"
                                    value={partner.rating}
                                    readOnly
                                    emptyIcon={null}
                                    classes={{ root: classes.root }} // Make sure 'classes.root' is defined
                                    precision={0.5}
                                    // IconContainerComponent={BlackStarIcon}
                                />
                                <Typography className={classes.percentagetypo} sx={{  color: '#000',
                                    fontFamily: 'Work Sans',
                                    fontSize: '24px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',}}>
                                        {partner.percentage}%
                                </Typography>
                                <Typography variant='body1'>Warranty claim resolved</Typography>
                            </Box>
                            <Box>
                                <Button onClick={()=>handlebookpartner(partner)}> Book now</Button>
                            </Box>
                        </Box>
                   </Box>
                ))

                    :    <>
                            <Typography variant="body1">No quotes to show here</Typography>
                        </>
                
            }
          
        </Grid>
        </Box>
    }
</Box>
    )
}

export default Getquotes;