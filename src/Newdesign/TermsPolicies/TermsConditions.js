import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { arrayOfObjects } from './termsdata';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const TermsAndConditions = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} sx={{ marginTop : '16px'}}>
      <Typography variant="h5" gutterBottom>
        Terms and Conditions
      </Typography>


{
	arrayOfObjects.map((item, index) => (
		<div>
			<Typography variant="h6" gutterBottom>
        {index+1}. {item.heading}:
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
		{item?.points.map((point, index2)=> (
			<>
			{index+1}.{index2+1} {point}
        <br />

			</>
				
		))}
      </Typography>

		</div>
      
	) )
}



      <Typography variant="body2" color="textSecondary" gutterBottom>
        By using tamboola.in's services, users acknowledge that they have read, understood, and agreed to these terms and conditions.
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
