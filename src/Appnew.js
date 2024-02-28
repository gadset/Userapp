import React , { useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Brands from "./components/Brands";
import Cashify from "./components/Cashify";
import HomePage from "./components/Home";
import Repair from "./components/Repair";
import ResponsiveAppBar from "./Navbar/Navbar";
import SelectPhone from "./Select";
import Brand from "./components/Brand";
import IssuePage from "./components/Issues";
import ServiceType from "./components/Servicetype";
import AddressForm from "./components/Address";
import DateTimePickerPage from "./components/DateTime";
import StepperForm from "./components/Stepper";
import PhoneSignUp from "./Login/PhoneSignup";
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentSuccessful from "./components/paymentsuccessful";
import Footer from "./Navbar/Footer";
import Chatbot from "./Bot/chatbot";
import ChatIcon from '@mui/icons-material/Chat';
import { Grid } from "@mui/material";
import FixedNavigation from "./Navbar/BottomNav";
import Bidding from "./components/Biddingpage";
import { ToastContainer, toast } from "react-toastify";
import Responsiveappbarnew from "./Newdesign/Navbar/Navbar1";
import FixedNavigation1 from "./Newdesign/Navbar/BottomNav1";
import Home1 from "./Newdesign/Home1";
import Selectdevice from "./Newdesign/Selectdevice";
import SelectIssue from "./Newdesign/Selectissue";
import Preference from "./Newdesign/Preference";
import Getquotes from "./Newdesign/Getquotes";
import Phonesignin from "./Newdesign/Login/Phonesignin1";
import StepperForm1 from "./Newdesign/Stepper/Stepper1";
import Orders from "./Newdesign/Navbar/orders";
import Profile from "./Newdesign/Navbar/Profile";
import {regSw, subscribe} from './helper';
import Login from "./Newdesign/Login/Login";
import Username from "./Newdesign/Misc/Username";
import CustomerQuotes from "./Newdesign/Misc/CustomerQuotes";
import {messaging} from './firebase.config'
import { getToken } from "firebase/messaging";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
import { setUserIdValue } from "./reduxstore";
import { Start } from "@mui/icons-material";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PrivacyPolicy from "./Newdesign/TermsPolicies/PrivacyDoc";
import TermsAndConditions from "./Newdesign/TermsPolicies/TermsConditions";
import FAQs from "./Newdesign/TermsPolicies/FAQs";
import UpdateAddress from "./Newdesign/Navbar/UpdateDetails";
  import ReactGA from 'react-ga';
import FeaturesList from "./Newdesign/TermsPolicies/WhyUs";
import ThankYouPage from "./Newdesign/Stepper/ThankYou";
  const TRACKING_ID = "G-RM48RFTVRV"; // OUR_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);


export default function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [cookies] = useCookies(['access_token']);
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(true);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  
  console.log("app js running");
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  useEffect(() => {
	async function start(){
	if(localStorage.getItem('access_token') ){
		fetch(process.env.REACT_APP_BACKEND + 'users/u', {
			method: 'GET',
          headers: {
			 'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
            'x-token': localStorage.getItem('access_token') 
          }
        }).then(response => response.json())
		.then(json => {

			if(json?.isTokenExpired === true){
				localStorage.removeItem('access_token');
			setVerified(false);

			}
			
			else{
				dispatch(setUserIdValue(json.user)) ; 
		localStorage.setItem('userid', json.user)
			}
			})
		.catch((error) => {
			console.log(error);
			toast.error("Login again");
			setVerified(false);
		})
	}
	};
	start();	
  }, [localStorage.getItem('access_token') ])
  
  const isMobile = width <= 768;

  if(!localStorage.getItem('access_token') && verified){
	return (
		 <Router>
      <center>
       <Grid className="App" style={{justifyContent:'center', display:'flex', flexDirection:'column', width : isMobile ? '100%' : '400px', position: 'relative', zIndex: 999}}> 
       <Responsiveappbarnew/>
        <ToastContainer/>
        <Grid style={{width:'100%', height:'90vh', overflowY : 'scroll',position: 'relative', zIndex: 0}}>
        <Switch>
		  <Route exact path="/">
              <Home1/>
          </Route>
          <Route path="/select">
            <Selectdevice/>
          </Route>
		  <Route exact path='/loginpage'>
            <Login />
          </Route>
		  <Route exact path='/privacy'>
            <PrivacyPolicy />
          </Route>
		  <Route  path='/faq'>
            <FAQs />
          </Route>
		  <Route path="/terms"><TermsAndConditions/></Route>
		  <Route path="/whyus"><FeaturesList/></Route>
		  <Route path='/thankyou'><ThankYouPage/></Route>

		  <Redirect to ='/loginpage'/>
        </Switch>
        </Grid>
        <div style={{position: 'fixed', bottom: 0 ,width:'100%', left:0, right : 0}}>
<FixedNavigation1/>
</div>
      </Grid> 
      </center>
     
   </Router>

	)
  }

  return (
    <Router>
      <center>
       <Grid className="App" style={{justifyContent:'center', display:'flex', flexDirection:'column', width : isMobile ? '100%' : '400px', position: 'relative', zIndex: 999}}> 
       <Responsiveappbarnew/>
        <ToastContainer/>
        <Grid style={{width:'100%', height:'80vh', overflowY : 'scroll',position: 'relative', zIndex: 0, marginBottom : '30px'}}>
        <Switch>
		  <Route exact path="/">
              <Home1/>
          </Route>

          <Route path="/select">
            <Selectdevice/>
          </Route>

		  <Route exact path='/loginpage'>
            <Login />
          </Route>

		  <Route path="/issuepage">
            <SelectIssue/>
          </Route>

		<Route path='/thankyou'><ThankYouPage/></Route>

		  <Route path='/preference'>
            <Preference/>
          </Route>

			<Route path='/getquotes'>
            <Getquotes/>
          </Route>

		  <Route path='/stepper1'>
            <StepperForm1/>
          </Route>

		  <Route path='/orders'>
              <Orders/>
            </Route>
 <Route  path='/faq'>
            <FAQs />
          </Route>
        <Route path="/profile">
              <Profile/>
        </Route>

		  <Route  path='/privacy'>
            <PrivacyPolicy />
          </Route>
<Route  path='/updateDetails'>
            <UpdateAddress />
          </Route>
		  
<Route path="/terms"><TermsAndConditions/></Route>
 <Route path="/whyus"><FeaturesList/></Route>
		{/* unwanted as of now */}

          <Route exact path='/bids'>
            <CustomerQuotes />
          </Route>
          
          <Route exact path='/username'>
            <Username />
          </Route>
          
          <Route path='/numberinput'>
            <Phonesignin/>
          </Route>
          
          <Route path='/paymentsuccess'>
              <PaymentSuccessful/>
            </Route>
            <Route path="/customerquotes">
              <CustomerQuotes />
            </Route>
        </Switch>
        </Grid>
        <div style={{position: 'fixed', bottom: 0 ,width:'100%', left:0, right : 0}}>
<FixedNavigation1/>
</div>
      </Grid> 
      </center>
     
   </Router>
  );
}