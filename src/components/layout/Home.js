import React from "react";

import Header from "./Header";
import Features from "./Features";
import Howitworks from "./Howitworks";
import Volunteer from "./Volunteer";
import Contact from "./Contact";
import Footer from "./Footer";

const Home = (props) => {

   console.log(props);

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
