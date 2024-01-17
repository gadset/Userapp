import React from 'react';
import { styled } from '@mui/system';
import { TextField, IconButton, Box } from '@mui/material';
import {InputAdornment} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { makeStyles, withStyles } from "@mui/styles";
import search from './Newlogos/search.svg';
import { useTheme } from '@emotion/react';
const useStyles = makeStyles((theme) => ({
  textField: {
    backgroundColor: 'lightblue', // Change this to the desired background color // Change this to the desired padding value
  },
  input: {
    padding: '8px', // Adjust this value to modify the padding
  },
}));

const StyledTextField = styled(TextField)`
  background-color: #D9D9D9;
  border-radius: 5px;
  padding: 5px;
`;

const SearchComponent = ({label, placeholder}) => {
  const theme = useTheme()
  const classes = useStyles();
    return (
      <Box sx={{alignSelf:'center'}}>
        <TextField
        hiddenLabel
          size="small"
          sx={{marginTop : theme.spacing(1)}}
          placeholder={placeholder}
          fullWidth
          variant='outlined'
          InputProps={{
            classes: { input: classes.input },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <img src={search} alt='searchbox'/>
                </IconButton>
              </InputAdornment>
            ),
          }}

        />
      </Box>
    );
  };
  
  export default SearchComponent;