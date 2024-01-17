import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import SearchComponent from "./Misc/Searchcomponent";
import apple from "../logos/apple.svg";
import mi from "../logos/mi.svg";
import motorola from "../logos/motorola.svg";
import nothing from "../logos/nothing.svg";
import oneplus from "../logos/oneplus.svg";
import oppo from "../logos/oppo.svg";
import poco from "../logos/poco.svg";
import realme from "../logos/realme.svg";
import samsung from "../logos/samsung.svg";
import vivo from "../logos/vivo.svg";
import mobile from './Newlogos/phone.svg';
import laptop from './Newlogos/laptop.svg';
import smartwatch from './Newlogos/smartwatch.svg';
import Tablet from './Newlogos/tablet.svg';
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import search from './Newlogos/search.svg';
import banner from './Newlogos/gadset_banner.png';
import circle from './Newlogos/circle.svg';
import {regSw, subscribe} from '../helper';
import { useCookies } from 'react-cookie';
import axios from "axios";


const useStyles = makeStyles({
  card1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: " 0.5px solid rgba(73, 73, 73, 0.08)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.015)",
      transition: "0.15s linear",
      boxShadow: " 1px 1px 22px rgba(157, 184, 209, 0.5)",
      color: " #604CA5",
    },
  },
  modelcard: {
    backgroundColor: " rgba(223, 213, 236, 0.15)",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.015)",
      transition: "0.15s linear",
      boxShadow: " 1px 1px 22px rgba(157, 184, 209, 0.5)",
    },
  },

  scrollBox: {
    display: 'flex',
    whiteSpace: 'nowrap',
    flexWrap : 'nowrap',
    flexShrink : '0',
    animation: '$scroll 10s linear infinite', 
    minWidth: '100%',
    "&:hover": {
      animationPlayState: 'paused'
    }
  },
  '@keyframes scroll': {
    '0%': {
      transform: 'translateX(0%)',
    },
    '100%': {
      transform: 'translateX(-171%)', // Adjust the percentage (-100%) to control the scroll distance
    },
  },
});

const Home1 = () => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [data, setdata] = useState([]);
  const [cookies] = useCookies(['access_token']);
  
  useEffect(() => {
    const GetData = async() => {
      const res = await axios.get(process.env.REACT_APP_BACKEND + 'users/bidstodisplay')
      const data = res.data.data;
      console.log(data);
      console.log(res.data);
      setdata(data);

      const resi = await axios.get(process.env.REACT_APP_BACKEND + 'users/u', {
        headers: {
          'x-token': cookies.access_token
        }
      })
      // console.log(resi.data.user);
      localStorage.setItem('User',resi.data.user );
    }
    GetData();
  }, [10000])

  const bidscompleted = [
    { name: "iphone-13", amount: "4500" },
    { name: "iphone-13", amount: "100" },
    {name : "iphone-13", amount : '340'},
    {name : "iphone-13", amount : '901'},
    { name: "iphone-13", amount: "4500" },
    { name: "iphone-13", amount: "100" },
    {name : "iphone-13", amount : '340'},
    {name : "iphone-13", amount : '901'},
  ];

  const data1 = [
    { name: "apple", logo: apple },
    { name: "Xiaomi", logo: mi },
    { name: "Motorola", logo: motorola },
    { name: "Nothing", logo: nothing },
    { name: "OnePlus", logo: oneplus },
    { name: "Oppo", logo: oppo },
    { name: "Poco", logo: poco },
    { name: "Realme", logo: realme },
    { name: "samsung", logo: samsung },
    { name: "Vivo", logo: vivo },
  ];

  const devices = [
    { name: "Mobile", img: mobile },
    { name: "Laptop", img: laptop },
    { name: "Watches", img: smartwatch },
    { name: "Tablet", img: Tablet },
  ];


  const handlenextpage = (devi) => {
    console.log("hello");
    history.push({pathname : "/select",
  state : {device : devi }});
  };

  return (
    <Grid sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', marginBottom:'50px', marginTop:'5px'}}>
      <img src={banner} alt="gadset_banner" style={{width:'95%'}}/>
      <Grid item sx={{width:'95%',  overflowX:'hidden',}}>
        <Typography variant="h4">Recent Bids</Typography>
        <Box
          className={classes.scrollBox}
        >
          {data.map((bid, index) => (
            <Box key={index} sx={{display:'flex', flexDirection:'row', justifyContent:'center',   borderTop: '1px solid #333',
                        borderBottom: '1px solid #333',
                        background: '#F9F9F9',}}    >
              <img src={circle} alt='circle dot' style={{marginLeft: '5px', padding: '0 0 0 5px'}}></img>
              <Box sx={{display:'flex', flexDirection:'column', marginLeft:theme.spacing(1),alignItems:'start'}}>
                <Typography variant="body1">{bid.device} {bid.model}</Typography>
                {
                  bid.issu.map((issue) => (
                    <Typography variant="body1">{issue}</Typography>
                  ))
                }
              </Box>
            </Box>    
          ))}
        </Box>
      </Grid>
      
      <Typography variant="h5">
        Select Device
      </Typography>
      <Grid
        container
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          flex : 'Wrap',
          width:'86%'
        }}
      >
        {devices.map((device) => (
          <Grid
            item
            xs={5.5}
            className={classes.modelcard}
            onClick={() => handlenextpage(device['name'])}
            spacing={2}
            style={{
              border: "1px solid #EFEFEF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px",
              marginTop:'8px',
              background:' var(--light-gray, #F0F0F0)',
              
            }}
          >
            <Card
              elevation={0}
              sx={{ background: 'var(--light-gray, #F0F0F0)'}}
  
            >
              <CardMedia
                image={device["img"]}
                title={device["name"]}
                sx={{ height: "72px", width: "72px" }}
              />
              <Typography
                variant="body2"
                sx={{fontWeight: '600'}}
              >
                {device["name"]}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid>

      </Grid>
    </Grid>
  );
};

export default Home1;
