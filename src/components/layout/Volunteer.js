import React from "react";

import { Tab, TabGroup, MessageStrip } from "fundamental-react";

import Opportunities from "./Opportunities";

const Volunteer = () => {
   return (
      <section className="section-volunteer">
         <h2 className="section-volunteer-title1">
            Find the best volunteer opportunity for you
         </h2>
         <h2 className="section-volunteer-title2">
            Volunteering opportunities
         </h2>

         <TabGroup className="fr-tabgroup">
            <Tab id="1" title="Community" style={{ marginBottom: "10px" }}>
               <MessageStrip type="success" noGlyph>
                  45 volunteers are needed in your area !! Please contact us for
                  more details on how you can help...
               </MessageStrip>

               <Opportunities />
            </Tab>
            <Tab id="2" title="Health and Medicine">
               <p>
                  45 volunteers are needed in your area !! Please contact us for
                  more details on how you can help...
               </p>
               <Opportunities />
            </Tab>
            <Tab id="3" title="Seniors">
               <p>
                  45 volunteers are needed in your area !! Please contact us for
                  more details on how you can help...
               </p>
               <Opportunities />
            </Tab>
         </TabGroup>
      </section>
   );
};

export default Volunteer;
