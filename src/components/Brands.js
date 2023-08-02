
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Box,
    Select,
    MenuItem,FormControl,InputLabel,Modal,Backdrop,Fade, Button
  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, {useState, useEffect} from 'react';
import apple from '../logos/apple.svg';
import mi from '../logos/mi.svg';
import motorola from '../logos/motorola.svg';
import nothing from '../logos/nothing.svg';
import oneplus from '../logos/oneplus.svg';
import oppo from '../logos/oppo.svg';
import poco from '../logos/poco.svg';
import realme from '../logos/realme.svg';
import samsung from '../logos/samsung.svg';
import vivo from '../logos/vivo.svg';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link, useHistory } from "react-router-dom";
import ResponsiveAppBar from "../Navbar/Navbar";
import phonerepair from "../Images/phonerepair.jpg";
import { useDispatch } from "react-redux";
import { setModelValue } from '../reduxstore';
import zIndex from "@mui/material/styles/zIndex";
import Searchbar from "./Searchbar";

const useStyles = makeStyles({
  root: {
    display :'flex',
  //  padding: "8px",
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
   textAlign: "left",
 //   margin: "16px",
   // marginLeft:'8px'
  // maxWidth: '90%'
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  card1 :{

    display:'flex',
    flexDirection:'column',
    alignItems : 'center',
    justifyContent:'center',
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
 formControl: {
  margin: '8px',
  width : '200px',
  
},
modal: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
paper: {
  backgroundColor: '#ffffff',
  boxShadow:' 1px 1px 22px rgba(157, 184, 209, 0.5)',
  padding:'8px',
  maxWidth: '90vw',
  maxHeight : '90vh',
  overflowY : 'auto',
  justifyContent:'center'
},

});


const Brands = () => { 

const history = useHistory();
const classes = useStyles();
const [data, setData] = useState([]);

const [firstSelectValue, setFirstSelectValue] = useState('');
  const [secondSelectValue, setSecondSelectValue] = useState('');
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [secondva, setsecondval] = useState([]);
const dispatch = useDispatch();
const handleFirstSelectChange= (event) => {
    const selectedValue = event.target.value;
    setFirstSelectValue(selectedValue);
    const dbRef = ref(getDatabase());
get(child(dbRef, selectedValue)).then((snapshot) => {
  if (snapshot.exists()) {
    //console.log(snapshot.val());
    setSecondSelectOptions(snapshot.val());
    setsecondval(Object.keys(snapshot.val()))
     setModalOpen(true);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
    // fetch('https://us-central1-backendapp-89bd1.cloudfunctions.net/app/search?phone=' + selectedValue, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   }})
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // Update the second select options with the data
    //     setSecondSelectOptions(data);
    //     setModalOpen(true);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching options:', error);
    //   });

  };

  const handleSecondSelectChange = (event) => {
   // const selectedValue = event.target.value;
   console.log(event)
    setSecondSelectValue(event);
    setModalOpen(false);
  };

  const handleSecondSelectChange2 = (event) => {
    const selectedValue = event.target.value;
     setSecondSelectValue(selectedValue);
     setModalOpen(false);
   };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlebooknow = () => {
    dispatch(setModelValue(secondSelectValue));
    console.log('clicked')
    history.push({
      pathname : '/selectissue',
      state :{ name : secondSelectValue , price : secondSelectOptions[secondSelectValue]}
    })
  };
const handlebrandclick = (lo) => {
  let obj = data.find(o => o.name === lo['name']);
  console.log(obj)
  history.push({
    pathname : `/brand/` + lo['name'],
    state : lo['name']
  })
}

const dbRef = ref(getDatabase());
get(child(dbRef, `apple`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

useEffect(() => {
  fetch('https://us-central1-backendapp-89bd1.cloudfunctions.net/app/')
  .then((response) => response.json())
  .then((data) => setData(data));
  //console.log(data)
}, []);


    const data1 = [
        {"name" : "apple" , "logo" : apple},
        {"name" : "Xiaomi", "logo" :mi },
        {"name" : "Motorola", "logo" :motorola },
        {"name" : "Nothing" , "logo" : nothing},
        {"name" : "OnePlus", "logo" : oneplus },
        {"name" : "Oppo", "logo" : oppo},
          {"name" : "Poco", "logo" : poco},
          {"name" : "Realme" , "logo" : realme },
          {"name" : "samsung", "logo" :samsung },
          {"name" : "Vivo", "logo" :vivo },


    ]
    return(
        <Grid container spacing={2}  sx={{ marginLeft: 0, marginTop : 0, width:'100%' }} className={classes.root}>
          <Searchbar/>
          {/* <Grid item  spacing={2}  container sx={{  marginLeft: 0, marginTop : '0px' ,backgroundColor : '#c8dee6',
   borderRadius : '5px',
   padding: '8px',
   width:'100%'}}>
        <Grid item xs={12} sm={5}  >
          <Box display="flex" justifyContent="center">
            <img
              src={phonerepair}
              alt="Example"
              className={classes.image}
              style={{width : '100%', height:'auto'}}
            />
          </Box>
        </Grid> 
        <Grid item xs={12} sm={7}>
          <Box p={2}>
            {
              secondSelectValue.length > 0 ?
              <Typography variant="h6" align="left" style={{fontSize : '25px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px'}}>
              We do {firstSelectValue} all kinds of repair.
              We do {secondSelectValue} repair.
            </Typography>
            :
            <Typography variant="h6" align="left" style={{fontSize : '25px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px'}}>
              We do all kinds of repair.
            </Typography>
            }
            
          </Box>
        </Grid>
        </Grid>
        <Grid item container spacing={2} style={{width :'80%', justifyContent:'center', alignItems:'center',  zIndex:1}}>
        <Grid item>      
        <FormControl className={classes.formControl}>
        <InputLabel id="first-select-label">Brand Select</InputLabel>
        <Select
          labelId="first-select-label"
          id="first-select"
          value={firstSelectValue}
          onChange={handleFirstSelectChange}
        >
          <MenuItem value={'apple'}>apple</MenuItem>
          <MenuItem value={'samsung'}>samsung</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item>

      <FormControl className={classes.formControl}>
              <InputLabel id="second-select-label">Model Select</InputLabel>
              <Select
                labelId="second-select-label"
                id="second-select"
                value={secondSelectValue}
                onChange={handleSecondSelectChange2}
              >
                {secondva.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
      </FormControl> 
      </Grid>
      <Grid item>
      <Button variant='contained' onClick={handlebooknow} style={{width:'150px', padding:'8px'}}> Book Now </Button>
      </Grid>
      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={handleCloseModal}
      >
        <Fade in={modalOpen}>
          <Grid container className={classes.paper}>
            {
              secondva.map((option) => (
                <Grid item md={2} xs={5} style={{ display:'flex',justifyContent:'center', alignItems :'center', margin:3}}>
            <Card className={classes.card1}  elevation={3} onClick={() =>handleSecondSelectChange(option)}>
            
            <CardMedia
            component="img"
            image="https://s3n.cashify.in/cashify/product/img/xhdpi/96a67b00-9389.jpg"
             // image={setSecondSelectOptions[option]['image'] ? setSecondSelectOptions[option]['image'] : ""}
                      title={option}
                     sx={{ height: '100px', width:'80px'}} 
                    />
                <Typography>{option}</Typography>
                </Card>
                </Grid>
              ))
            }
</Grid>
</Fade>
</Modal>
        </Grid> */}
          <div style={{width : '90%', textAlign:'center'}}>
         <Typography variant="h6" style={{ color: '#056AB5',fontFamily:'Poppins', fontStyle:'normal', padding:'8px', margin:'8px'}}>Select Brand </Typography>
         <Grid container spacing={1} sx={{width:'100%', display:'flex',justifyContent:'center', alignItems :'center',}}>
            {
                data1.map((lo) => (
            <Grid item xs={4} style={{ display:'flex',justifyContent:'center', alignItems :'center', flexDirection:'column', textAlign:'center'}}>
              {/* <Link to = {{
                pathname : `/brand/` + lo['name'],
                state : lo['name']
              }}> */}
              <Card onClick={() => handlebrandclick(lo)} sx={{borderRadius :'20px'}} className={classes.card1} elevation={2}>
                <CardMedia
                  image={lo["logo"]}
                  title={lo["name"]}
                 sx={{ height: '70px', width:'90px', borderRadius:'20px'}}
                />
              </Card>
              <Typography style={{color: '#494949',fontSize : '14px',fontFamily:'Open Sans', fontStyle:'normal',lineHeight : '16px', fontWeight :600, margin:'4px'}}>{lo["name"]}</Typography>
              {/* </Link> */}
            </Grid>
                ))
            }
          </Grid>
          </div>
        </Grid>
    )
}

export default Brands;