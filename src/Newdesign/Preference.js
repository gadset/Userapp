import { Typography, Box, Grid, Button, FilledInput } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import React , {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ColorRing } from 'react-loader-spinner';

const Preference = () => {
  const location = useLocation();
    const [value, setValue] = useState('Service center');
    const [value2, setValue2] = useState('With warranty');
    const [value3, setValue3] = useState('Normal');
    const model = useSelector((state)=>state.model.value);
    const history = useHistory();
    const issuearray = location.state.issues;
    const [loading, setloading] = useState(false);
    const theme = useTheme();
    const handleChange = (e) => {
        setValue(e.target.value);
        console.log(e.target.value)
      }

      const handleChange3 = (e) => {
        setValue3(e.target.value);
        console.log(e.target.value)
      }

      const handlechange2 = (e) => {
        setValue2(e.target.value);
        console.log(e.target.value)
      }

      const handlesendquote = async() => {
        setloading(true);
        const auth= getAuth();
        const user = auth.currentUser;
        var uid;
        if(user){
          uid = user.uid;
        }
        const response = await fetch('http://localhost:8003/sendquote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }, 
            body : JSON.stringify({
              "uid" : uid,
              "model" : model,
              "issue" : issuearray,
              "quality" : value3,
              "warranty" : value2,
              "service": value
            }),   
          });
      setloading(false);
      history.push({
        pathname : '/getquotes',
      })

      }
    return(
        <Box sx={{display :'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', marginTop:theme.spacing(1)}}>
            <Typography variant='h4'>Select Preference</Typography>
            <Grid container spacing={2} sx={{display:'flex', flexDirection:'column', textAlign:'left', width:'95%'}}>
            <Grid item >
  <Typography variant='h4'>Quality</Typography>
  <FormControl>
      <RadioGroup
        defaultValue="Normal"
        value={value3}
        onChange={handleChange3}
      >
        <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
        <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
      </RadioGroup>
    </FormControl>
    </Grid>

  <Grid item>
  <Typography variant='h4'>Service type</Typography>
  <FormControl>
      <RadioGroup
        defaultValue="Service center"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="Service center" control={<Radio />} label="Service center" />
        <FormControlLabel value="Doorstep delivery" control={<Radio />} label="Doorstep delivery" />
      </RadioGroup>
    </FormControl>
    </Grid>

    <Grid item>
  <Typography variant='h4'>Warranty</Typography>
  <FormControl>
      <RadioGroup
        defaultValue="With warranty"
        value={value2}
        onChange={handlechange2}
      >
        <FormControlLabel value="With warranty" control={<Radio />} label="With warranty" />
        <FormControlLabel value="Without warranty" control={<Radio />} label="Without warranty" />
      </RadioGroup>
    </FormControl>
    </Grid>

  <Button sx={{ marginTop:theme.spacing(1), width:'160px', margin:'auto'}} disabled={loading} onClick={handlesendquote
  } >Get quotes</Button>
  <ColorRing
  visible={loading}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{margin:'auto'}}
  wrapperClass="blocks-wrapper"
  colors={['#000']}
/>
</Grid>
        </Box>
    )
}

export default Preference;