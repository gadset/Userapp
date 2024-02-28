import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import faqData from './faqdata';

const FAQs = () => {
  return (
	<>
	<Typography variant='h5' sx={{marginTop : '16px'}}> FAQ's </Typography>
    <div style={{textAlign:'left',width: '90%', margin : 'auto'}}>
		{
			faqData?.map((item, index) => (
				 <Accordion 		  style={{ marginTop: '10px'}}
>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
		  style={{ marginBottom: '10px'}}
        >
          <Typography variant="h6">{index+1}. {item?.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>
{
	item?.answer
}          </Typography>
        </AccordionDetails>
      </Accordion>

			))
		}
		
     
    </div>
	</>
  );
}

export default FAQs;
