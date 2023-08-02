import React, { useState, useEffect } from "react";
import { Link, useHistory , useLocation} from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button, Grid, TextField, Typography } from '@mui/material';
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {auth, firestoredb } from '../index';
import {
    signInWithPhoneNumber,
    RecaptchaVerifier,
  } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { setMobileValue, setUserIdValue } from "../reduxstore";
import { doc, setDoc, getFirestore,addDoc, collection } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Phonenumber1 from "./Phonenumber1";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";

const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: theme.palette.background.paper,
    width : '100%'
  }
}))

//auth().settings.appVerificationDisabledForTesting = true;
// Add a new document in collection "cities"
function setUpRecaptha(number) {
 // var appVerifier = new RecaptchaVerifier('recaptcha-container');
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    console.log('function called')
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);

  // let out ;
  //   const recaptchaVerifier = new RecaptchaVerifier('sendotp', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       out = signInWithPhoneNumber(auth, number, recaptchaVerifier);
  //     }
  //   }, auth);
  //   // recaptchaVerifier.render();
  //    return out;
   ;
  }

const Phonesignin = ({total}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const theme = useTheme();
//const total = location.state.total;
  //const { setUpRecaptha } = useUserAuth();
  const history = useHistory();

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);
  
  //const isMobile = width <= 768;
  const isMobile = true;

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    let newnum = '+91' + number;
    console.log(newnum);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      dispatch(setMobileValue(newnum));
      const response = await setUpRecaptha(newnum);
      setResult(response);
      console.log(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }

    console.log(error);
  };


  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      const auth= getAuth();
      const user = auth.currentUser;
      var uid;
      if(user){
        uid = user.uid;
      }
      const docRef = doc(firestoredb, "Users", number);
      const data = {
                 "number" : number
                 }
     setDoc(docRef, data)
     .then(() => {
         console.log("Document has been added successfully");
     })
     .catch(error => {
         console.log(error);
     })
      dispatch(setUserIdValue(docRef.id));
      localStorage['verified'] = "yes";
      localStorage['phonenumber'] = number;
      history.push({
        pathname : '/issuepage',
      })
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container  sx={{ marginLeft: 0, marginTop : '10px' }} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div style={{width: isMobile ? '95%' : '40%', display:'flex', flexDirection:'column',backgroundColor : '#ffffff',textAlign : 'left' }}>
        <Typography variant="h5" style={{marginTop:theme.spacing(1)}}>Enter number</Typography>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp}>
          <Form.Group controlId="formBasicEmail">
            {/* <PhoneInput
            defaultCountry="IN"
              value={number}
              onChange={setNumber}
              inputComponent={Phonenumber1}
              placeholder="Enter phone number"
              disabled={flag}
            /> */}
             <TextField
        hiddenLabel
          size="small"
          placeholder='868 874 9458'
          fullWidth
          variant='outlined'
          InputProps={{
            classes: { input: {
              padding: '8px',
            } },
          }}
          value={number}
          onChange={(e)=>setNumber(e.target.value)}
          disabled={flag}
        />
            <div style={{margin:'8px'}} id="recaptcha-container"></div>
          </Form.Group>
          <div style={{ display: !flag ? "block" : "none" }} className="button-right">
            <Button type="submit" id="sendotp" >
              Send Otp
            </Button>
          </div>
        </Form>
        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
        <Typography variant="h5" style={{marginTop:theme.spacing(1)}}>Verify Otp</Typography>
          <Form.Group controlId="formBasicOtp">
          
            <TextField
              type="otp"
              InputProps={{
                className: classes.input
              }}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              size='small'
            />
          </Form.Group>
          <div className="button-right" style={{marginTop:theme.spacing(1)}}>
            <Button type="submit" >
              Verify
            </Button>
          </div>
        </Form>
        </div>
    </Grid>
  );
};

export default Phonesignin;