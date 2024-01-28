// PrivacyPolicy.js
import React from 'react';
import { Typography, Paper } from '@mui/material';
import {Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', textAlign : 'left' }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        Effective date: Jan 1, 2024
      </Typography>

      <Typography variant="body1" paragraph>
        Tamboola.in (“us”, “we”, or “our”) operates the https://tamboola.in
        website (the “Service”).
      </Typography>

      <Typography variant="body1" paragraph>
        This page informs you of our policies regarding the collection, use, and
        disclosure of personal data when you use our Service and the choices
        you have associated with that data.
      </Typography>

      <Typography variant="body1" paragraph>
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

      <Typography variant="body1" paragraph>
        We collect several different types of information for various purposes to provide and improve our Service to you.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Types of Data Collected
      </Typography>

      <Typography variant="body1" paragraph>
        <strong>Personal Data</strong>
      </Typography>

      <Typography variant="body1" paragraph>
        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”). Personally identifiable information may include, but is not limited to:
      </Typography>

      {/* ... Continue rendering the rest of the Privacy Policy data */}

      {/* Include additional sections and paragraphs as needed */}
    </Paper>
  );
};

export default PrivacyPolicy;
