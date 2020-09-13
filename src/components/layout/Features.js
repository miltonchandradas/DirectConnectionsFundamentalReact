import React from "react";

import { Container, Row, Column, LayoutPanel, Icon } from "fundamental-react";

import "@ui5/webcomponents/dist/Panel";

const Features = () => {
   return (
      <section className="section-features">
         <h2 className="section-features-title1">
            Provide a service &mdash; Earn karma credits
         </h2>
         <h2 className="section-features-title2">Earn karma credits</h2>

         <Container className="fr-layout">
            <Row>
               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 6,
                     xLargeScreen: 4,
                  }}
               >
                  <LayoutPanel style={{ height: "100%" }}>
                     <LayoutPanel.Header>
                        <LayoutPanel.Head title="Provide a service"></LayoutPanel.Head>
                        <LayoutPanel.Actions>
                           <Icon
                              glyph="family-care"
                              size="l"
                              className="icon-big"
                           />
                        </LayoutPanel.Actions>
                     </LayoutPanel.Header>
                     <LayoutPanel.Body>
                        <div>
                           Lorem ipsum dolor sit amet consectetur, adipisicing
                           elit. Expedita voluptates unde facilis iste dicta
                           sequi minima sed ipsa blanditiis enim laboriosam ea
                           beatae recusandae delectus iure quidem dolor,
                           corporis in?
                        </div>
                     </LayoutPanel.Body>
                  </LayoutPanel>
               </Column>

               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 6,
                     xLargeScreen: 4,
                  }}
               >
                  <LayoutPanel style={{ height: "100%" }}>
                     <LayoutPanel.Header>
                        <LayoutPanel.Head title="Browse for services"></LayoutPanel.Head>
                        <LayoutPanel.Actions>
                           <Icon
                              glyph="favorite"
                              size="l"
                              className="icon-big"
                           />
                        </LayoutPanel.Actions>
                     </LayoutPanel.Header>
                     <LayoutPanel.Body>
                        <div>
                           Lorem ipsum dolor sit amet consectetur adipisicing
                           elit. Explicabo necessitatibus aspernatur autem
                           nostrum debitis possimus pariatur provident
                           consectetur impedit iure?
                        </div>
                     </LayoutPanel.Body>
                  </LayoutPanel>
               </Column>

               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 6,
                     xLargeScreen: 4,
                  }}
               >
                  <LayoutPanel style={{ height: "100%" }}>
                     <LayoutPanel.Header>
                        <LayoutPanel.Head title="My shopping cart"></LayoutPanel.Head>
                        <LayoutPanel.Actions>
                           <Icon glyph="cart" size="l" className="icon-big" />
                        </LayoutPanel.Actions>
                     </LayoutPanel.Header>
                     <LayoutPanel.Body>
                        <div>
                           Lorem ipsum dolor sit amet consectetur adipisicing
                           elit. Debitis dolorum ad fuga error cupiditate, hic
                           officiis expedita cumque ut nisi voluptatum
                           dignissimos est corporis placeat.
                        </div>
                     </LayoutPanel.Body>
                  </LayoutPanel>
               </Column>
            </Row>
         </Container>
      </section>
   );
};

export default Features;
