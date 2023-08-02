import React , { useState} from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Grid, IconButton, Button } from "@mui/material";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./location.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useEffect } from "react";

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete(

  );
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    console.log(results);
    const { lat, lng } = await getLatLng(results[0]);

    console.log(lat);
    console.log("hello");
    setSelected({ lat, lng, address: results[0].formatted_address });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const Demo = () => {
    // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    //     useGeolocated({
    //         positionOptions: {
    //             enableHighAccuracy: false,
    //         },
    //         userDecisionTimeout: 5000,
    //     });

      
      const [latlng, setlatlng] = useState(null);
        const [status, setStatus] = useState(false);

    // const userinfo = {
    //   lat : coords.latitude,
    //   lng : coords.longitude
    // }

    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        navigator.geolocation.watchPosition((position) => {
          setStatus(true);
          console.log('hello')
       //   setLat(position.coords.latitude);
         // setLng(position.coords.longitude);
         setlatlng({
          lat : position.coords.latitude,
          lng : position.coords.longitude,
         })
         console.log('done')
        }, () => {
          setStatus('Unable to retrieve your location');
        });
      }
    }

    useEffect(() => {
      getLocation();
    }, []);
  
    const handleusecurrentlocation = () => {
      // const userinfo = {
      //   lat : coords.latitude,
      //   lng : coords.longitude
      // }
      setSelected(latlng);
    }
    
        const location = {
            address: 'Indiramma colony, Bobbili, 535558',
            lat: 18.572390,
            lng: 83.353170,
          }
          const [mapInfo, setMapInfo] = useState(null);
          const [selected, setSelected] = useState(null);
          const handleMapLoad = (map: any) => 
          setTimeout(() => setMapInfo(map), 100);
    

          const handlemapsclick = (e) => {
          setSelected({ 
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
    })
          }
  
      
          const { isLoaded } = useLoadScript({
            googleMapsApiKey: "AIzaSyBKIByYCgUyIZYIfQUchm4ZVtowK0tvfhg",
            libraries: ["places"],
          });
          const center = useMemo(() => ({ lat: 18.572390, lng: 83.353170 }), []);

    return status!=true ? (
        <div>{status}</div>
    ) :  (
        <Grid container >
          {/* <Grid item> 
          <Map location={location} zoomLevel={10}/>
          </Grid> */}
        <Grid item>
        <div style={{height:'100vh', width:'100vw'}}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
  <div style={{height:'80%', width:'70%'}} >
      <PlacesAutocomplete setSelected={setSelected} />
        <GoogleMap
          mapContainerClassName="map-container"
          center={latlng}
          zoom={17}
          onClick={handlemapsclick}
        >
          <Marker position={selected}   icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
/>
        </GoogleMap>
        <Button onClick={handleusecurrentlocation}>Use my current location</Button>
      </div>
      )}
    </div>
        </Grid>

 {/* <Grid item>
        <table>
            <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                </tr>
            </tbody>
        </table>
        </Grid> */}
        </Grid>
    ) ;
};

export default Demo;

