import React, { useState, useEffect } from "react";
import {
   GoogleMap,
   withScriptjs,
   withGoogleMap,
   Marker,
   InfoWindow,
} from "react-google-maps";

const AddressMaps = ({ users, latitude, longitude }) => {
   const [selectedUser, setSelectedUser] = useState(null);

   useEffect(() => {
      const listener = (e) => {
         if (e.key === "Escape") {
            setSelectedUser(null);
         }
      };
      window.addEventListener("keydown", listener);

      return () => {
         window.removeEventListener("keydown", listener);
      };
   }, []);

   const lat = parseFloat(latitude);
   const long = parseFloat(longitude);

   const Map = () => {
      return (
         <GoogleMap
            defaultZoom={12}
            defaultCenter={{
               lat: lat,
               lng: long,
            }}
         >
            {users.map(
               (user) =>
                  user.LATITUDE &&
                  user.LONGITUDE && (
                     <Marker
                        key="Address"
                        position={{ lat: parseFloat(user.LATITUDE), lng: parseFloat(user.LONGITUDE) }}
                        onClick={() => {
                           setSelectedUser(user);
                        }}
                     ></Marker>
                  )
            )}

            {selectedUser && selectedUser.LONGITUDE && selectedUser.LATITUDE && (
               <InfoWindow
                  onCloseClick={() => setSelectedUser(null)}
                  position={{
                     lat: parseFloat(selectedUser.LATITUDE),
                     lng: parseFloat(selectedUser.LONGITUDE),
                  }}
               >
                  <div>
                     <h4>Address:</h4>
                     <p>
                        {selectedUser.FIRSTNAME} {selectedUser.LASTNAME}
                     </p>
                     <p>{selectedUser.FORMATTEDADDRESS}</p>
                  </div>
               </InfoWindow>
            )}
         </GoogleMap>
      );
   };

   const WrappedMap = withScriptjs(withGoogleMap(Map));

   return (
      <div style={{ width: "100vw", height: "100vh" }}>
         <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
         />
      </div>
   );
};

export default AddressMaps;
