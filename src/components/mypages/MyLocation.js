import React, { useEffect, useContext } from "react";

import { LayoutGrid } from "fundamental-react/LayoutGrid";
import { Panel } from "fundamental-react/Panel";

import AddressMap from "../maps/AddressMap";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const MyLocation = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;

   useEffect(() => {
      
      if (!user) {
         getUser();
      } else {
         removeMessage();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

   return (
      <section className="section-mylocation">
         {user && (
            <h2>
               My Location - {user.FIRSTNAME} {user.LASTNAME}
            </h2>
         )}
         <LayoutGrid cols={1}>
         <Panel className="fr-panel">
            {user && (
               <AddressMap
                  latitude={user.LATITUDE}
                  longitude={user.LONGITUDE}
                  address={user.FORMATTEDADDRESS}
               />
            )}
            </Panel>
         </LayoutGrid>
      </section>
   );
};

export default MyLocation;
