import React, { useEffect, useContext } from "react";

import Header from "./Header";
import Features from "./Features";
import Howitworks from "./Howitworks";
import Volunteer from "./Volunteer";
import Contact from "./Contact";
import Footer from "./Footer";

import MessageContext from "../../context/message/messageContext";

const Home = (props) => {
   const messageContext = useContext(MessageContext);

   useEffect(() => {
      messageContext.removeMessage();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div>
         <Header />
         <Features />
         <Howitworks />
         <Volunteer />
         <Contact />
         <Footer />
      </div>
   );
};

export default Home;
