import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQs = () => {
  return (
    <div style={{textAlign : 'left '}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
		  style={{ marginBottom: '10px', marginTop : '12px' }}
        >
          <Typography variant="h6">1. What is Tamboola?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tamboola is a platform that connects customers looking to repair their devices with the right vendors who can repair at the best prices. It's a bidding platform where once a quote is requested by a customer, vendors will give a quote, and the same is displayed to the customer without sharing the contact details of the customer.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">2. How does Tamboola work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Customers submit requests for quotes regarding specific device issues, and vendors on Tamboola provide competitive quotes based on the customer's requirements.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">3. Who can use Tamboola?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tamboola is designed for both customers looking for quotes to resolve device issues and vendors who can offer services related to those issues.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">4. How do I submit a request for a quote?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Customers can easily select the device, specify the model no, and select the issue, and then request quotes. Once they request quotes, vendors' quotes start popping up on the platform as they keep submitting quotes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">5. How do vendors join Tamboola?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Vendors interested in providing quotes can join Tamboola by registering on the platform. Once approved, they can access customer requests and submit quotes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6a-content"
          id="panel6a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">6. How are quotes from vendors displayed to customers?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Quotes from vendors are presented to customers anonymously, ensuring a fair and competitive process. Customers can review and select the quote that best fits their needs.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7a-content"
          id="panel7a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">7. Can customers communicate with vendors directly?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, but only after the booking is confirmed, not before that.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8a-content"
          id="panel8a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">8. What types of device issues can I request quotes for?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Customers can request quotes for mobiles, laptops, tablets, and I watches as of now.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9a-content"
          id="panel9a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">9. Is there a rating system for vendors?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, Tamboola features a rating and review system, allowing customers to provide feedback on their experience with vendors. This helps maintain a high standard of service on the platform.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel10a-content"
          id="panel10a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">10. How is customer privacy maintained on Tamboola?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tamboola takes customer privacy seriously and ensures that personal information is handled securely. Only necessary details are shared with vendors during the quote process. No contact details are shared with vendors unless the order is selected and confirmed by the customer.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel11a-content"
          id="panel11a-header"
		  		  style={{ marginBottom: '10px', marginTop : '12px' }}

        >
          <Typography variant="h6">11. What happens if I am not satisfied with a vendor's service?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If a customer is not satisfied, they can provide feedback through the platform, and Tamboola will work to address any concerns and improve the overall experience.
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}

export default FAQs;
