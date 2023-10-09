import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ForumIcon from '@mui/icons-material/Forum';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTheme } from '@emotion/react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useCookies } from 'react-cookie';
import Login from './Login';
import { useEffect, useState } from 'react';


export default function FixedNavigation1() {
    const theme = useTheme();
    const [cookies, removeCookie] = useCookies(['access_token']);
    const [value, setValue] = useState(false);
    const [loginToNavbar, setLoginToNavbar] = useState(false);
    
    useEffect(() => {
      if(cookies.access_token === 'undefined') {
          setValue(false)
      }else {
          setValue(true)
      }
    })

    const handleWhatsappClick = () => {
      window.location.href = 'https://wa.me/9620543935';
    }

    const handleCallClick = () => {
      window.location.href = 'tel:+918688749458';
    }

    const handleLogin = () => {
      setLoginToNavbar(true);
      localStorage.setItem('LoginToNavbar', 0);
      window.location.href = '/loginpage'
    }

    const openProfile = () => {
      window.location.href = '/profile'
    }
    

    return (
        <Box sx={{ zIndex : 999, background : 'white', height:'54px' }}>
          <Paper  elevation={3} >
            <BottomNavigation
            showLabels
            sx={{display:'flex', justifyContent:'space-between'}}
            >
              {/* <a href="tel:+918688749458"> */}
                <BottomNavigationAction onClick={handleCallClick} label="Call" icon={<WifiCalling3Icon sx={{color:theme.palette.primary.main}} />} />
              {/* </a> */}
              <BottomNavigationAction label="Chat" icon={<ForumIcon sx={{color:theme.palette.primary.main}} />} />


              {/* <a href="https://wa.me/9620543935">  */}
                <BottomNavigationAction label="Whatsapp" onClick={handleWhatsappClick} icon={<WhatsAppIcon sx={{color:theme.palette.primary.main}} />} /> 
              {/* </a> */}

              {/* <Link to='/profile'>   */}
              <BottomNavigationAction onClick={value ? openProfile : handleLogin} label={value ? 'Profile' : 'Sign In'} icon={<AccountCircleOutlinedIcon sx={{color:theme.palette.primary.main}} />} /> 
              {/* </Link> */}
             
            </BottomNavigation>
          </Paper>
        </Box>
      );    
}