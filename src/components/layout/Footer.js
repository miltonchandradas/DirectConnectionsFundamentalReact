import React from "react";
/* import { LayoutGrid } from "fundamental-react/lib/LayoutGrid"; */

import { Container, Row, Column } from "fundamental-react";

const Footer = () => {
   return (
      <footer className="footer">
         <Container>
            <Row>
               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 6,
                     xLargeScreen: 6,
                  }}
               >
                  <ul className="footer-nav">
                     <li>
                        <a href="#!">About us</a>
                     </li>
                     <li>
                        <a href="#!">Blog</a>
                     </li>
                     <li>
                        <a href="#!">Press</a>
                     </li>
                     <li>
                        <a href="#!">iOS App</a>
                     </li>
                     <li>
                        <a href="#!">Android App</a>
                     </li>
                  </ul>
               </Column>
               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 6,
                     xLargeScreen: 6,
                  }}
               >
                  <ul className="footer-social">
                     <li>
                        <a href="#!">
                           <i className="fab fa-facebook-f"></i>
                        </a>
                     </li>
                     <li>
                        <a href="#!">
                           <i className="fab fa-twitter"></i>
                        </a>
                     </li>
                     <li>
                        <a href="#!">
                           <i className="fab fa-google-plus-square"></i>
                        </a>
                     </li>
                     <li>
                        <a href="#!">
                           <i className="fab fa-instagram"></i>
                        </a>
                     </li>
                  </ul>
               </Column>
            </Row>
         </Container>
         <Container nogap>
            <Row>
               <Column>
                  <div className="footer-copyright">
                     <p>
                        Copyright &copy; 2020 by SAP Fundamental React v0.9.0.
                        All rights reserved.
                     </p>
                  </div>
               </Column>
            </Row>
         </Container>
      </footer>
   );
};

export default Footer;
