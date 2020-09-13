import React from "react";

import {
   Container,
   Row,
   Column,
   InfoLabel,
   Button,
   LayoutPanel,
} from "fundamental-react";

import howitworks from "../../resources/images/howitworks.jpg";

const Howitworks = () => {
   return (
      <section className="section-howitworks">
         <h2>How it works ?</h2>

         <Container>
            <Row className="fr-panel">
               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 6,
                     xLargeScreen: 6,
                  }}
               >
                  <LayoutPanel style={{ height: "100%" }}>
                     <LayoutPanel.Body>
                        <img src={howitworks} alt="" />
                     </LayoutPanel.Body>
                  </LayoutPanel>
               </Column>

               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 6,
                     xLargeScreen: 6,
                  }}
               >
                  <LayoutPanel style={{ height: "100%" }}>
                     <LayoutPanel.Body>
                        <div>
                           <InfoLabel color={6} numeric>
                              1
                           </InfoLabel>
                           <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Nam, repellendus.
                           </p>
                           <InfoLabel color={6} numeric>
                              2
                           </InfoLabel>
                           <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Maxime, repudiandae?
                           </p>
                           <InfoLabel color={6} numeric>
                              3
                           </InfoLabel>
                           <p>
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit. Unde totam velit minima, culpa
                              corrupti aut.
                           </p>
                           <Button option="emphasized" className="fr-button">
                              Register for a new account !
                           </Button>
                        </div>
                     </LayoutPanel.Body>
                  </LayoutPanel>
               </Column>
            </Row>
         </Container>
      </section>
   );
};

export default Howitworks;
