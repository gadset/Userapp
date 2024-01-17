// import React, { useState, useEffect } from "react";
// import { useHistory , useLocation} from "react-router-dom";
// import { Form } from "react-bootstrap";
// import { Button, Grid, TextField, Typography } from '@mui/material';
// import "react-phone-number-input/style.css";
// import {auth,} from '../index';
// import {
//     signInWithPhoneNumber,
//     RecaptchaVerifier,
//   } from "firebase/auth";
// import { useDispatch } from 'react-redux';
// import { setMobileValue, setUserIdValue } from "../reduxstore";
// import { getAuth } from "firebase/auth";
// import { makeStyles } from "@mui/styles";
// import { useTheme } from "@emotion/react";
// import Alert from '@mui/material/Alert';


// const useStyles = makeStyles(theme => ({
//   input: {
//     backgroundColor: theme.palette.background.paper,
//     width : '100%'
//   }
// }))

// function setUpRecaptha(number) {
//     const recaptchaVerifier = new RecaptchaVerifier(
//       "recaptcha-container",
//       {'size': 'invisible'},
//       auth
//     );
//     recaptchaVerifier.render();
//     console.log('function called')
//     return signInWithPhoneNumber(auth, number, recaptchaVerifier);
//   }

// const Phonesignin = ({total}) => {
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const location = useLocation();
//   const [error, setError] = useState("");
//   const [number, setNumber] = useState("");
//   const [flag, setFlag] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [result, setResult] = useState("");
//   const [name, setName] = useState("");
//   const theme = useTheme();
//   const history = useHistory();

//   const [width, setWidth] = useState(window.innerWidth);


//   function handleWindowSizeChange() {
//       setWidth(window.innerWidth);
//   }
//   useEffect(() => {
//       window.addEventListener('resize', handleWindowSizeChange);
//       return () => {
//           window.removeEventListener('resize', handleWindowSizeChange);
//       }
//   }, []);
  
//   const isMobile = true;

//   const getOtp = async (e) => {
//     e.preventDefault();
//     console.log(number);
//     let newnum = '+91' + number;
//     console.log(newnum);
//     setError("");
//     if (number === "" || number === undefined)
//     {  return setError("Please enter a valid phone number!");}

//       dispatch(setMobileValue(newnum));
//       const response = await setUpRecaptha(newnum);
//       setResult(response);
//       console.log(response);
//        setFlag(true);
//     console.log(error);
//   };


//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (otp === "" || otp === null) return;
//     try {

//       await result.confirm(otp);
//       const auth= getAuth();
//       const user = auth.currentUser;
//       var uid;
//       if(user){
//         uid = user.uid;
//       }

// fetch(process.env.REACT_APP_BACKEND + "users", {
	
// method: "POST",

// body: JSON.stringify({
// phone : number,
// name : name
// }),

// headers: {
//   "Content-type": "application/json; charset=UTF-8"
// }
// })

// .then(response => response.json())

// .then(json => {dispatch(setUserIdValue(json['id'])) ;
// localStorage['gadsetid'] = json['id']; }  );

//       localStorage['verified'] = "yes";
     
//       history.push({
//         pathname : '/issuepage',
//       })
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <Grid container  sx={{ marginLeft: 0, marginTop : '10px' }} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
//       <div style={{width: isMobile ? '95%' : '40%', display:'flex', flexDirection:'column',backgroundColor : '#ffffff',textAlign : 'left' }}>
//         <Typography variant="h5" style={{marginTop:theme.spacing(1)}}>Name<sup>*</sup></Typography>
//             <TextField
//               variant="outlined"
//               required
//               id="name"
//               name="name"
//               value={name}
//               size='small'
//               fullWidth
//               sx={{border: 'none'}}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your Name"
//             />
//         <Typography variant="h5" style={{marginTop:theme.spacing(1)}}>Enter number</Typography>
//         {error && <Alert sx={{m: '5px 0'}} severity="error">{error} </Alert>}
//         <Form onSubmit={getOtp}>
//           <Form.Group controlId="formBasicEmail">
            
//             <TextField
//               hiddenLabel
//               size="small"
//               placeholder='868 874 9458'
//               fullWidth
//               variant='outlined'
//               InputProps={{
//                 classes: { input: {
//                   padding: '8px',
//                 } },
//               }}
//               value={number}
//               onChange={(e)=>setNumber(e.target.value)}
//               disabled={flag}
//             />
//             <div style={{margin:'8px'}} id="recaptcha-container"></div>
//           </Form.Group>
//           <div style={{ display: !flag ? "block" : "none" }} className="button-right">
//             <Button type="submit" id="sendotp" >
//               Send Otp
//             </Button>
//           </div>
//         </Form>
//         <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
//         <Typography variant="h5" style={{marginTop:theme.spacing(1)}}>Verify Otp</Typography>
//           <Form.Group controlId="formBasicOtp">
          
//             <TextField
//               type="otp"
//               InputProps={{
//                 className: classes.input
//               }}
//               placeholder="Enter OTP"
//               onChange={(e) => setOtp(e.target.value)}
//               size='small'
//             />
//           </Form.Group>
//           <div className="button-right" style={{marginTop:theme.spacing(1)}}>
//             <Button type="submit" >
//               Verify
//             </Button>
//           </div>
//         </Form>
//         </div>
//     </Grid>
//   );
// };

// export default Phonesignin;