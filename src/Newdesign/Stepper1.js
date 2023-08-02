import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  StepContent, StepConnector, Grid
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddressForm1 from "./Address1";
import DateTime1 from "./Datetime1";
import Payment1 from "./Payment1";
import PriceSummary1 from "./Pricesymmary1";
import { Link , useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import ResponsiveAppBar from "../Navbar/Navbar";
import Placeorder from "./Placeorder1";
import Paymentnew from "./paymentnew";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justifyContent:'flex-start',
    alignItems:'start'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// function getSteps() {
//   return ["Address", "Date & Time", "Order Summary", "Payment"];
// }

// function getStepContent(stepIndex) {
//   switch (stepIndex) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <DateTimePickerPage />;
//     case 2:
//       return <PriceSummary />;
//     case 3:
//       return <Payment />;
//     default:
//       return "Unknown stepIndex";
//   }
// }

export default function StepperForm1() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  ///const steps = getSteps();
  const location = useLocation();
  //const model = location.model;
  //const issue = location.issue;
  //console.log(issue);
  const model1 = useSelector((state) => state.model.value)
  const issues1 = useSelector((state) => state.issues.value)
  const total = "19000";
  const delivery = "Doorstep delivery";
  console.log(total);
  const mobile = useSelector((state)=> state.mobile.value);
  const [address, setAddress] = useState({});
  const [Datetime, setDate]= useState({});

  const handleData = (data) => {
    setAddress((prevdata) => ({...prevdata, ...data}));
    console.log(data);
  }

  const handleDatetime = (date) => {
    setDate((prevdata) => ({...prevdata, ...date}));
    console.log(date)

  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Address',
      component: <AddressForm1 onData={handleData} />,
    },
    {
      label: 'Schedule',
      component: <DateTime1 onDate={handleDatetime}/>,
    },
    {
      label: 'Payment',
      component: <PriceSummary1 model={model1} total={total} issue={issues1} addres={address} datetime={Datetime} mobile={mobile} delivery={delivery} />,
    },
    {
      label : 'Place order',
      component :<Paymentnew/>
    }
  ];

  const steps1 = [
    {
      label: 'Payment',
      component: <PriceSummary1 model={model1} issue={issues1} mobile={mobile} delivery={delivery}/>,
    },
    {
      label : 'Place order',
      component :<Placeorder/>
    }
  ];


  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AddressForm1 onData={handleData} handlenextpage={handleNext} />
      case 1:
        return <DateTime1 onDate={handleDatetime} handlenextpage={handleNext}/>;
      case 2:
        return <PriceSummary1 handlenextpage={handleNext} delivery={delivery} />;
      case 3:
        return <Paymentnew/>;
      default:
        return "Unknown stepIndex";
    }
  }

  function getStepContent1(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <PriceSummary1 handlenextpage={handleNext} delivery={delivery} />;
      case 1:
        return <Placeorder />;
      default:
        return "Unknown stepIndex";
    }
  }

  return delivery=== "Doorstep delivery" ? (
    <Grid sx={{ marginLeft: 0, marginTop : '8px', marginBottom:'50px' }} className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel connector={<StepConnector />}>
        {steps.map((step,index) => (
          <Step key={step.label}>
            <StepLabel style={{fontSize : '10px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '14px', fontWeight :400}}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
               <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button> */}
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </Grid>
  )
   :
   (
    <Grid sx={{ marginLeft: 0, marginTop : '8px', marginBottom:'30px' }} className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel connector={<StepConnector />}>
        {steps1.map((step,index) => (
          <Step key={step.label}>
            <StepLabel style={{fontSize : '10px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '14px', fontWeight :400}}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
               <Typography className={classes.instructions}>
              {getStepContent1(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </Grid>
   );
}
