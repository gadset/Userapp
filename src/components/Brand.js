import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { Card, CardMedia, Grid, Typography,Pagination, CardContent, Modal, Button } from '@mui/material';
import { useLocation, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setModelValue } from '../reduxstore';
import ResponsiveAppBar from '../Navbar/Navbar';
import { makeStyles } from "@mui/styles";
import Loader from "react-js-loader";
import Searchbar from './Searchbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const useStyles = makeStyles({
  root: {
    display :'flex',
  //  padding: "8px",
    flexDirection:'column',
 justifyContent: "center",
    alignItems: "center",
 //   margin: "16px",
   // marginLeft:'8px'
  // maxWidth: '90%'
  },
card1 :{
  display:'flex',
  flexDirection:'column',
  alignItems : 'center',
  justifyContent:'center',
  padding:'4px',
  border:' 0.5px solid rgba(73, 73, 73, 0.08)',
boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.015)',
    transition: '0.15s linear',
    boxShadow:' 1px 1px 22px rgba(157, 184, 209, 0.5)',
color : ' #604CA5',  
 },
},
modal: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection :'column',
},
paper: {
  backgroundColor: '#ffffff',
  padding:'16px',
  maxWidth: '90vw',
  maxHeight : '90vh',
  overflowY : 'auto',
  textAlign:'left',
  borderRadius: '30px 30px 0px 0px',
  position:'absolute',
  bottom:0,
},
});

const Brand = () => {
    const location = useLocation()
    const brand = location.state ;
    const [data, setData] = useState([]);
    const [models, setmodels] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [phones, setphone]= useState([]);
    const [page, setPage] = useState(1);
    const [type, setType] = useState('Gadset Pricing');
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [selectedmodel, setSelectmodel] = useState(null);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleClose = () => {
      setOpen(false);
    }

    const handleSubmit = () => {
      setOpen(false);
      if(type === 'Gadset Pricing'){
        history.push({
          pathname : '/selectissue',
          state :{ name : selectedmodel , price : data[selectedmodel]}
        })
      }
      else{
        history.push({
          pathname : '/getbid',
          state :{ name : selectedmodel , price : data[selectedmodel]}
        })
      }
 
    }
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };
  
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const slicedData = models.slice(startIndex, endIndex);

    async function handleselectdevice(){
      const response = await fetch('https://us-central1-backendapp-89bd1.cloudfunctions.net/app/search?phone=' + brand, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
         
        });
        const json = await response.json();
        console.log(json);
        console.log("happening")
        setphone(json);
        
        //console.log(phonelast)
    }
   

    useEffect(() => {
      handleselectdevice();
        const dbRef = ref(getDatabase());
        get(child(dbRef, brand)).then((snapshot) => {
            if (snapshot.exists()) {
              setData(snapshot.val());
              setmodels(Object.keys(snapshot.val()))
              //console.log(data)
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
      }, []);

    const handlemodelclick = (model) => {
dispatch(setModelValue(model));
setOpen(true);
setSelectmodel(model);
    }


return(
    <Grid container spacing={2}  sx={{ marginLeft: 0, marginTop : '10px', width:'100%', marginBottom:'50px' }} className={classes.root}>
      <Searchbar/>
      {models.length > 0 ? <div style={{width:'80%', display:'flex', flexDirection:'column', alignItems:'center', margin:'auto'}}>
      <Typography style={{ color: '#056AB5', padding:'2px', margin:'4px', textAlign:'left'}}>Select Model </Typography>
      <Modal 
        open={open}
        onClose={handleClose}
        className={classes.modal}
        >
        <Grid container spacing={2} className={classes.paper} sx={{display:'flex', flexDirection:'column'}}>
          <Grid item>
        <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Type of service needed</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={type}
        onChange={(e)=> setType(e.target.value)}
      >
        <FormControlLabel value="Gadset Pricing" control={<Radio />} label="Gadset Pricing" />
        <FormControlLabel value="Bidding" control={<Radio />} label="Bidding" />
      </RadioGroup>
    </FormControl>
    </Grid>
    <Grid item>
    <Button onClick={handleSubmit}> Submit </Button>
    </Grid>
        </Grid>
      </Modal>
      <Grid container spacing={2} sx={{padding:'4px', margin:'4px', alignItems :'start', display:'flex', width:'100%'}}>
    {
        models.length > 0 ? 
       slicedData.map((model, i)=> (
      
        <Grid item xs={4} style={{ display:'flex',justifyContent:'center', alignItems :'center',flexDirection:'column', paddingLeft:'0'}}>
            {/* <Link to={{pathname:'/selectissue', 
          state : model}}> */}
        <Card className={classes.card1} sx={{borderRadius:'20px',}}  elevation={2} onClick={() =>handlemodelclick(model)}>
        <CardMedia
        component="img"
         image={data[model]['image']}
                  title={model}
                 sx={{ height: '70px', width:'70px'}} 
                />
            </Card>
            <Typography style={{color: '#494949',fontSize : '13px',fontFamily:'Open Sans', fontStyle:'normal',lineHeight : '16px', fontWeight :400, margin:'4px'}}>{model}</Typography>
            {/* </Link> */}
            </Grid>
        
        ))
        :
        <></>
    }
    </Grid>
    <Pagination
        count={Math.ceil(models.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
      />
      </div> :
       <Loader type="spinner-circle" bgColor={"#056AB5"} title={"Loading Models"} color={'#056AB5'} size={100} /> }

    </Grid>

)
}

export default Brand;