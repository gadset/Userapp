import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 8,
  typography:{
    color: '#000',
fontFamily: 'Work Sans',
fontSize: '16px',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 'normal',
  },
  palette:{
    primary:{
      main : "#000",
    },
    secondary : {
      main : "#333",
    },
    background : {
      main : "#D9D9D9",
      paper : "#E3E3E3",
    },
    buttoncolor : {
      main : '#AAA',
    }
  },
  typography :{
     body1 : {
      fontFamily  : "Work Sans",
      fontSize :'14px',
      color: '#000',
      fontStyle : 'normal',
      fontWeight : '400',
     },
     body2 : {
      color: '#333',
      fontFamily: 'Inria Sans',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight:'normal',
     },
     h4 : {
      fontFamily : "Work Sans",
      fontSize : '18px',
      fontWeight: '500',
      margin : '8px',
     },
     h5 : {
      color: '#000',
fontFamily:'Work Sans',
fontSize: '20px',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 'normal',
margin : '8px',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background :'#D9D9D9',
          borderRadius : '10px',
          textTransform:'none'
        },
      },
    },
    MuiTextField : {
      styleOverrides : {
        root : {
          borderRadius: '5px',
color: '#000',
fontFamily: 'Work Sans',
fontSize: '16px',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 'normal',
border: '1px solid #AFB6B4',
background: 'var(--light-gray, #F0F0F0)',
        }
      }
    },
    MuiGrid : {
      styleOverrides : {
        root : {
          marginLeft : '0px',
          marginRight : '0px',
          paddingLeft : '0px',
          paddingRight : '0px'
        },
        item : {
          root : {
            marginLeft : '0px',
            marginRight : '0px',
            paddingLeft : '0px',
            paddingRight : '0px'
          }
        }
      }
    },
  },
});

export default theme;
