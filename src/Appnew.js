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
import { ToastContainer } from "react-toastify";
import Responsiveappbarnew from "./Newdesign/Navbar1";
import FixedNavigation1 from "./Newdesign/BottomNav1";
import Home1 from "./Newdesign/Home1";
import Selectdevice from "./Newdesign/Selectdevice";
import SelectIssue from "./Newdesign/Selectissue";
import Preference from "./Newdesign/Preference";
import Getquotes from "./Newdesign/Getquotes";
import Phonesignin from "./Newdesign/Phonesignin1";
import StepperForm1 from "./Newdesign/Stepper1";
import Orders from "./Newdesign/orders";
export default function App() {
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
  const isMobile = width <= 768;

  return (
    <Router>
      <center>
       <Grid className="App" style={{justifyContent:'center', display:'flex', flexDirection:'column', width : isMobile ? '100%' : '400px'}}> 
       <Responsiveappbarnew/>
        <ToastContainer/>
        <Grid style={{width:'100%', height:'90vh', overflowY : 'scroll'}}>
        <Switch>
         <Route exact path="/">
            <Home1/>
         </Route>
         <Route path="/select">
          <Selectdevice/>
         </Route>
         <Route path="/issuepage">
          <SelectIssue/>
         </Route>
         <Route path='/preference'>
          <Preference/>
         </Route>
         <Route path='/getquotes'>
          <Getquotes/>
         </Route>
         <Route path='/numberinput'>
          <Phonesignin/>
         </Route>
         <Route path='/stepper1'>
          <StepperForm1/>
         </Route>
         <Route path='/paymentsuccess'>
            <PaymentSuccessful/>
          </Route>
          <Route path='/orders'>
            <Orders/>
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