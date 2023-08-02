import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardMedia, MenuItem, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tabletop from "tabletop";
//import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = "1fBgaf7FlrxdWcU_U2Vd0Gnp1iTq9nhHj9a06hY6EZrE";
const SHEET_ID ="0";
const CLIENT_EMAIL = "gadsetapi@gadset1.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6xwU/7OCZkcc3\nRKk27XUEpLuhb8FM8pGD07pgxekuAn952qZAM2URtXAiHajQGwfsPTWl+q/MRjSr\nf7j5AR8Nibk34SAQocpiMRG9E5efCMpug/w3weLMcMeOdY38mIxOH3hsSpC1mRcv\nNqx+gLBRU29O20zKPxyaYLekMPc1n5IxKu2EBwpeasR6S+92RiSmwX66SlX0OyqQ\n+1Y75kiEXNu0TXjsQ2sFvGzTTl2TJrcibOWyu6s3VikZP02gNtd/AwJ62cPrbpHG\nS1w+Mg8Zj/slWA8l/davZDeHx4NAvpo3XrpW7+7b6E/rWYA6TqnxtDeaBCPzRX+/\nDcMfzwHpAgMBAAECggEAI9NJx/2tBPfHwOucE2uPjvD0Bl6TsqkyTRle/fHoLImR\nHvPYAKd7At8M35ZVy3jr153T/P6tGp76ukx409YpuSSKENRPHLGTyqrDzsMDyZ7b\niUAqsB0x3enh9QrKTcGK4+84X3kb8aEoJ8eyZV9Usnyw9Gyu+XoKh/f2MXms6S1Z\n+uZLXbMYJ8kVbqj5zWvZbdOj5aZ2FxZZVhoJF9cXg03NrWDBitvPP4mxo+/XshEX\nzUDzdkMchhm04ZMXq/ykiBpEZuMUeYIwtHWupOEWCg1QpjcATugz6//8eCXK2IyQ\nbGndiHhkXtenaL2/1TEyROQKJZwh6hoGuR4xlRFlCwKBgQD+TWUzGttzevJDbA8x\n+rbnUjj7jqVPznn0KVe2q6+yaYgS2V2yigQfIUU971iMm26gMKgauljTQnx5Feko\no7bxklT+Aighiem1jWxINl9UwNaZJ+rWahDGG8c8AfnHQ17m9sjaKaTld2PaOmjv\nSwbdxyPgeroa1vrVTPz+hyRgUwKBgQC8Bjl/oxwincGHcf9ugjx37//TwnYor46D\n2r7bkl5AHXjjJJaooMLVLU17XnzIltivzE/kfl3raTjlHAJofsJB8H38dv5nTMN3\n8O8QEXtSiE9t1Og6Aj8jxt0sjyf2VDPS9hV5fTJ/+/j0EbYtg2VBqUJfIgMvTPH4\nEHo5ibA9UwKBgQCAMmgH4Uwr5RjoIDtwyKEX7/1F41025DHaglTzg41o9YZhai6v\n6J+3ScBsPpJ3H4wfOSglgTdyGJxDNmZ51D5PfaNXAaNVdP7aRVcG+FIKmcQVJWhf\neszF8g74E07lwvK+oD4UrNWx0AQIaVWo/DuT5eYSLgxPp3x/tvX7IgmWfQKBgHS6\nMIwKyPa8lV7u6LLEa6HR/zKJsS1E/+bfsElELvsC0P/CwT1iwFHz0/xZBoLJEzDg\nWGD0Cn6RTl796ojQ2OxyzuQjQ4EB6P/XNbL2B2ePdDAtUxZgOq6NUNXO8fI9CAdZ\n+q73iJhn54AuVrker4f5+lhxFyUQUc+8+wQpdJ49AoGAKePWHIo/Gr8WhtRHGaKt\nV9hmNZxrx1xc2j/v5c5EisRi8he0iL+GpymmPQEOD+JBZGwmI0TGtH9CgKj2SZO7\nkW+KhZ7Z0xQ6kYwhmEOoDrmq0wO1PtcCBpzDJNqk8sxOczDnWmyRcjW7nKxgDOQu\nMTxcfAIfEATwfPHIy3XWL6I=\n-----END PRIVATE KEY-----\n";

//const catalog = require('../../src/catalog');

function SelectPhone() {
  //var devices ;
  const [data, setData] = useState([]);
  const [phonecomp, setAge] = React.useState('');
  const [spec, setspec] = useState('')
  const [phonelast, setphone] = useState();
  const [prices, setPrices] = useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleSetPhone = (event: SelectChangeEvent) => {
    setspec(event.target.value);
    //console.log(spec)
  };


  const [results, setResults] = useState([]);

  async function search() {
    const response = await fetch('http://localhost:8000/search?phone=' + phonecomp, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      
    });
    const json = await response.json();
    setResults(json);
    //console.log(results)
  }

  async function search1() {
    const response = await fetch('http://localhost:8000/getphone?phone=' + spec, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
     
    });
    const json = await response.json();
    setphone(json);
    console.log(phonelast)
  }



  useEffect(() => {
    fetch('http://localhost:8000/')
    .then((response) => response.json())
    .then((data) => setData(data));

    Tabletop.init({
      key: "1fBgaf7FlrxdWcU_U2Vd0Gnp1iTq9nhHj9a06hY6EZrE",
      simpleSheet: false,
    })
      .then((data) => 
    {  setPrices(data)
       console.log("done")}
       )
      .catch((err) => console.warn(err));
    
      console.log(prices);
  }, []);

  return (
   <Grid container spacing={2} style={{marginTop : 10, marginLeft : 10}}>
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={phonecomp}
          label="phone"
          onChange={handleChange}
        >
         {
          data.map((device) => (
            <MenuItem value={device.id}>{device.name}</MenuItem>
          ))
         }
        </Select>
        <button onClick={search}>Search</button>
        {
          results.length>0 ?
          <>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={spec}
          label="spec"
          onChange={handleSetPhone}
        >
         {
          results.map((device) => (
            <MenuItem value={device.id}>{device.name}</MenuItem>
          ))
         }
        </Select>
        <button onClick={search1}>Search</button>
        </>
        : <></>
        }
        {
          phonelast ? 
          <Card style={{padding:10, margintop: 5}}>
            <CardMedia image={phonelast['img']}  sx={{ height: 140 }}/>
            <CardContent>
            <Typography>Name - {phonelast['name']}</Typography>
            <Typography>DisplaySize - {phonelast['quickSpec'][0]['value']}</Typography>
            <Typography>released date - {phonelast['detailSpec'][1]['specifications'][1]['value']}</Typography>
            <Typography>Announced data - {phonelast['detailSpec'][1]['specifications'][0]['value']}</Typography>
            <Typography>Price - {phonelast['detailSpec'][12]['specifications'][4]['value']} </Typography>
            </CardContent>
          </Card>
          :
          <></>
        }
   </Grid>
  );
}

export default SelectPhone;
