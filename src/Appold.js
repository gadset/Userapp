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
        <ResponsiveAppBar/>
        <ToastContainer/>
        {/* <div  className="telephone-icon">
        <a href="tel:+918688749458" aria-label="Call us">
        <PhoneIcon sx={{ color: 'white' }} />
        </a>
        </div>
        
        <div  className="chat-icon">
        <a href="/chatbot" aria-label="Call us">
        <ChatIcon sx={{ color: 'white' }} />
        </a>
        </div> */}
        {/* <nav>
          <ul>
            <li>
              <Link to="/select">select</Link>
            </li>
            <li>
              <Link to="/repair">repair</Link>
            </li>
            <li>
              <Link to="/cashify">cashify</Link>
            </li>
            <li>
              <Link to="/navbar">navbar</Link>
            </li>
            <li>
              <Link to="/home">home</Link>
            </li>
            <li>
              <Link to="/brands">brand</Link>
            </li>
            <li>
            <Link to="/selectissue">select issue</Link>
            </li>
            <li>
            <Link to="/service">service</Link>
            </li>
          </ul>
        </nav> */}
        <Grid style={{width:'100%'}}>
        <Switch>
          <Route path="/about">
           <SelectPhone/>
          </Route>
          <Route exact path ='/'>
            <HomePage/>
          </Route>
          <Route path="/repair">
            <Repair/>
          </Route>
          <Route path="/cashify">
           <Cashify/>
          </Route>
          <Route path='/navbar'>
          <ResponsiveAppBar/>
          </Route>
          <Route path='/brands'>
         <Brands/>
          </Route>
          <Route path='/brand/:id'>
         <Brand/>
          </Route>
          <Route path='/selectissue'>
        <IssuePage/>
          </Route>
          <Route path='/service'>
        <ServiceType/>
          </Route>
          <Route path='/address'>
            <AddressForm/>
          </Route>
          <Route path='/datetime'>
            <DateTimePickerPage/>
          </Route>
          <Route path='/stepper'>
            <StepperForm/>
          </Route>
          <Route path='/phonen'>
            <PhoneSignUp/>
          </Route>
          <Route path='/paymentsuccess'>
            <PaymentSuccessful/>
          </Route>
          <Route path='/chatbot'>
            <Chatbot/>
          </Route>
          <Route path='/getbid'>
            <Bidding/>
          </Route>
        </Switch>
        </Grid>
        <div style={{position: 'fixed', bottom: 0, left: 0, right: 0 }}>
<FixedNavigation />
</div>
      </Grid> 
      </center>
     
   </Router>
  );
}