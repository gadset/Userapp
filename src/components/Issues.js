import { 
  Modal,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  TextField,
  CardMedia,IconButton,Paper, Typography ,Accordion, AccordionDetails, AccordionSummary, Grid, Divider, CardHeader, Chip,} from '@mui/material';
import { makeStyles } from '@mui/styles';
import glass from '../Images/Issuepage/glass.svg'
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import click from '../Images/servicepage/clickicon.svg';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { setImageValue, setIssueValue, setMobileValue } from '../reduxstore';
import ResponsiveAppBar from '../Navbar/Navbar';
import { Edit } from '@mui/icons-material';
import PhoneSignUp from '../Login/PhoneSignup';
import { Stack } from 'react-bootstrap';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import glass2 from '../Images/Issuepage/glass1.jpeg';
import battery from '../Images/Issuepage/battery1.jpeg';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const useStyles = makeStyles((theme) => ({
  root: {
    display :'flex',
   padding: "8px",
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
   // textAlign: "center",
 //   margin: "16px",
   // marginLeft:'8px'
  // maxWidth: '90%'
  marginBottom :'30px'
  },
    card: {
      margin: '0 auto',
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
    },
    issue: {
      fontSize: 16,
      marginBottom: theme.spacing(1),
    },
    description: {
      fontSize: 14,
      color: 'gray',
      marginBottom: theme.spacing(2),
    },
    grid1 : {
        //width : '80%',
       // margin : '8px'
    },
    card1: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding:'4px',
      textAlign:'left'
    },
    media: {
    //  height: 250,
      //width: 250,
      marginRight: theme.spacing(2),
    },
    description1: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 3,
      lineHeight: 1.5,
    },
    button1: {
      marginLeft: 'auto',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: '#ffffff',
      padding:'16px',
      maxWidth: '90vw',
      maxHeight : '90vh',
      overflowY : 'auto',
      textAlign:'left',
      borderRadius: '30px 30px 0px 0px',
      position:'absolute',
      bottom:0
    },
  }));
  export default function IssuePage() {
    const classes = useStyles();
    const theme = useTheme();
    const location = useLocation();
    const mod = location.state.name ;
    const price = location.state.price;
    console.log(price);
    const dispatch = useDispatch();
    const history = useHistory();
    const [arr, setArr] = useState([]);
    const [total, setTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
     setOpen(false);
    }

    const handleOpen = () => {
      setOpen(true);
      console.log('yes')
    }
    const handleadd = (replacement, cost) => {
      var t = '' ;
      for(var i=0; i<cost.length ; i++){
       if(Number(cost[i])){
         console.log(Number(cost[i]))
         t = t + cost[i];
       }
      }
      arr.push({
        'name' : replacement,
        'cost' : t
      });
     // console.log((cost.slice(2)))
    
      setTotal(total + parseInt(t));
    }

    const handleclickedit = () => {
      history.push({
        pathname : '/brands',
      })
    }
    const handleaddissue = () => {
      dispatch(setIssueValue(arr));
      dispatch(setImageValue(price['image']));
      const auth= getAuth();
      const user = auth.currentUser;
      if(user){
      dispatch(setMobileValue(user.phoneNumber));
      history.push({
      pathname : '/service',
       state : {model : mod ,iss :arr, total:total, price: price}
       })  
      }
      else{
        setModalOpen(true);
      }
      
  

    }
    const handleCloseModal = () => {
      setModalOpen(false);
     }




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
     
     const isMobile = width <= 768;
   const issues1 = [
    {
      name: 'Glass Replacement',
      description:
        'The glass on my device is cracked and needs to be replaced.',
      img : glass2,
      discounted: price['screen']['discounted'],
      original: price['screen']['original'],
    },
    {
      name: 'Battery Replacement',
      description:
        'The glass on my device is cracked and needs to be replaced.',
      img : battery,
      discounted: price['screen']['discounted'],
      original: price['screen']['original'],
    },
    {
      name: 'Glass Replacement',
      description:
        'The glass on my device is cracked and needs to be replaced.',
      img : glass2,
      discounted: price['screen']['discounted'],
      original: price['screen']['original'],
    },
    {
      name: 'Battery Replacement',
      description:
        'The glass on my device is cracked and needs to be replaced.',
      img : battery,
      discounted: price['screen']['discounted'],
      original: price['screen']['original'],
    },
   ]
    const issues = [
        {
          name: 'Glass Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : glass,
          discounted: price['screen']['discounted'],
          original: price['screen']['original'],
        },
        {
          name: 'Battery Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : glass,
          discounted: price['screen']['discounted'],
          original: price['screen']['original'],
        },
        {
          name: 'Battery Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : glass,
          discounted: price['screen']['discounted'],
          original: price['screen']['original'],
        },

        {
          name: 'Battery Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : glass,
          discounted: price['screen']['discounted'],
          original: price['screen']['original'],
        },

        {
          name: 'Battery Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : glass,
          discounted: price['screen']['discounted'],
          original: price['screen']['original'],
        },

        // {
        //   name: 'Battery Replacement',
        //   description:
        //     'The battery on my device is no longer holding a charge and needs to be replaced.',
        //   img : glass
        // },
      ];
      
  
    return (
      <Grid container className={classes.root} sx={{paddingLeft:'0px'}}>
        <Grid item xs={12} sx={{paddingLeft:'0px'}}>
        <Typography style={{ color: '#056AB5',padding:'2px',margin:'2px',fontSize:'18px'}}>Select Issue</Typography>
        </Grid>
        <Modal 
           className={classes.modal}
           open={modalOpen}
           //onClose={handleCloseModal}
           >
            <PhoneSignUp total={total}/>
          </Modal>
      <div style={{display : 'flex', flexDirection:'column'}}>
          <Grid container xs={12} spacing={1} sx={{marginLeft : '0', display:'flex', alignItems:'start', paddingLeft:'0', justifyContent:'center'}}>
            {
              isMobile ?    
              <Grid xs={12} sx={{paddingLeft:'0'}}>
              <Card sx={{display:'flex', flexdirection:'row', justifyContent:'center', alignItems:'center', marginBottom:'8px' }}>
            <CardMedia
              component="img"
              sx={{ height: '70px', width:'50px'}} 
              image={price['image']}
              alt={mod}
            />
            <CardContent>
              <Typography>{mod}</Typography>
            </CardContent>
            <IconButton onClick={handleclickedit}>
              <Edit />
            </IconButton>
          </Card>
          </Grid> :
          <></>
            }
          
          {
            issues1.map((issue) => (
              <Grid xs={5.5} sx={{paddingLeft:'0px', margin:'4px'}}>
              <Card className={classes.card1}>

                  <CardMedia
                    className={classes.media}
                    sx={{height:'120px', width:'100%'}} 
                    image={issue['img']}
                    title="Image"
                  />
                  <CardContent sx={{padding:'0px'}}>
                    <Typography style={{color: '#0494949',fontSize : '16px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '20px', fontWeight :600, marginTop:'1px'}}>
                      {issue['name']}
                    </Typography>
                  </CardContent>
                
                  <Typography
                  variant="body1"
                  className={classes.description1}
                  color="textSecondary"
                  style={{color: '#0494949',fontSize : '15px',fontFamily:'Open sans', fontStyle:'normal',lineHeight : '20px', fontWeight :400, marginTop:'1px'}}
                >
                  {issue['description']}
                </Typography>
        
                {/* <Typography
                  variant="body1"
                  className={classes.description1}
                  color="textSecondary"
                >
                  Warranty : 2 months
                </Typography> */}
                <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-around', margin:'4px', alignItems:'center'}}>
                    <Typography >{issue.discounted}</Typography>
                    <Button onClick={()=>handleadd(issue.name, issue.discounted)} variant='contained' className={classes.button1}>+</Button>
                    </Box>
            </Card>
            </Grid>
            ))
          }
        </Grid>

<Grid item xs={12} className={classes.grid1} >
    <Card onClick={handleOpen} style={{backgroundColor : '#056AB5', color: '#fff', textAlign :'start', display:'flex', flexDirection:'row', borderRadius:'20px', margin:'8px'}}>
        <CardContent>
            <Box style={{justifyContent : 'start'}}>
            <Typography> Searching for other repair services? </Typography>
            <Typography> Please leave a message and someone from our team will contact you!</Typography>
            </Box>
        </CardContent>
        <CardContent>
        <CardMedia  component="img"
                    sx={{ width: 50 }}
                    image={click}
                    alt='click'/>
        <Typography> Click here! </Typography>
        </CardContent>
    </Card>
    </Grid>


<Modal
  open={open}
  onClose={handleClose}
  className={classes.modal}
>

  <Grid container className={classes.paper}>
  <IconButton onClick={handleClose} sx={{position:'absolute', right:'10px', top :'10px'}}>
    <HighlightOffIcon sx={{color:'#056AB5'}}/>
  </IconButton>
  <Typography style={{color: '#056AB5',fontSize : '16px',fontFamily:'Open Sans', fontStyle:'normal',lineHeight : '20px', fontWeight :600, marginTop:'16px'}}>Searching for other repair services?</Typography>
  <Typography style={{color: '#494949',fontSize : '12px',fontFamily:'Open Sans', fontStyle:'normal',lineHeight : '16px', fontWeight :500}}>Please leave a message and someone from our team will contact you!</Typography>

  <Typography style={{color: '#056AB5',fontSize : '16px',fontFamily:'Open Sans', fontStyle:'normal',lineHeight : '20px', fontWeight :600, marginTop:'16px'}}>Choose your problem type:</Typography>
  <Stack spacing={3} direction='column'>
    <Chip label="Mother board issue" color="primary" sx={{margin:'8px'}}/>
    <Chip label="Ic issue" color="primary" sx={{margin:'8px'}}/>
    <Chip label="camers issue" color="primary" sx={{margin:'8px'}}/>
    <Chip label="Dead phone" color="primary" sx={{margin:'8px'}}/>
  </Stack>

  <Box sx={{justifyContent:'center', display:'flex', flexDirection:'column', alignItems:'center'}}>
  <Typography style={{color: '#056AB5',fontSize : '16px',fontFamily:'Open Sans', fontStyle:'normal',lineHeight : '20px', fontWeight :600, marginTop:'16px'}}>Specifics of the Problem :</Typography>
  <TextField
          label=""
          multiline
          rows={4}
          fullWidth
        />
  <Button variant="contained" sx={{width:'50px', margin:'8px'}}> Submit </Button>
  </Box>
  </Grid>
</Modal>

    <Grid container item xs={12}  className={classes.grid1} style={{margin : '8px', display:'flex', flexdirection:'column', alignContent:'flex-start',}}>
      {
        isMobile ?<></> :
        <Grid item xs={12} sx={{paddingLeft:'0px'}}>
        <Card sx={{display:'flex', flexdirection:'row', justifyContent:'center', alignItems:'center', marginBottom:'8px' }}>
      <CardMedia
        component="img"
        sx={{ height: '70px', width:'50px'}} 
        image={price['image']}
        alt={mod}
      />
      <CardContent>
        <Typography>{mod}</Typography>
      </CardContent>
      <IconButton onClick={handleclickedit}>
        <Edit />
      </IconButton>
    </Card>
    </Grid>
      }
   
    <Grid item xs={12} sx={{paddingLeft:'0px'}}>
    <Card style={{textAlign :'center', display:'flex', flexDirection:'column', justifyContent:'center'}}>
       <Typography variant='h5' style={{margin:3}}>Selected Issue(s) </Typography>
        <CardContent>
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
      <TableBody>
          {arr.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cost}</TableCell>
            </TableRow>
          ))}
          <Divider/>
<TableRow key='total'
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell align="right">{total}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        {/* <Link to={{pathname:'/service', model: mod, iss : arr}}> */}
        <Button color='primary' onClick={handleaddissue} variant='contained' style={{margin:3}}>Next</Button>
        {/* </Link> */}
        </CardContent>
       
    </Card>     
    </Grid>
    </Grid>
    </div>
      </Grid>
    );
  }
    