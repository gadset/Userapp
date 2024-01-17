import { Typography, Box, Grid, Button, FilledInput } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import React , {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from "firebase/auth";
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

const Preference = () => {
  const location = useLocation();
  const [cookies] = useCookies(['access_token']);
    const [value, setValue] = useState('Service center');
    const [value2, setValue2] = useState('With warranty');
    const [value3, setValue3] = useState('Normal');
    // const model = useSelector((state)=>state.model.value);
    // const device = useSelector((state)=>state.device.value);
    const model = localStorage.getItem('model');
    const device = localStorage.getItem('device');

    const userid = useSelector((state)=>state.userid.value)
    const history = useHistory();
    const issuearray = location.state.issues;
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
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

        const res = await axios.post(process.env.REACT_APP_BACKEND + 'users/sendquote', {
            "device" :device,
            "model" : model,
            "issue" : issuearray,
            "quality" : value3,
            "warranty" : value2,
            "service": value,
        }, {
          headers: {
            'x-token': cookies.access_token
          }
        })

        const data = res.data;
        console.log("this is response data", data)
		localStorage.setItem('quoteid', data.id);
        // setloading(false);
        // toast.success(data.message)
        history.push({pathname : "/getquotes"})
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
        {/* <ToastContainer
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
            style={{bottom: '60px', maxWidth: '90%', margin: 'auto', right: '0'}}
        /> */}
        </Box>
    )
}

export default Preference;