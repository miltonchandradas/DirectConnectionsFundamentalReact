import React, { useEffect, useContext } from "react";

import { Panel } from "fundamental-react/Panel";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const AboutMe = () => {
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
      <section className="section-mypages">
         <h2>About me...</h2>
         <Panel className="aboutme-panel">
            <Panel.Header>
               <Panel.Head
                  description={user ? `${user.FIRSTNAME} ${user.LASTNAME}`: ""}
                  title={"Direct Connections - About me"}
               />
            </Panel.Header>
         </Panel>
      </section>
   );
};

export default AboutMe;
