import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Typography, Button, Paper ,Modal, Grid } from '@mui/material/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
   
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#ffffff',
    padding:'16px',
    maxWidth: '90vw',
    maxHeight : '90vh',
    overflowY : 'auto',
    backgroundColor: '#2DBCE8',
borderRadius: '20px',

  },
}));

const PaymentSuccessful = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" component="h1" className={classes.title}>
          Payment Successful
        </Typography>
        <Typography variant="subtitle1" component="p">
          Thank you for your payment. Your order has been processed and we will assign a agent soon.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => window.location.href = '/'}
        >
         Go to Home page
        </Button>
      </Paper> */}
      <Modal
      className={classes.modal}
      open={modalOpen}
      >
        <Grid className={classes.paper} sx={{display:'flex',
flexDirection:'column',
justifyContent:'center'}}>
        <Typography style={{color: '#ffffff',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '22px', fontWeight :600, marginTop:'4px', textShadow:'0px 4px 4px rgba(0, 0, 0, 0.15)'}}>Your order has been placed, and a technician will get in touch with you shortly.
We appreciate you adopting Gadset.</Typography>
<Button
          variant="contained"
          color="primary"
          className={classes.button}
          sx={{ background: '#056AB5',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',}}
          onClick={() => window.location.href = '/'}
        >
         Go to Home page
        </Button>
        </Grid>
      </Modal>
    </div>
  );
};

export default PaymentSuccessful;
