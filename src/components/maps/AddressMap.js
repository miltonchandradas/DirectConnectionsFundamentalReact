import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Map = () => {
   return (
      <GoogleMap
         defaultZoom={10}
         defaultCenter={{
            lat: 34.885931,
            lng: -77.505329,
         }}
      />
   );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const AddressMap = () => {
   return (
      <div style={{ width: "800px", height: "800px" }}>
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
