import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography, Button, Stack, IconButton, Icon } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(6),
    marginTop: theme.spacing(8),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Links
            </Typography>
            <Stack direction='column' justifyContent='center' style={{width : '200px'}} >
              <Button variant='text'>Mobiles</Button>
           
              <Button variant='text'>Laptops</Button>
             
              <Button variant='text'>Watches</Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              More Info
            </Typography>
            <Stack direction='column' justifyContent='center' style={{width : '200px'}} >
            <Button variant='text'>Policy</Button>
              <Button variant='text'>Policy</Button>
              <Button variant='text'>Policy</Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Social Media
            </Typography>
            <Stack direction='row' spacing={2}>
              <IconButton>
                <FacebookIcon sx={{color:'blue'}}/>
              </IconButton>
              <IconButton>
                <InstagramIcon sx={{color:'red'}}/>
          
              </IconButton>
              <IconButton>
                <YouTubeIcon sx={{color:'red'}} />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
