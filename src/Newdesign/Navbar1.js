import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../Images/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Card, Divider, Grid, Stack } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const pages = ['Home', 'Repair', 'About Us' , 'Contact Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Responsiveappbarnew() {
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const theme = useTheme();

  const handleOpenNavMenu = (event) => {
  //  setAnchorElNav(event.currentTarget);
  setAnchorElNav(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(true);
  };

  const handleCloseNavMenu = (nextlink) => {
  //  setAnchorElNav(null);
  setAnchorElNav(false);
  history.push({
    pathname: nextlink
  })
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [width, setWidth] = useState(window.innerWidth);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}
useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

 //const isMobile = width <= 768;
 const isMobile = true;


  return (
    <Box spacing={2} container style={{display : 'flex', flexGrow:1, flexDirection : isMobile ? "column" : "row", alignItems:'center', justifyContent:'flex-start',}}>
    <AppBar position="static" color="transparent" sx={{marginTop:0,boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Grid container style={{ display:'flex', flexDirection:'row', justifyContent:'space-between',alignItems:'center', }}>
            <Grid item>
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,  
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >  </Typography> */}
             <Typography variant="h4" style={{
               color: '#000',
               fontFamily: 'Cinzel Decorative',
               fontSize: '24px',
               fontStyle: 'normal',
               fontWeight: '400',
               lineHeight: 'normal',
             }
             }>
                Tamboola
             </Typography>
         
          </Grid>
          <Grid>
            <IconButton
              size="large"
              sx={{position : 'relative', right : '0px'}}
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{color : theme.palette.primary.main}} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              keepMounted
              open={anchorElNav}
              onClose={() => handleCloseNavMenu("")}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              
            >
              <Grid
              sx={{ height :'80vh'}}>
  <IconButton onClick={() => handleCloseNavMenu('')} sx={{position:'absolute', right:'10px', top :'10px'}}>
    <HighlightOffIcon sx={{color:theme.palette.primary.main}}/>
  </IconButton>
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
             // ))} */}
               <MenuItem key='home' sx={{marginTop:'30px'}} onClick={() => handleCloseNavMenu('/')}>
                <HomeIcon/>
                  <Typography textAlign="center" variant='body1' style={{margin:'8px'}}>Home</Typography>
                </MenuItem>
                <MenuItem key='profile' onClick={() => handleCloseNavMenu('/')}>
                <AccountCircleOutlinedIcon/>
                <Typography textAlign="center" variant='body1' style={{margin:'8px'}} >Profile</Typography>
                </MenuItem>
                <MenuItem key='orders' onClick={() => handleCloseNavMenu('/orders')}>
                <GradingOutlinedIcon/>
                <Typography textAlign="center" variant='body1' style={{margin:'8px'}} >Orders</Typography>
                </MenuItem>
                <MenuItem key='saved' onClick={() => handleCloseNavMenu('/')}>
                <HomeOutlinedIcon/>
                <Typography textAlign="center" variant='body1' style={{margin:'8px'}} >saved</Typography>
                </MenuItem>
                <MenuItem key='terms' onClick={() => handleCloseNavMenu('/')}>
                <PlaylistAddCheckOutlinedIcon/>
                <Typography textAlign="center" variant='body1' style={{margin:'8px'}} >Terms, Policies and licenses</Typography>
                </MenuItem>
                <MenuItem key='faq' onClick={() => handleCloseNavMenu('/')}>
                <QuizOutlinedIcon/>
                <Typography textAlign="center" variant='body1' style={{margin:'8px'}} >Browse FAQ's</Typography>
                </MenuItem>
                <MenuItem sx={{marginTop :'24px'}}>
                <Stack direction='row' spacing={2}>
                  <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <IconButton>
                <FacebookIcon sx={{color:theme.palette.primary.main, width:'30px', height:'30px'}}/>
              </IconButton>
              <Typography style={{color:theme.palette.primary.main,fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', fontWeight :400, lineHeight:'21px'}}>Facebook</Typography>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <IconButton>
                <InstagramIcon sx={{color:theme.palette.primary.main, width:'30px', height:'30px'}}/>
              </IconButton>
              <Typography style={{color:theme.palette.primary.main,fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', fontWeight :400, lineHeight:'21px'}}>Instagram</Typography>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <IconButton>
                <YouTubeIcon sx={{color:theme.palette.primary.main, width:'30px', height:'30px'}}/>
              </IconButton>
              <Typography style={{color:theme.palette.primary.main,fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', fontWeight :400, lineHeight:'21px'}}>YouTube</Typography>
              </Box>
            </Stack>
                </MenuItem>
                </Grid>
            </Menu>
          </Grid>
          </Grid>
  
{/* 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          {/* {
            isMobile ? 
           <></>
          : 
          <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, border: '1px solid #056AB5', background: 'linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFBFE' }}
        >
           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for mobile brand and model"
            inputProps={{ 'aria-label': 'Search for mobile brand and model' }}
          />
           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <MicIcon/>
          </IconButton>  
        </Paper>
          } */}
       

        </Toolbar>
      </Container>
    </AppBar>


    
    {/* {
      isMobile ? 
      <Paper
      component="form"
      sx={{ p: '2px 2px', margin: '8px', display: 'flex', alignItems: 'center', width:'80%', border: '1px solid #436BB0',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '20px'}}
    >
       <IconButton type="button" sx={{ p: '5px'}} >
        <SearchIcon sx={{color : '#056AB5' }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for mobile brand and model"
        inputProps={{ 'aria-label': 'Search for mobile brand and model' }}
      />
       <IconButton type="button" sx={{ p: '5px' }} >
        <MicIcon sx={{color : '#056AB5', fontSize: 30}}/>
      </IconButton>
     
    </Paper> : <></>
    } */}
    </Box>
  );
}
export default Responsiveappbarnew;