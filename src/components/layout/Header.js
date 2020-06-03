import React from "react";
import { withRouter } from "react-router-dom";

import { Button } from "fundamental-react/Button";

const Header = (props) => {
   const onLearnMoreHandler = () => {
      props.history.push("/learn");
   };

   const onRegisterHandler = () => {
      props.history.push("/register");
   };

   return (
      <header>
         <div className="header-text">
            <h1>DIRECT CONNECTIONS</h1>
            <h1>Bringing the whole world closer !</h1>

            <Button
               option="emphasized"
               className="fr-button"
               onClick={onRegisterHandler}
            >
               How can I help ?
            </Button>
            <Button className="fr-button" onClick={onLearnMoreHandler}>
               Learn more...
            </Button>
         </div>
      </header>
   );
};

export default withRouter(Header);
