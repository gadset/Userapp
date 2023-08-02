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
import Phonenumber from "./Phonenumber";
import { useSelector, useDispatch } from 'react-redux';
import { setMobileValue, setUserIdValue } from "../reduxstore";
import { doc, setDoc, getFirestore,addDoc, collection } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

const PhoneSignUp = ({total}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
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
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      dispatch(setMobileValue(number));
      const response = await setUpRecaptha(number);
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
      const docRef = await addDoc(collection(firestoredb, "Users"), {
       "number" : number,    
      "uid" : uid,
      });
      console.log(docRef.id);
      dispatch(setUserIdValue(docRef.id));
      history.push({
        pathname : '/service',
        state : {total : total}
      })
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container  sx={{ marginLeft: 0, marginTop : '10px' }} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div style={{width: isMobile ? '90%' : '40%', display:'flex', flexDirection:'column',backgroundColor : '#ffffff', justifyContent:'flex-start',
   borderRadius : '10px', padding:'8px'}}>
        <Typography style={{margin:'8px'}}>Please sign in with your phone number</Typography>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none", margin:'auto' }}>
          <Form.Group style={{margin:'8px'}} controlId="formBasicEmail">
            <PhoneInput
            defaultCountry="IN"
              value={number}
              onChange={setNumber}
              inputComponent={Phonenumber}
              placeholder="Enter phone number"
            />
            <div style={{margin:'8px'}} id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button color="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="contained" color="primary" id="sendotp"  sx={{ background: '#056AB5',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',}}>
              Send Otp
            </Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group style={{margin:'8px'}} controlId="formBasicOtp">
            <TextField
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              size='small'
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button color="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="contained" color="primary"  sx={{ background: '#056AB5',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',}}>
              Verify
            </Button>
          </div>
        </Form>
        </div>
    </Grid>
  );
};

export default PhoneSignUp;