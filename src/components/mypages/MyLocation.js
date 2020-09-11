import React, { useEffect, useContext } from "react";

/* import { LayoutGrid } from "fundamental-react/lib/LayoutGrid";
import { Panel } from "fundamental-react/lib/Panel"; */

import { Container, Row, Column } from "fundamental-react";
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
         <Container>
            <Row className="fr-panel">
               {user && (
                  <AddressMap
                     latitude={user.LATITUDE}
                     longitude={user.LONGITUDE}
                     address={user.FORMATTEDADDRESS}
                  />
               )}
            </Row>
         </Container>
      </section>
   );
};

export default MyLocation;
