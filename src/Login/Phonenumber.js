import { forwardRef } from 'react'
import {TextField} from '@mui/material'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: '#fff',
    width : '200px'
  }
}))

const Phonenumber = (props, ref) => {
  const classes = useStyles()

  return (

    <TextField
      {...props}
      InputProps={{
        className: classes.input
      }}
      inputRef={ref}
      size='small'
      label='Phone Number'
      variant='outlined'
      name='phone'
    />
  )
}
export default forwardRef(Phonenumber)