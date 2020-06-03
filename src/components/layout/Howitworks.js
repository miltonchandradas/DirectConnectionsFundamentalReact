import React from "react";

import { LayoutGrid } from "fundamental-react/LayoutGrid";
import { Panel } from "fundamental-react/Panel";
import { InfoLabel } from "fundamental-react/InfoLabel";
import { Button } from "fundamental-react/Button";
import howitworks from "../../resources/images/howitworks.jpg";

const Howitworks = () => {
   return (
      <section className="section-howitworks">
         <h2>How it works ?</h2>

         <LayoutGrid cols={2}>
            <Panel className="fr-panel">
               <Panel.Body>
                  <img src={howitworks} alt="" />
               </Panel.Body>
            </Panel>
            <Panel className="fr-panel">
               <Panel.Body>
                  <InfoLabel color={6} numeric>1</InfoLabel>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, repellendus.</p>
                  <InfoLabel color={6} numeric>2</InfoLabel>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, repudiandae?</p>
                  <InfoLabel color={6} numeric>3</InfoLabel>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde totam velit minima, culpa corrupti aut.</p>
                  <Button option="emphasized" className="fr-button">
               Register for a new account !
            </Button>
               </Panel.Body>
            </Panel>
         </LayoutGrid>
      </section>
   );
};

export default Howitworks;
