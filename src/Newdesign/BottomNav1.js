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


export default function FixedNavigation1() {
    const theme = useTheme();
    return (
        <Box sx={{ zIndex : 999, background : 'white', height:'54px' }}>
          <Paper  elevation={3} >
            <BottomNavigation
            showLabels
            sx={{display:'flex', justifyContent:'space-between'}}
            >
              <BottomNavigationAction label="Chat" icon={<ForumIcon sx={{color:theme.palette.primary.main}} />} />
              <BottomNavigationAction label="Call" icon={<WifiCalling3Icon sx={{color:theme.palette.primary.main}} />} />
              <BottomNavigationAction label="Whatsapp" icon={<WhatsAppIcon sx={{color:theme.palette.primary.main}} />} />
              <BottomNavigationAction label="Profile" icon={<AccountCircleOutlinedIcon sx={{color:theme.palette.primary.main}} />} />
            </BottomNavigation>
          </Paper>
        </Box>
      );    
}