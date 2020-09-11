import React from "react";

/* import { LayoutGrid } from "fundamental-react/lib/LayoutGrid";
import { Panel } from "fundamental-react/lib/Panel"; */

import { Container, Row, Column } from "fundamental-react";
import { InfoLabel } from "fundamental-react/lib/InfoLabel";
import { Button } from "fundamental-react/lib/Button";
import howitworks from "../../resources/images/howitworks.jpg";

const Howitworks = () => {
   return (
      <section className="section-howitworks">
         <h2>How it works ?</h2>

         <Container cols={2}>
            <Row className="fr-panel">
               <Column>
                  <img src={howitworks} alt="" />
               </Column>
            </Row>
            <Row className="fr-panel">
               <Column>
                  <InfoLabel color={6} numeric>
                     1
                  </InfoLabel>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Nam, repellendus.
                  </p>
                  <InfoLabel color={6} numeric>
                     2
                  </InfoLabel>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Maxime, repudiandae?
                  </p>
                  <InfoLabel color={6} numeric>
                     3
                  </InfoLabel>
                  <p>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Unde totam velit minima, culpa corrupti aut.
                  </p>
                  <Button option="emphasized" className="fr-button">
                     Register for a new account !
                  </Button>
               </Column>
            </Row>
         </Container>
      </section>
   );
};

export default Howitworks;
