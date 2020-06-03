import React from "react";

import { Tab, TabGroup } from "fundamental-react/Tabs";

import Opportunities from "./Opportunities";

const Volunteer = () => {
   return (
      <section className="section-volunteer">
         <h2>Find the best volunteer opportunity for you</h2>

         <TabGroup className="fr-tabgroup">
            <Tab id="1" title="Community">
               <p>
                  45 volunteers are needed in your area !! Please contact us for
                  more details on how you can help...
               </p>

               <Opportunities />
            </Tab>
            <Tab id="2" title="Education and Literacy">
               <p>
                  45 volunteers are needed in your area !! Please contact us for
                  more details on how you can help...
               </p>
               <Opportunities />
            </Tab>
            <Tab id="3" title="Health and Medicine">
               <p>
                  45 volunteers are needed in your area !! Please contact us for
                  more details on how you can help...
               </p>
               <Opportunities />
            </Tab>
            <Tab id="4" title="Seniors">
               <p>
                  45 volunteers are needed in your area !! Please contact us for
                  more details on how you can help...
               </p>
               <Opportunities />
            </Tab>
            <Tab id="5" title="More">
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
