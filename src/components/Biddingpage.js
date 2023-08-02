import React, { Component, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { Grid, Button, Typography, Card , IconButton} from '@mui/material';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { getDatabase, ref, child, get, set } from "firebase/database";
import {auth, firestoredb } from '../index';
import { doc, setDoc, getFirestore,addDoc, collection, getDocs } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import { useDispatch } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { setIssueValue } from '../reduxstore';
import { ToastContainer, toast } from 'react-toastify';
import { ProgressBar } from  'react-loader-spinner'
export default function Bidding(){
    const location = useLocation();
    //const mod = location.state.name ;
    const mod = location.state.name;
    const price = location.state.price;
    const [issue, setIssue] = React.useState('Battery Replacement');
    const [quotedata, setquotedata] = useState([]);
    const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [isTimerRunning, setistimerrunning] = useState(false);
  const [loading, setloading] = useState(false);
 // const [timerId, setTimerId] = useState(null);
  const [status, setStatus] = useState(false);
  const [latlng, setlatlng] = useState(null);
  const [sec11, setsec11] = useState(60);
  const [quotebutton, setquotebutton] = useState(true);
const timerId = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
    const quote1 = []

    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        navigator.geolocation.watchPosition((position) => {
          setStatus(true);
       //   setLat(position.coords.latitude);
         // setLng(position.coords.longitude);
         setlatlng({
          lat : position.coords.latitude,
          lng : position.coords.longitude,
         })
        }, () => {
          setStatus('Unable to retrieve your location');
        });
      }
    }

    const handlebookthebid = (amount, delivery) => {
      dispatch(setIssueValue([{'name' : issue,
      'cost' : amount}]));
      history.push({
        pathname:'/stepper',
        state : {total:amount , delivery : delivery}
      }) ;
    }

    const handlegetquotes = async() => {
      const auth= getAuth();
      const user = auth.currentUser;
      var uid;
      if(user){
        uid = user.uid;
      }
      console.log(uid);
      console.log('hello1')
      const querySnapshot = await getDocs(collection(firestoredb, "Quotes", "5VtxVCTlZugKCkd2poBprL1bNjy2", 'quotes'));
      // for (let i = 0; i < querySnapshot.length; i++) {
      //   quotedata.push(querySnapshot[i].data());
      //    const dist = getDistance(querySnapshot[i].data()['address'], latlng);
      //   quotedata[i]['distance'] = dist;
      //   console.log("hello")
      // }
      querySnapshot.forEach((doc, index) => {
        quotedata.push(doc.data());
        const dist = getDistance(doc.data()['address'], latlng);
        console.log(dist);
        quotedata[quotedata.length-1]['add'] = dist/1000;
        console.log("hello")
      }); 
  setquotedata(quotedata);
  console.log(quotedata);
  //setistimerrunning(false);
  setloading(true);
    }

    const handleChange = (event) => {
        setIssue(event.target.value);
        console.log(issue);
      };
   
      React.useEffect(() => {
        let timeroi;
         if(status!=true){
           getLocation();
         }
        if (isTimerRunning) {
        //    setCountDown(59 * 1);
        // timeroi= setInterval(() => {
        //   if(countDown>=0){
        //     setCountDown((countDown) => countDown - 1);
        //   }
      //  }, 1000);
      timerId.current = setInterval(() => {
        setsec11(prev => prev - 1);
      }, 1000);
        }
        return () => {
         // clearInterval(timeroi);
         clearInterval(timerId.current);
         timerId.current = 0;     
        };
      }, [isTimerRunning, timerId, latlng]);
    

    const Issuesarr = [
        {
            name : 'Battery Replacement',
        },
        {
            name : 'Screen replacement',
        },
        {
            name :  'speaker replacement',
        },
        {
            name:  'touch repair'
        }      
       
    ]
const userid = useSelector((state) => state.userid.value);
const addtodatabase = async() => {

  const auth= getAuth();
  const user = auth.currentUser;
  var uid;
  if(user){
    uid = user.uid;
    console.log(uid)
  }
  const quoteRef = await addDoc(collection(firestoredb, "Quotes"), {  
  "uid" : uid,
  "model" : mod,
  "issue" : issue
  });

  const quoteid = quoteRef.id;
  const useref = doc(firestoredb, "Users", userid);
  setDoc(useref, { "quote": quoteid }, { merge: true });
  // const quoteRef = await setDoc(collection(firestoredb, "Users", userid), {  
  //   "uid" : uid,
  //   "model" : mod,
  //   "issue" : issue
  //   });

    // const db = getDatabase();
    // const tasksRef = ref(db, "Users", userid);
    // set(tasksRef, {
    //     mod,
    //     issue,
    //   })
}

