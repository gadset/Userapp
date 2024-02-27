import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
}));

const ThankYouPage = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/orders');
    }, 10000); // Redirect after 8 seconds

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <Container className={classes.root}>
      <Typography variant="h5">
        Your order placed successfully. Redirecting to orders page...
      </Typography>
    </Container>
  );
};

export default ThankYouPage;
