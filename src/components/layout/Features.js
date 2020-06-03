import React from "react";

import { LayoutGrid } from "fundamental-react/LayoutGrid";
import { Panel } from "fundamental-react/Panel";
import { Icon } from "fundamental-react/Icon";
import { InlineHelp } from 'fundamental-react/InlineHelp';

const Features = () => {
   return (
      <section className="section-features">
         <h2>Provide a service &mdash; Earn karma credits</h2>

         <LayoutGrid className="fr-layout">
            <Panel>
               <Panel.Body>
               <Icon glyph="family-care" size="l" className="icon-big"/>
                   <h3>Provide a service</h3>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Expedita voluptates unde facilis iste dicta sequi minima sed
                  ipsa blanditiis enim laboriosam ea beatae recusandae delectus
                  iure quidem dolor, corporis in?
                  
                  <InlineHelp className="fr-inlinehelp" text="Lorem ipsum dolor sit amet, consectetur adipiscing." />
               </Panel.Body>
            </Panel>
            <Panel>
               <Panel.Body>
               <Icon glyph="favorite" size="l" className="icon-big"/>
               <h3>Browse for services</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo necessitatibus aspernatur autem nostrum debitis
                  possimus pariatur provident consectetur impedit iure?
               </Panel.Body>
            </Panel>
            <Panel>
               <Panel.Body>
                  <Icon glyph="cart" size="l" className="icon-big"/>
                  <h3>My shopping cart</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis dolorum ad fuga error cupiditate, hic officiis
                  expedita cumque ut nisi voluptatum dignissimos est corporis
                  placeat.
               </Panel.Body>
            </Panel>
         </LayoutGrid>
      </section>
   );
};

export default Features;