async function handlesend(){
  const auth= getAuth();
  const user = auth.currentUser;
  var uid;
  if(user){
    uid = user.uid;
  }
  const response = await fetch('https://us-central1-backendapp-89bd1.cloudfunctions.net/app/sendquote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify({
        "uid" : uid,
        "model" : mod,
        "issue" : issue
      }),   
    });
    const json = await response.json();
    setquotedata([]);
    if(json["response"] === "True"){  
      setistimerrunning(true);
      setquotebutton(false);
      toast.success("wait for one minute to get quotes")
//      const querySnapshot = await getDocs(collection(firestoredb, "Quotes"));
//      querySnapshot.forEach((doc) => {
//        quotedata.push(doc.data());
//      }); 
//  setquotedata(quotedata);
//  console.log(quotedata);
//     setloading(true);
      setquotedata([]);
     const newTimerId = setTimeout(async() => {
      const querySnapshot = await getDocs(collection(firestoredb, "Quotes", uid, 'quotes'));
      querySnapshot.forEach((doc, index) => {
        quotedata.push(doc.data());
        if(doc.data()['delivery'] === 'Service center'){
          const dist = getDistance(doc.data()['address'], latlng);
          quotedata[quotedata.length-1]['add'] = dist/1000;
        }
        else{
          quotedata[quotedata.length-1]['add'] = 0;
        }
    
      }); 
  setquotedata(quotedata);
  setloading(true);
      clearTimeout(newTimerId);
      setCountDown(0);
      //setTimerId(null);
      setistimerrunning(false);
      setsec11(60);
      setquotebutton(true);
    }, 60000); // 5 minutes in milliseconds

    //setTimerId(newTimerId);
    }

    else{
      toast.error("Error while submitting the data");
    }
    
      
     



      // const querySnapshot = await getDocs(collection(firestoredb, "Quotes"));
      //   querySnapshot.forEach((doc) => {
      //     console.log(doc.id, " => ", doc.data());
      //     doc.data()['quoteid'] = doc.id;
      //     quote1.push(doc.data());});
      //     setquotedata(quote1);

    }


const seconds = String(countDown % 60).padStart(2, 0);
const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
    return(
        <Grid container style={{marginTop:'10px', padding:'4px', display:'flex', flexDirection:'column', justifyContent:'center', marginBottom:'40px'}}>
        <FormControl fullWidth>
        <Typography>Select Issue</Typography>
        <Select
          value={issue}
          onChange={handleChange}
        >
          {
            Issuesarr.map((iss, index) => (
                <MenuItem key={index} value={iss.name}>{iss.name}</MenuItem>
            ))
          }
        </Select>
        {
          quotebutton ? <Button onClick={handlesend}>get quotes</Button> :
          <Button disabled>Get Quotes</Button>
        }
        

      </FormControl>

      <Grid>  
          {/* <Typography>
 minutes : {minutes} :: seconds: {seconds}
</Typography>  */}
<Typography>Seconds : {sec11}</Typography>

{
  quotebutton ?
<></>
: 
<ProgressBar
height="80"
width="80"
ariaLabel="progress-bar-loading"
wrapperStyle={{}}
wrapperClass="progress-bar-wrapper"
borderColor = '#F4442E'
barColor = '#51E5FF'
/>
}
        </Grid>
        <Grid>

        {
          quotedata.length > 0 ?
          quotedata.map((quo, index) => (
          <Card key={quo.model} elevation={2} sx={{margin:'8px', padding:'8px'}}>
              <Typography>amount : {quo.amount}</Typography>
              <Typography>Partner name : {quo.name}</Typography>
              <Typography>
                <IconButton>
                  <LocationOnIcon/></IconButton> Distance : {quo.add} km</Typography>
              <Typography>Delivery : {quo.delivery}</Typography>
              <Typography>Warranty : {quo.warranty}</Typography>
              <Button onClick={() => handlebookthebid(quo.amount, quo.delivery)}>Book this now</Button>
          </Card>
         ))
          :
         <Typography>No bids to show currently</Typography>
        }

</Grid>
        </Grid>
    )
}