import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "otp-input-react";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { SubscribeUser } from "../../subscription";
import { useDispatch } from "react-redux";
import { setUserIdValue } from "../../reduxstore";

import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

function LoginNew() {
  const history = useHistory();
  const [number, setNumber] = useState("");
  const [captcha, setCaptcha] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const [_, setCookies] = useCookies(["access_token"]);

  useEffect(() => {
	    loadCaptchaEnginge(6); 
  }, []);

  const handleSubmitForm = async() => {

	 if (number === "" || number.length !== 10 || number === undefined) {
      toast.error("Please enter a valid phone number!");
    }else{

		 if (validateCaptcha(captcha) ===true) {
			try {
          const res = await axios.post(
            process.env.REACT_APP_BACKEND + "users/loginCheck",
            { number },
            {
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("verified");
          const data = res.data;
          setCookies("access_token", data.token);
		  localStorage.setItem("access_token", data?.token);
		  console.log("data", data);
		  dispatch(setUserIdValue(data?.id));
		  localStorage.setItem('userid', data?.id);
			history.push('/select')
        } catch (error) {
          console.error(error);
        }
     }

     else {
         alert('Captcha Does Not Match');
     }

	}
	
  }
  

  return (
    <Box>
      <Grid container>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: "20px auto 10px auto",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              lineHeight: "21.11px",
              fontFamily: "Work sans",
            }}
          >
            Login
          </Typography>
        </Grid>
        <Grid
          container
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Grid
            item
            sx={{
              width: "95%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                textAlign: "left",
                fontSize: "14px",
                lineHeight: "16.42px",
                fontFamily: "Work sans",
                color: "#000000",
              }}
            >
              Enter Number
            </Typography>
            <TextField
              sx={{
                width: "100%",
                border: "none",
                backgroundColor: "#D9D9D9",
                margin: "5px auto",
              }}
              type="tel"
              placeholder="995 587 9499"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Grid>
		  <div>
        <LoadCanvasTemplate />
         </div>
		 <TextField
              sx={{
                width: "95%",
                border: "none",
                backgroundColor: "#D9D9D9",
                margin: "5px auto",
              }}
              type="text"
			  autoComplete="off"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />
         
          <button
            className="btn-submit"
			onClick={()=>handleSubmitForm()}
          >
           Submit
          </button>
        </Grid>
      </Grid>

     { /*<ToastContainer
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
        style={{ bottom: "60px", maxWidth: "90%", margin: "auto", right: "0" }}
			/> */}
    </Box>
  );
}

export default LoginNew;
