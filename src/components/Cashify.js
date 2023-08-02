import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardMedia, MenuItem, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tabletop from "tabletop";
import Papa from "papaparse";
import Button from '@mui/material/Button';
import { color } from '@mui/system';

//import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = "1fBgaf7FlrxdWcU_U2Vd0Gnp1iTq9nhHj9a06hY6EZrE";
const SHEET_ID ="0";
const CLIENT_EMAIL = "gadsetapi@gadset1.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6xwU/7OCZkcc3\nRKk27XUEpLuhb8FM8pGD07pgxekuAn952qZAM2URtXAiHajQGwfsPTWl+q/MRjSr\nf7j5AR8Nibk34SAQocpiMRG9E5efCMpug/w3weLMcMeOdY38mIxOH3hsSpC1mRcv\nNqx+gLBRU29O20zKPxyaYLekMPc1n5IxKu2EBwpeasR6S+92RiSmwX66SlX0OyqQ\n+1Y75kiEXNu0TXjsQ2sFvGzTTl2TJrcibOWyu6s3VikZP02gNtd/AwJ62cPrbpHG\nS1w+Mg8Zj/slWA8l/davZDeHx4NAvpo3XrpW7+7b6E/rWYA6TqnxtDeaBCPzRX+/\nDcMfzwHpAgMBAAECggEAI9NJx/2tBPfHwOucE2uPjvD0Bl6TsqkyTRle/fHoLImR\nHvPYAKd7At8M35ZVy3jr153T/P6tGp76ukx409YpuSSKENRPHLGTyqrDzsMDyZ7b\niUAqsB0x3enh9QrKTcGK4+84X3kb8aEoJ8eyZV9Usnyw9Gyu+XoKh/f2MXms6S1Z\n+uZLXbMYJ8kVbqj5zWvZbdOj5aZ2FxZZVhoJF9cXg03NrWDBitvPP4mxo+/XshEX\nzUDzdkMchhm04ZMXq/ykiBpEZuMUeYIwtHWupOEWCg1QpjcATugz6//8eCXK2IyQ\nbGndiHhkXtenaL2/1TEyROQKJZwh6hoGuR4xlRFlCwKBgQD+TWUzGttzevJDbA8x\n+rbnUjj7jqVPznn0KVe2q6+yaYgS2V2yigQfIUU971iMm26gMKgauljTQnx5Feko\no7bxklT+Aighiem1jWxINl9UwNaZJ+rWahDGG8c8AfnHQ17m9sjaKaTld2PaOmjv\nSwbdxyPgeroa1vrVTPz+hyRgUwKBgQC8Bjl/oxwincGHcf9ugjx37//TwnYor46D\n2r7bkl5AHXjjJJaooMLVLU17XnzIltivzE/kfl3raTjlHAJofsJB8H38dv5nTMN3\n8O8QEXtSiE9t1Og6Aj8jxt0sjyf2VDPS9hV5fTJ/+/j0EbYtg2VBqUJfIgMvTPH4\nEHo5ibA9UwKBgQCAMmgH4Uwr5RjoIDtwyKEX7/1F41025DHaglTzg41o9YZhai6v\n6J+3ScBsPpJ3H4wfOSglgTdyGJxDNmZ51D5PfaNXAaNVdP7aRVcG+FIKmcQVJWhf\neszF8g74E07lwvK+oD4UrNWx0AQIaVWo/DuT5eYSLgxPp3x/tvX7IgmWfQKBgHS6\nMIwKyPa8lV7u6LLEa6HR/zKJsS1E/+bfsElELvsC0P/CwT1iwFHz0/xZBoLJEzDg\nWGD0Cn6RTl796ojQ2OxyzuQjQ4EB6P/XNbL2B2ePdDAtUxZgOq6NUNXO8fI9CAdZ\n+q73iJhn54AuVrker4f5+lhxFyUQUc+8+wQpdJ49AoGAKePWHIo/Gr8WhtRHGaKt\nV9hmNZxrx1xc2j/v5c5EisRi8he0iL+GpymmPQEOD+JBZGwmI0TGtH9CgKj2SZO7\nkW+KhZ7Z0xQ6kYwhmEOoDrmq0wO1PtcCBpzDJNqk8sxOczDnWmyRcjW7nKxgDOQu\nMTxcfAIfEATwfPHIy3XWL6I=\n-----END PRIVATE KEY-----\n";

//const catalog = require('../../src/catalog');

function Cashify() {
  //var devices ;
  const [data, setData] = useState();
  const [Brand, setbrand] = React.useState('');
  const [spec, setspec] = useState('')
  const [phonelast, setphone] = useState('');
  const [prices, setPrices] = useState('');
  const [results, setResults] = useState([]);



  useEffect(() => {
    Papa.parse("https://docs.google.com/spreadsheets/d/19mKtae0GV8vFGsdeQcbYzMHs9Yy7VkPGoTFehnoW6yA/pub?output=csv", {
        download: true,
        header: true,
        complete: (results) => {
          setData(results.data);
          console.log(results.data);
          const names = results.data.map(value => value.Brand);
          const set1 = new Set(names)
      setbrand([...set1]);
      console.log(set1);
        },
      });
      
    
  }, []);

  const handleclickbrand = (brand) => {
    const all = data.filter(item => item.Brand === brand);
    const models = new Set(all.map(value => value.Model));
   console.log(models);
    setspec([...models]); 
  }

  const handleclickmodel = (model) => {
    const all = data.filter(item => item.Model === model);
    //const colors = new Set(all.map(value => value.Color));
   console.log(all);
   setphone([...all]); 
  }

const handleclickcolor = (color) => {
    const lastprice = phonelast.filter(item => item.Color === color);
    console.log(lastprice);
    setPrices(lastprice);
}
  return (
  <Grid style={{margin : 3, padding:3}}>
    {
        Brand.length > 0 ? 
        Brand.map((brand) => (
            <Button variant='contained' style={{margin: 3}} onClick={() => handleclickbrand(brand)} value={brand}>{brand}</Button>
        ))
        :
        <></>
    }{
        spec.length > 0 ?
        <>
        <Typography> Models are shown here </Typography>
       { spec.map((model) => (
            <Button variant='contained' style={{margin: 3}} onClick={() => handleclickmodel(model)} value={model}>{model}</Button>
        )) }
        </>
        :
        <></>
    }
    {
        phonelast.length > 0 ? 
        <><Typography> Choose the color of {phonelast[0]['Model']}</Typography>
        {
            phonelast.map((color) => (
                <Button variant='contained' style={{margin: 3}} onClick={() => handleclickcolor(color['Color'])} value={color['Color']}>{color['Color']}</Button>
            ))
        }
        </>
        :
        <></>
    }
    {
        prices.length > 0 ?
        <>
        <Typography>The price to repair the screen of {prices[0]['Brand']} - {prices[0]['Model']} -- {prices[0]['Color']} is : </Typography>
        <Typography variant='body1'>{prices[0]['Discounted Price']}</Typography>
        <Typography  style={{textDecoration: 'line-through'}}  variant='body1'>{prices[0]["Previous Cost"]}</Typography>
        </> 
        : 
        <></>
    }

  </Grid>
  );
}

export default Cashify;
