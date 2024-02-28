import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import featuresData from './whyusdata';

const FeatureCard = ({ title, description }) => (
  <Card style={{ marginBottom: '16px', width : '90%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const FeaturesList = () => {

  return (
    <div style={{display:'flex',marginTop : '16px',  flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
		<Typography variant='h5'> Why Us </Typography>
      {featuresData.map((feature, index) => (
        <FeatureCard key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  );
};

export default FeaturesList;
