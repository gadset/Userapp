import { Typography, Box, Grid, Button, FilledInput, TextField } from '@mui/material';
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
import { storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL , uploadBytes} from "firebase/storage";

const Preference = () => {
  const location = useLocation();
  const [cookies] = useCookies(['access_token']);
    const [value, setValue] = useState('Service center');
    const [value2, setValue2] = useState('With warranty');
    const [value3, setValue3] = useState('Normal');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState(null);
    const model = useSelector((state)=>state.model.value);
    const device = useSelector((state)=>state.device.value);
    // const model = localStorage.getItem('model');
    // const device = localStorage.getItem('device');

    const userid = useSelector((state)=>state.userid.value) || localStorage.getItem('userid');
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

	  const handleChangeImage = (filevalue) => 
	  {
		console.log("filevalue", filevalue);

	 const metadata = {
  			contentType: 'image'
		};
	
		setloading(true);

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + `${model}_${device}_${userid}_${filevalue?.name}`);
uploadBytes(storageRef, filevalue).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
       setFile(url);
	   setloading(false);
      });
    });
// const uploadTask = uploadBytesResumable(storageRef, filevalue);

 
//         uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//                 const percent = Math.round(
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 );  },
//             (err) => {
// 				console.log(err);},
//             () => {
//                 // download url
//                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
// 					 setFile(url);
//                 });
//             }
//         );

	  }

      const handlesendquote = async() => {
        // setloading(true);

// Upload file and metadata to the object 'images/mountains.jpg'
// Listen for state changes, errors, and completion of the upload.
		
// var imagefile = "";
		try{
		const res = await axios.post(process.env.REACT_APP_BACKEND + 'users/sendquote', {
            "device" :device,
            "model" : model,
            "issue" : issuearray,
            "quality" : value3,
            "warranty" : value2,
            "service": value,
			"description" : description,
			"imagefile" : file
        }, {
          headers: {
            // 'x-token': cookies.access_token
			'x-token' : localStorage.getItem('access_token'),
          }
        })
		const data = res.data;
        console.log("this is response data", data)
		localStorage.setItem('quoteid', data.id);
		}
       catch(error){
		setloading(false);
		console.log(error)
		toast.error("Error in raising a quote");
	   }
        // setloading(false);
        // toast.success(data.message) ;
        history.push({pathname : "/getquotes",});
      }


    return(
        <Box sx={{display :'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', marginTop:theme.spacing(1), marginBottom : '70px'}}>
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

	 <Grid item>
  <Typography variant='h4'>Description</Typography>
  
   <TextField
              sx={{
                width: "100%",
                border: "none",
                backgroundColor: "#D9D9D9",
                margin: "5px auto",
              }}
			  type='textarea'
              placeholder="Current Condition of your phone"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
    </Grid>

	<Grid item >
	<Typography variant='h4'>Upload Image of current Condition of your phone </Typography>
		<input type="file" accept="image/*" style={{height : '41px'}} onChange={(e)=> handleChangeImage(e.target.files[0])}/>

	</Grid>
	 <ColorRing
    visible={loading}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{margin:'auto'}}
    wrapperClass="blocks-wrapper"
    colors={['#000']}
  />
  <Button sx={{ marginBottom:theme.spacing(3), width:'160px', margin:'auto'}} disabled={loading} onClick={handlesendquote
  } >Get quotes</Button>

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