import { useTheme } from '@emotion/react';
import { Box, Typography, Grid, Stack, Button, Card, Rating, Checkbox } from '@mui/material';
import React, { Component, useEffect } from 'react'
import { useState } from 'react';
import { Watch } from  'react-loader-spinner'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Star } from '@mui/icons-material';
import { getDatabase, ref, child, get, set } from "firebase/database";
import {auth, firestoredb } from '../index';
import { doc, setDoc, getFirestore,addDoc, collection, getDocs } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setpartnerValue } from '../reduxstore';
import loader from './Newlogos/loader02.gif'

const useStyles = makeStyles( theme => ({
    root: {
        '& .MuiRating-iconEmpty': {
          color : "#fff", // Hide empty stars
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
    const [show, setShow] = useState(true);
    const theme = useTheme();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [quality, setquality] = useState("normal");
    const [quotedata, setquotedata] = useState([]);
    const [isTimerRunning, setistimerrunning]= useState(true);
    const Model = useSelector((state) => state.model.value)
    const handleChange = (e) => {
        setquality(e.target.value);
        console.log(e.target.value)
      };

      useEffect(()=>{
        const auth= getAuth();
        const user = auth.currentUser;
        var uid;
        if(user){
          uid = user.uid;
        }
    //     const querySnapshot = getDocs(collection(firestoredb, "Quotes", uid, 'quotes'));
    //     querySnapshot.forEach((doc, index) => {
    //       //quotedata.push(doc.data());
    //       console.log(doc.data());
    //    //    if(doc.data()['delivery'] === 'Service center'){
    //    //      const dist = getDistance(doc.data()['address'], latlng);
    //    //      quotedata[quotedata.length-1]['add'] = dist/1000;
    //    //    }
    //    //    else{
    //    //      quotedata[quotedata.length-1]['add'] = 0;
    //    //    }
    //     }); 
        if(isTimerRunning===true){
            const newTimerId = setTimeout(async() => {
                const querySnapshot = await getDocs(collection(firestoredb, "Quotes", uid, 'quotes'));
                querySnapshot.forEach((doc, index) => {
                  quotedata.push(doc.data());
                  console.log(doc.data());
               //    if(doc.data()['delivery'] === 'Service center'){
               //      const dist = getDistance(doc.data()['address'], latlng);
               //      quotedata[quotedata.length-1]['add'] = dist/1000;
               //    }
               //    else{
               //      quotedata[quotedata.length-1]['add'] = 0;
               //    }
                }); 
            setquotedata(quotedata);
            //setloading(true);
            setShow(false);
                clearTimeout(newTimerId);
                //setCountDown(0);
                //setTimerId(null);
                setistimerrunning(false);
              }, 60000);
        }
        // 5 minutes in milliseconds
   
      })

    const partnerdata = [
        {
            "partnerid" : 5892,
            "warranty" : "3months",
            "service" : "door step",
            "quality" : [{"qual" : "premium", "price" : 1200}, {"qual" : "normal", "price" : 1000}],
            "premium" : 1200,
            "rating" : 4,
            "percentage" : "95",
        },
        {
            "partnerid" : 5892,
            "warranty" : "3months",
            "service" : "door step",
            "premium" : 1200,
            "quality" : [{"qual" : "normal", "price" : 1000}],
            "rating" : 4,
            "percentage" : "95",
        }
    ]

    const handlebookpartner = (partner) => {
        dispatch(setpartnerValue(partner));
        localStorage['quotedata'] = JSON.stringify(partner);
        history.push({
            pathname : '/stepper1',
    })
    }
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
            Repair price quotes for {Model}
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

        <Grid container spacing={3} sx={{ marginTop:'10px',width:'98%',}} >
            {
                quotedata.length >0 ?
                quotedata.map((partner)=> (
                    <Box className={classes.boxstyles}>
                    <Box className={classes.subbox1}>
                        <Typography variant='body1'>PartnerId : {partner.alldata.partnerid}</Typography>
                        <Typography variant='body1'>Warranty : {partner.warranty}</Typography>
                        <Typography variant='body1'>Service : {partner.delivery}</Typography>

    <FormControl>
        {/* {
        partner.quality.map((qua) => (
            <FormControlLabel control={<Checkbox sx={{padding:'0px', marginLeft:'8px'}} />} label={<>
            <Typography variant='body1'>{qua['qual']} :  {qua['price']}</Typography></>}/>
        ))
      } */}

<FormControlLabel control={<Checkbox sx={{padding:'0px', marginLeft:'8px'}} />} label={<>
            <Typography variant='body1'>Normal :  {partner.amount}</Typography></>}/>
    </FormControl>

                    </Box>
                 
                    <Box>
                        <Box className={classes.subbox2}>
                    <Rating name="read-only" value={partner.alldata.rating} readOnly 
                    emptyIcon={null} classes={{ root: classes.root }}
                    precision={0.5} // You can adjust the precision to have half-star ratings (0.5) or whole stars (1)
IconContainerComponent={BlackStarIcon}/>
<Typography className={classes.percentagetypo} sx={{  color: '#000',
        fontFamily: 'Work Sans',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',}}>{partner.alldata.percentage}%</Typography>
        <Typography variant='body1'>Warranty claim resolved</Typography>
        </Box>
        <Box>
            <Button onClick={()=>handlebookpartner(partner)}> Book now</Button>
        </Box>

                    </Box>
        
                   </Box>
                ))

                   : <>
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