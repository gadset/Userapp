import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import IssuesWeSolve from './IssuesWeSolve';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const useStyles = makeStyles(theme => ({
 root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    whiteSpace: 'nowrap',
	display : 'flex',
    flexWrap: "nowrap",
    flexShrink: "0",
    animation: "$scroll 10s linear infinite",
    minWidth: "100%",
    "&:hover": {
      animationPlayState: "paused",
    },
  },
    "@keyframes scroll": {
    "0%": {
      transform: "translateX(0%)",
    },
    "100%": {
      transform: "translateX(-171%)", // Adjust the percentage (-100%) to control the scroll distance
    },
  },
  card: {
    maxWidth: 345,
	cursor : 'pointer',
    marginRight: theme.spacing(2),
  },
  media: {
    height: '50px',
    width: '50px',
  },
}));

const InfiniteScrollComponent = () => {
  const classes = useStyles();
  const [visibleImages, setVisibleImages] = useState([]);
  const history = useHistory();

  // Function to get a new set of visible images
  const getVisibleImages = () => {
    const newVisibleImages = [];

    // Calculate the number of images needed to fill the screen
    const screenWidth = window.innerWidth;
    const cardWidth = 345; // Width of each card
    const numImages = Math.ceil(screenWidth / cardWidth) + 1; // Add 1 for buffer

    // Populate the newVisibleImages array by repeating the images array
    for (let i = 0; i < numImages; i++) {
      newVisibleImages.push(...IssuesWeSolve);
    }

    setVisibleImages(newVisibleImages);
  };

  // Initialize visible images on component mount
  useEffect(() => {
    getVisibleImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-calculate visible images when window is resized
  useEffect(() => {
    const handleResize = () => {
      getVisibleImages();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div className={classes.root}>
        {visibleImages.map((issue, index) => (
          <div className={classes.card} key={index} onClick={()=> history.push('/select')}>
          <img
            className={classes.media}
            src={issue.img}
            alt={issue.name}
          />
          <Typography variant="body1" component="p" align="center">
            {issue.name}
          </Typography>
        </div>
        ))}
    </div>
  );
};

export default InfiniteScrollComponent;
