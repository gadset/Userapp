import { Box, Paper,IconButton, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

export default function Searchbar () {

    return(
        <Box>
        <Paper
        component="form"
        sx={{ p: '2px 2px', margin: '4px', display: 'flex', alignItems: 'center', width:'100%', border: '1px solid #436BB0',
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
      </Paper>
      </Box>
    )
}