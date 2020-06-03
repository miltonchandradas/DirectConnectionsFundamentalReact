import React from "react";
import { LayoutGrid } from "fundamental-react/LayoutGrid";

const Footer = () => {
   return (
      <footer>
         <LayoutGrid cols={2} nogap>
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
         </LayoutGrid>
         <LayoutGrid cols={1} nogap>
            <div className="footer-copyright">
               <p>Copyright &copy; 2020 by SAP Fundamental React v0.9.0.  All rights reserved.</p>
            </div>
         </LayoutGrid>
      </footer>
   );
};

export default Footer;
