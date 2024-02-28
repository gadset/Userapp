import { forwardRef } from 'react'
import {TextField} from '@mui/material'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: theme.palette.background.paper,
    width : '100%'
  }
}))

const Phonenumber1 = (props, ref) => {
  const classes = useStyles()

  return (

    <TextField
      {...props}
      InputProps={{
        className: classes.input
      }}
      inputRef={ref}
      size='small'
      label=''
      variant='outlined'
      name='phone'
      placeholder='8688749458'
    />
  )
}
export default forwardRef(Phonenumber1);