import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import KarmaCards from "../cards/KarmaCards";
import { LayoutGrid } from "fundamental-react/LayoutGrid";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const MyDashboard = (props) => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);

   const {
      login,
      error,
      clearError,
      isAuthenticated,
      fbResponse,
   } = authContext;

   const history = useHistory();

   useEffect(() => {
      if (!isAuthenticated) {
         history.push("/login");
      }

      messageContext.setMessage("Successfully registered...", "success", true);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

   return (
      <div className="mydashboard">
         <KarmaCards></KarmaCards>
      </div>
   );
};

export default MyDashboard;
