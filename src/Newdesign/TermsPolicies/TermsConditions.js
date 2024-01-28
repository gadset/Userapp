import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const TermsAndConditions = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>

      {/* Agreement Overview */}
      <Typography variant="h6" gutterBottom>
        1. Agreement Overview:
      </Typography>
      <Typography paragraph>
        1.1 These terms and conditions (the "Agreement") govern the use of the gadget repair services provided by tamboola.in (the "Service Provider").
      </Typography>

      {/* Service Description */}
      <Typography variant="h6" gutterBottom>
        2. Service Description:
      </Typography>
      <Typography paragraph>
        2.1 The Service Provider offers gadget repair services in Bangalore, India.
        <br />
        2.2 Services may include diagnosis, repair, and maintenance of various electronic devices and gadgets.
      </Typography>

      {/* Booking and Payment */}
      <Typography variant="h6" gutterBottom>
        3. Booking and Payment:
      </Typography>
      <Typography paragraph>
        3.1 Users can book repair services through the tamboola.in website or mobile application.
        <br />
        3.2 Payment details, including service charges and any applicable taxes, will be provided during the booking process.
        <br />
        3.3 Payments are to be made online through the designated payment gateway.
      </Typography>

      {/* Add the rest of the sections in a similar manner */}

      <Typography variant="body2" color="textSecondary" gutterBottom>
        By using tamboola.in's services, users acknowledge that they have read, understood, and agreed to these terms and conditions.
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
