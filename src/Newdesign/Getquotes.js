import { useTheme } from '@emotion/react';
import { Box, Typography, Grid,  Button, Card, Rating, Checkbox, Modal, RadioGroup, Radio } from '@mui/material';
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
import { toast } from 'react-toastify';

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
        width :'100%'
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
    const [lenght, setlenght] = useState('');
    const [cookies] = useCookies(['access_token']);
	const [open, setOpen] =useState(false);
    const [data, setdata] = useState([]);
    const [totaldata, settotaldata] = useState([]);
    const theme = useTheme();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [quality, setquality] = useState("normal");
	const model = useSelector((state)=>state.model.value);
    const brand = useSelector((state)=>state.device.value);
    const subscription = JSON.parse(localStorage.getItem('subscription'));
	const userid =  localStorage.getItem("userid");
	const [selectedQuality, setSelectedQuality] = useState('');
	const [selectedQuote, setSelectedQuote] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedQuality(event.target.value);
	console.log(event.target.value);
  };


    useEffect(() => {
		const id = localStorage.getItem("quoteid");
		var eventSourceInitDict = {headers: {'x-token': cookies.access_token,}};
	   const eventSource = new EventSource(process.env.REACT_APP_BACKEND + `users/quotesdashboard?id=${id}&userid=${userid}`,
	   {token : cookies.access_token},
	    {
		headers: {
			// 'x-token': cookies.access_token
			'x-token' : localStorage.getItem('access_token')
		,}
	    }
	   );

        eventSource.onopen = () => {
          console.log('Connection to SSE established.');
        };

        eventSource.onmessage = (event) => {
          setdata(JSON.parse(event.data));
          console.log("fetched", event.data);
         setShow(false);
        };

        eventSource.onerror = (error) => {
          console.error('Error with SSE:', error);
		  toast.error("An error occured, redirecting to home");
		  history.push('/');
        };

        return () => {
          eventSource.close();
        };
    //     const id = localStorage.getItem("quoteid");
    //     console.log(id);
    //     const Getdata = async() => {
    //         const res = await axios.get(process.env.REACT_APP_BACKEND + `users/quotesdashboard?id=${id}`, 
	// 		{
    //             headers: {
    //                 'x-token': cookies.access_token,
    //             }
    //         })
    //         const dat = res.data.data;
    //         console.log("why iam not printing anythin", res);
    //         setdata(dat);
    //         setlenght(dat.quotesbypartner.length);
    //         console.log(dat.quotesbypartner.length)
    //     }
    //     Getdata();
    }, [])

    const quotedata = 2;

    const handlebookpartner = () => {
		 const selectedValue = selectedQuality;
    const selectedObject = selectedQuote?.amount.find((item) => item.quality === selectedValue);
		const selected = {
			"partnerid" : selectedQuote?.partnerid,
			"service" : selectedQuote?.service,
			"warranty" : selectedObject?.warranty,
			"amount" : selectedObject?.amount,
			"quality": selectedObject?.quality,
		}
        dispatch(setpartnerValue(selected));
        localStorage['quotedata'] = JSON.stringify(selected);
        history.push({
            pathname : '/stepper1',
        })
    }

	const handleBook = (partner) => {
		if(partner.amount.length > 1){
			setSelectedQuote(partner);
			setOpen(true);
		}
		else{
			const selected = {
			"partnerid" : partner?.partnerid,
			"service" : partner?.service,
			"warranty" : partner?.amount[0].warranty,
			"amount" : partner?.amount[0].amount,
			"quality": partner?.amount[0].quality,
		}
        dispatch(setpartnerValue(selected));
        localStorage['quotedata'] = JSON.stringify(selected);
        history.push({
            pathname : '/stepper1',
        })
		}
	}

    console.log(data.quotesbypartner);
	
    return(
<Box sx={{marginTop:'8px', display:'flex', flexDirection : 'column', alignItems:'center', justifyContent:'center'}}>
        <Box sx={{width:'90%', display:'flex', justifyContent:'center', flexDirection :'column', alignItems:'center',marginTop:theme.spacing(1)}}>
            <Typography variant='h4'>Quote's</Typography>
            <Card sx={{  borderRadius: '5px',
                width:'100%',
                borderBottom: '1px solid #AAA',
                background: '#D9D9D9',
                padding:'4px'}}>
                Repair price quotes for {brand} - {model}
            </Card>
            {/* <Box sx={{marginTop:theme.spacing(1), display:'flex', justifyContent:'space-between', width:'100%'}} >
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
            </Box> */}

            <Grid container spacing={3} sx={{ marginTop:'10px',width:'98%',paddingBottom: '70px'}} >
                {
					data.length > 0 ?
                    data?.map((partner)=> (
                    <Box className={classes.boxstyles}>
                        <Box className={classes.subbox1}>
                            <Typography variant='body1'>PartnerId : {partner.partnerid}</Typography>
                            {/* <Typography variant='body1'>Warranty : {partner.warranty}</Typography> */}
                            <Typography variant='body1'><strong>Service :</strong> {partner.service}</Typography>
                            {/* <FormControl>
                                {/* <FormControlLabel control={<Checkbox sx={{padding:'0px', marginLeft:'8px'}} />} label={<><Typography variant='body1'>Normal :  {partner.amount}</Typography></>}/>
                                <Typography variant='body1'>Normal :  {partner.amount}</Typography>
                            </FormControl> */}
							{
								partner.amount.map((item)=> (
									<Typography>{item.quality} Quality - {item.warranty} - Rs.{item.amount} </Typography>
								))
							}
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
                                <Button onClick={()=>handleBook(partner)}> Book now</Button>
                            </Box>
                            
                        </Box>
		
						
                   </Box>
                ))

                    :    <>
                            <Typography variant="body1">No quotes to show here</Typography>
                        </>
                
            }
          
		   <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          border: '2px solid #000',
          p: 2,
          minWidth: '300px',
          maxWidth: '80%',
        }}
      >
		{
			selectedQuote && (
				  <FormControl component="fieldset">
          <RadioGroup
            aria-label="quality"
            name="quality"
            value={selectedQuality}
            onChange={handleRadioChange}
          >
            {selectedQuote?.amount.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.quality}
                control={<Radio />}
                label={`${item.quality} Quality - ${item.amount} - Warranty: ${item.warranty}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
			)
		}
        <Button onClick={handlebookpartner} color="primary">
          Confirm
        </Button>
      </Box>
    </Modal>
        </Grid>
        </Box>
</Box>
    )
}

export default Getquotes;