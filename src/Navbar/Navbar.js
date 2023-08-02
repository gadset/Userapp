import React, {useEffect, useState} from 'react';
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
import avatar from './avatar.svg';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import upper from './upper.svg';
import lower from './lower.svg';
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

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();

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
    pathname:'/' + nextlink
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
    <Box spacing={2} container style={{display : 'flex', flexGrow:1, flexDirection : isMobile ? "column" : "row", alignItems:'center', justifyContent:'flex-start'}}>
    <AppBar position="static" color="transparent" style={{marginTop:0, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
borderRadius: '0px 0px 20px 20px'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Grid container style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
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
             <img src={logo} alt="Your SVG" style={{height:'50px', width:'102px'}}/>
         
          </Grid>
          <Grid>
            <IconButton
              size="large"
              sx={{position : 'relative', right : '0px'}}
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{color : '#245DB2'}} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              open={anchorElNav}
              onClose={() => handleCloseNavMenu("")}
              PaperProps={{
                style: {
                  backgroundColor: '#056ab5', // Replace with your desired background color
                },
              }}
            >
              <Grid
              sx={{ height :'100'}}>
            <img src={upper} style={{position:'rela', left:'0px', top :'0px'}} alt='upper1'></img>
            <img src={lower} style={{position:'absolute', right:'0px', bottom :'0px'}} alt='lower1'></img>
  <IconButton onClick={() => handleCloseNavMenu('')} sx={{position:'absolute', right:'10px', top :'10px'}}>
    <HighlightOffIcon sx={{color:'#ffffff'}}/>
  </IconButton>
<MenuItem key='Account' sx={{marginTop:'24px'}}>
  <Avatar alt="Remy Sharp" src={avatar} sx={{height:'55px', width : '55px'}}/ >
                  <Stack   direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={0} >
                  <Typography textAlign="center" style={{color: '#ffffff',fontSize : '12px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px',fontWeight :300, lineHeight:'18px'}}>Welcome to Gadset </Typography>
                  <Typography style={{color: '#ffffff',fontSize : '16px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px', fontWeight :400, lineHeight:'24px'}}>Venkatesh </Typography>
                  </Stack>
                </MenuItem>
                <Divider/>
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
             // ))} */}
               <MenuItem key='home' onClick={() => handleCloseNavMenu('brands')}>
                <Card sx={{background: 'rgba(68, 68, 68, 0.34)',
borderRadius: '0px 5px 5px 0px', color:'#ffffff', display:'flex', flexDirection:'row', width:'200px', alignItems:'center'}}>
                <HomeIcon/>
                  <Typography textAlign="center" style={{fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', margin:'8px', fontWeight :400, lineHeight:'21px'}}>Home</Typography>
                </Card>
                </MenuItem>
                <MenuItem key='Repair' onClick={() => handleCloseNavMenu('brands')}>
                <Card sx={{background: 'rgba(68, 68, 68, 0.34)',
borderRadius: '0px 5px 5px 0px', color:'#ffffff', display:'flex', flexDirection:'row', width:'200px', alignItems:'center'}}>
                  <BuildIcon/>
                  <Typography textAlign="center"  style={{fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', margin:'8px', fontWeight :400, lineHeight:'21px'}}>Repair</Typography>
                  </Card>
                </MenuItem>
                <MenuItem key='About US' onClick={() => handleCloseNavMenu('')}>
                <Card sx={{background: 'rgba(68, 68, 68, 0.34)',
borderRadius: '0px 5px 5px 0px', color:'#ffffff', display:'flex', flexDirection:'row', width:'200px', alignItems:'center'}}>
                  <GroupsIcon/>
                  <Typography textAlign="center"  style={{fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', margin:'8px', fontWeight :400, lineHeight:'21px'}}>About US</Typography>
                </Card>
                </MenuItem>
                <MenuItem key='My account' onClick={() => handleCloseNavMenu('brands')}>
                <Card sx={{background: 'rgba(68, 68, 68, 0.34)',
borderRadius: '0px 5px 5px 0px', color:'#ffffff', display:'flex', flexDirection:'row', width:'200px', alignItems:'center'}}>
                  <PersonIcon/>
                  <Typography textAlign="center"  style={{fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', margin:'8px', fontWeight :400, lineHeight:'21px'}}>My Account</Typography>
                </Card>
                </MenuItem>
                <MenuItem key='Contact Us' onClick={() => handleCloseNavMenu('')}>
                <Card sx={{background: 'rgba(68, 68, 68, 0.34)',
borderRadius: '0px 5px 5px 0px', color:'#ffffff', display:'flex', flexDirection:'row', width:'200px', alignItems:'center'}}>
                  <ContactPageIcon/>
                  <Typography textAlign="center"  style={{fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', margin:'8px', fontWeight :400, lineHeight:'21px'}}>Contact Us</Typography>
                </Card>
                </MenuItem>
                <MenuItem sx={{marginTop :'24px'}}>
                <Stack direction='row' spacing={2}>
                  <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <IconButton>
                <FacebookIcon sx={{color:'#ffffff', width:'30px', height:'30px'}}/>
              </IconButton>
              <Typography style={{color:'#ffffff',fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', fontWeight :400, lineHeight:'21px'}}>Facebook</Typography>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <IconButton>
                <InstagramIcon sx={{color:'#ffffff', width:'30px', height:'30px'}}/>
              </IconButton>
              <Typography style={{color:'#ffffff',fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', fontWeight :400, lineHeight:'21px'}}>Instagram</Typography>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <IconButton>
                <YouTubeIcon sx={{color:'#ffffff', width:'30px', height:'30px'}}/>
              </IconButton>
              <Typography style={{color:'#ffffff',fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', fontWeight :400, lineHeight:'21px'}}>YouTube</Typography>
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
export default ResponsiveAppBar;