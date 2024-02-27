// PrivacyPolicy.js
import React from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import {Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
	<>
	<Typography variant="h5" style={{marginTop : '16px'}}>
        Privacy Policy
      </Typography>
    <div style={{ padding: '10px', margin: '10px', textAlign : 'left' }}> 
      <Typography variant="body2" paragraph>
        Effective date: Jan 1, 2024
      </Typography>

      <Typography variant="body2" paragraph>
        Tamboola.in (“us”, “we”, or “our”) operates the https://tamboola.in
        website (the “Service”).
      </Typography>

      <Typography variant="body2" paragraph>
        This page informs you of our policies regarding the collection, use, and
        disclosure of personal data when you use our Service and the choices
        you have associated with that data.
      </Typography>

      <Typography variant="body2" paragraph>
        We use your data to provide and improve the Service. By using the
        Service, you agree to the collection
        and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from
        {' '}
        <Link to="/terms" rel="noopener noreferrer">
          Terms and Conditions
        </Link>.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Information Collection And Use
      </Typography>

      <Typography variant="body2" paragraph>
        We collect several different types of information for various purposes to provide and improve our Service to you.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Types of Data Collected
      </Typography>

      <Typography variant="body2" paragraph>
        <strong>Personal Data</strong>
      </Typography>

      <Typography variant="body2" paragraph>
        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”). Personally identifiable information may include, but is not limited to:
      </Typography>

	    <List>
          {['Email address', 'First name and last name', 'Phone number', 'Address, State, Province, ZIP/Postal code, City', 'Cookies and Usage Data'].map((item, index) => (
            <Typography>{item}</Typography>
          ))}
        </List>

		<Typography variant="body2" paragraph>
			We may also collect information how the Service is accessed and used (“Usage Data”). This Usage Data may include information such as your computer’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
      </Typography>

<Typography variant="body2" paragraph>
        <strong>Tracking & Cookies Data</strong>
      </Typography>

	  <Typography variant="body2" paragraph>
			We use cookies and similar tracking technologies to track the activity on our Service and hold certain information
      </Typography>
	  	  <Typography variant="body2" paragraph>
			Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
      </Typography>
	   <Typography variant="body2" paragraph>
			You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
      </Typography>

	  <Typography variant="body2" paragraph>
        <strong>Examples of Cookies we use: </strong>
      </Typography>
	  	   <Typography variant="body2" paragraph> Session Cookies. We use Session Cookies to operate our Service.
 </Typography>
		   	   <Typography variant="body2" paragraph>
				Preference Cookies. We use Preference Cookies to remember your preferences and various settings.
			   </Typography>
			   <Typography variant="body2" paragraph>
				Security Cookies. We use Security Cookies for security purposes.
			   </Typography>

 <Typography variant="body2" paragraph>
        <strong>Tamboola.in uses the collected data for various purposes:</strong>
      </Typography>

	  <List>
          {[
  "To provide and maintain the Service",
  "To notify you about changes to our Service",
  "To allow you to participate in interactive features of our Service when you choose to do so",
  "To provide customer care and support",
  "To provide analysis or valuable information so that we can improve the Service",
  "To monitor the usage of the Service",
  "To detect, prevent and address technical issues"
].map((item, index) => (
            <Typography variant='body1'>{item}</Typography>
          ))}
        </List>
  <Typography variant="body2" paragraph>
				Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
				<br/>
If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there.
				<br/>
Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
				<br/>
Tamboola.in will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
				<br/>
</Typography>

 <Typography variant="body2" paragraph>
        <strong>Disclosure Of Data
			<br/> Legal Requirements </strong>
      </Typography>

	    <List>
          {[
  "To comply with a legal obligation",
  "To protect and defend the rights or property of Tamboola.in",
  "To prevent or investigate possible wrongdoing in connection with the Service",
  "To protect the personal safety of users of the Service or the public",
  "To protect against legal liability"
].map((item, index) => (
            <Typography>{item}</Typography>
          ))}
        </List>



    </div>
	</>
  );
};

export default PrivacyPolicy;
