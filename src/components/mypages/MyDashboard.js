import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import KarmaCards from "../cards/KarmaCards";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const MyDashboard = (props) => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);

   const {
      isAuthenticated,
   } = authContext;

   const {
      removeMessage
   } = messageContext;

   const history = useHistory();

   useEffect(() => {
      if (!isAuthenticated) {
         history.push("/login");
      }

      removeMessage();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

   return (
      <section className="section-mydashboard">
         <h2>My Dashboard</h2>
         <KarmaCards></KarmaCards>
      </section>
   );
};

export default MyDashboard;
