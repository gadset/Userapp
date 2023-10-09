import { Box, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {auth} from '../firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import OtpInput from "otp-input-react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";


function Login() {
    const history = useHistory();
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showotp, setShowotp] = useState(false);
    const [loading, setloading] = useState(false);
    const [message, setMessage] = useState(true);
    const loginInfo = localStorage.getItem('LoginToNavbar');
    console.log(loginInfo);

    const [_, setCookies] = useCookies(["access_token"]);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
    }
    

    function onSignup() {
        if(loading) {
            return;
        }
        if(number === '' || number.length !== 10 || number === undefined) {
            toast.error('Please enter a valid phone number!');
        }else {
            setloading(true);
            onCaptchVerify();
        
            const appVerifier = window.recaptchaVerifier;
            const formatPh = "+91" + number;
            console.log(formatPh);
        
            signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setloading(false);
                setShowotp(true);
                setMessage(false);
                console.log(confirmationResult);
            })
            .catch((error) => {
                // toast.warn('Try after some time');
                console.error(error);
            });
        }
      }

    const onOTPVerify = async() => {
        if(loading) {
            return;
        }
        window.confirmationResult.confirm(otp).then(async(res) => {
            console.log(res);
            console.log('Verified')
            try {
                const res = await axios.post('http://localhost:8003/users/loginCheck', {number}, {
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                })
                toast.success('verified')
                const data = res.data;
                console.log(data);
                console.log(data.token)
                setCookies("access_token", data.token);
                if(data.message === 'new user') {
                    history.push({pathname : "/username"})
                }
                if(loginInfo == 0) {
                    history.push({pathname : "/"})
                } else {
                    history.push({pathname : "/issuepage"})
                }
            } catch(error) {
                console.error(error)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
  return (
    <Box>
        <Grid container >
        <div id="recaptcha-container"></div>
            <Grid item sx={{display: 'flex', justifyContent: 'center', width: '100%', margin: '20px auto 10px auto'}}>
                <Typography sx={{fontSize: '18px', lineHeight: '21.11px', fontFamily: 'Work sans'}} >
                    Login
                </Typography>
            </Grid>
            <Grid container sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <Grid item sx={{width: '95%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', fontFamily: 'Work sans', color: '#000000'}} >Enter Number</Typography>
                    <TextField  
                        sx={{
                            width: '100%',
                            height: '41px',
                            border: 'none',
                            backgroundColor: '#D9D9D9',
                            margin: '5px auto'
                        }}
                        type='tel' 
                        placeholder='995 587 9499'
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </Grid>
                {
                    showotp && 
                    <Grid item sx={{width: '95%', margin: '10px auto', display: 'flex', flexDirection: 'column',}}>
                        <Typography sx={{textAlign: 'left', fontSize: '14px', lineHeight: '16.42px', fontFamily: 'Work sans', color: '#000000', mb: '5px'}} >Verify OTP</Typography>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="opt-container "
                        ></OtpInput>
                    </Grid>
                }
                <button onClick={message ? onSignup : onOTPVerify} className='btn-submit'> {loading && <i class="fa-solid fa-spinner fa-spin-pulse"></i> } {message ? 'Send OTP via Phone Number' : 'Verify OTP'} </button>
            </Grid>
        </Grid>

        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{bottom: '60px', maxWidth: '90%', margin: 'auto', right: '0'}}
        />

    </Box>
  )
}

export default Login