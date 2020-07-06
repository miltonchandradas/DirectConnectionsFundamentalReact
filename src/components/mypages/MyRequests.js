import React, { useEffect, useContext } from "react";

import { LayoutGrid } from "fundamental-react/LayoutGrid";
import { Panel } from "fundamental-react/Panel";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const MyRequests = () => {
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
         <h2>My Requests</h2>
         <LayoutGrid cols={1}>
            <Panel className="fr-panel"></Panel>
         </LayoutGrid>
      </section>
   );
};

export default MyRequests;
