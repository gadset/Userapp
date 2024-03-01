import React, {useState} from 'react';
import glass2 from '../Images/Issuepage/glass1.jpeg';
import battery from '../Images/Issuepage/battery1.jpeg';
import { Grid, Card, Typography, CardMedia, CardContent, Box,Button, Modal, IconButton } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useTheme } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import battery1 from './Address/battery.svg';
import glassissue from './Address/glassissue.svg';
import { useDispatch } from 'react-redux';
import { setIssueValue } from '../reduxstore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const useStyles = makeStyles({
    cardpre: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textAlign:'left',
        background : '#E3E3E3',
        position: 'relative',
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
       width :'100%',
       height:'16px',
       position: 'absolute',
       bottom: 0
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection :'column',
      },
      paper: {
        backgroundColor: '#ffffff',
        padding:'16px',
        maxWidth: '90vw',
        maxHeight : '90vh',
        overflowY : 'auto',
        textAlign:'left',
        position:'absolute',
        bottom:0,
      },
      heading : {
        fontSize: '12px!important',
        fontStyle: 'normal',
        fontWeight: '500!important',
        lineHeight :'normal!important'
      },
      desissue : {
        fontSize: '12px!important',
        fontWeight: '400!important',
        lineHeight :'normal!important'
      }
})

const SelectIssue = () => {
    const classes = useStyles();
    const history = useHistory();
    const [issuearray, setissuearray] = useState([]);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
   

    const handleAddIssue = (issuename) => {
      setOpen(true);
      const array1 = issuearray.slice();
      array1.push(issuename);
      setissuearray(array1);
      console.log(array1);
    }

    const handlegetquotes = async() => {
      dispatch(setIssueValue(issuearray));
      history.push({
        pathname : '/preference',
        state : {issues : issuearray}
      })
    };

    const handleclickremove = (index) => {
     let array1 = issuearray.slice();
     array1.splice(index,1);
     setissuearray(array1);
    }

    const issues1 = [
        {
          name: 'Broken Glass Replacement ',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-28a37jz6LiA6uV1686638714733-638.jpg',
        },
        {
          name: 'Display Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-5xa3euuh6i9Qpw1686638584438-573.jpg',

        },
        {
          name: 'Battery Replacement',
          description:
            'The Charging port on my needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-2vpwzn17i2VxMz1686633568510-lowbattery2.jpg',

        },
        {
          name: 'Mic Replacement',
          description:
            'The mic on my device is not working and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-ks71e0bfw7U2Fd1686294581199-73.jpg',
        },
        {
          name: 'Charging port Replacement',
          description:
            'The Charging port on my needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-7er134qcOe8wJx1686638051282-bannerwithphonechargingblackwithflaticons.jpg',

        },
        {
          name: 'Speaker Replacement',
          description:
            'The mic on my device is not working and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-2sjczo7jp2FvqZ1686634039169-8434863.jpg',
        },
		{
          name: 'Power Button Replacement',
          description:
            'The mic on my device is not working and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-2bql7oqwDgQ3KW1686637511149-vector47575.jpg',
        },
		{
          name: 'Back Camera Replacement',
          description:
            'The mic on my device is not working and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-l4pk0ladh4NdAR1686639235290-camera52.jpg',
        },
		{
          name: 'Front Camera Replacement',
          description:
            'The mic on my device is not working and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-f2p8bbcbmcH4wU1686639683277-IMG20230613WA0009.jpg',
        },
		{
          name: 'Phone Dead/ Water Logged',
          description:
            'The mic on my device is not working and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-41vkv9wpE4eujM1686635972516-893.jpg',
        },
		{
          name: 'Unknown Replacement',
          description:
            'The mic on my device is not working and needs to be replaced.',
          img : 'https://d2sz1kgdtrlf1n.cloudfront.net/yelo_products/thumb-400-400-zvamtolTg9NxOI1686637637773-FebBusiness9.jpg',
        },
       ]

    return(
        <Box sx={{marginTop:theme.spacing(2), marginBottom:'50px',display:'flex', justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
            <Typography variant='h4'>Select Issue</Typography>
            <Grid container sx={{display:'flex', justifyContent:'space-between', width:'95%', marginTop:theme.spacing(1), marginBottom : '60px'}}>
              {
                issues1.map((issue) => (
                  <Grid item xs={5} sx={{margin:theme.spacing(1), position: 'relative'}}>
                    <Card className={classes.cardpre}  onClick={()=> handleAddIssue(issue['name'])} sx={{borderRadius : '0px', width:'100%', position: 'relative', cursor : 'pointer'}}>
                        <CardContent sx={{padding:theme.spacing(0.5)}}>
                          <CardMedia
                            sx={{height:'100px', width:'100%'}} 
                            image={issue['img']}
                            title="Image"
                          />
                          <Typography sx={{WebkitLineClamp:2, wordWrap: 'breakword'}} className={classes.heading} noWrap>
                            {issue['name']}
                          </Typography>
                          <Typography
                            className={classes.desissue}
                            sx={{ WebkitLineClamp: 3, height: '60px'}}   
                          >
                            {issue['description']}
                          </Typography>
                        </CardContent>
                      <Button className={classes.button1} sx={{borderRadius:'0px', background: '#D0D0D0', position: 'absolute', bottom: '0'}}>Add</Button>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>

            {
              issuearray.length>0 ?  
              <Grid container sx={{display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', bottom:'54px', padding:theme.spacing(2), borderRadius: '10px 10px 0px 0px',background: '#D9D9D9'}}>
                <Box sx={{display:'flex', flexDirection:'column'}} >
                  {
                    issuearray.map((isue, index)=>(
                      <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                        <Typography variant='body1'><AddIcon sx={{fontSize:'10px'}}/>{isue}</Typography>
                        <IconButton onClick={() => handleclickremove()}><HighlightOffIcon sx={{color : "#000"}}/></IconButton>
                      </Box>
                    ))
                  }
                </Box>
                <Button sx={{borderRadius : '20px', background: '#333', color : '#FFF!important', height:'24px'}} onClick={handlegetquotes}>Continue</Button>
              </Grid>
              : <></>
            }  

        </Box>
    )
}


export default SelectIssue;