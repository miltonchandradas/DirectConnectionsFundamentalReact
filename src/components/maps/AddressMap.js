import React, { useState } from "react";
import {
   GoogleMap,
   withScriptjs,
   withGoogleMap,
   Marker,
   InfoWindow,
} from "react-google-maps";

const AddressMap = ({ latitude, longitude, address }) => {
   const [showInfoWindow, setShowInfoWindow] = useState(false);

   const Map = (latitude, longitude) => {
      return (
         <GoogleMap
            defaultZoom={10}
            defaultCenter={{
               lat: latitude,
               lng: longitude,
            }}
         >
            {!showInfoWindow && (
               <Marker
                  key="Address"
                  position={{ lat: latitude, lng: longitude }}
                  onClick={() => {
                     setShowInfoWindow(true);
                  }}
               ></Marker>
            )}

            {showInfoWindow && (
               <InfoWindow
                  onCloseClick={() => setShowInfoWindow(false)}
                  position={{ lat: latitude, lng: longitude }}
               >
                  <div>
                     <h4>Address:</h4>
                     <p>{address}</p>
                  </div>
               </InfoWindow>
            )}
         </GoogleMap>
      );
   };

   const WrappedMap = withScriptjs(
      withGoogleMap(() => Map(parseFloat(latitude), parseFloat(longitude)))
   );

   return (
      <div style={{ width: "100%", height: "100vh" }}>
         <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
         />
      </div>
   );
};

export default AddressMap;
