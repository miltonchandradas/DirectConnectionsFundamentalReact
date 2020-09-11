import React, { useEffect, useState, useContext } from "react";
import ServiceItem from "./ServiceItem";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import ServiceContext from "../../context/service/serviceContext";

import { Link } from "fundamental-react/Link";

import { MessageStrip } from "fundamental-react/MessageStrip";

import {
   Badge,
   Card,
   Text,
   FlexBox,
   FlexBoxJustifyContent,
   FlexBoxWrap,
   Icon,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";

import "@ui5/webcomponents-icons/dist/icons/add-employee.js";

const Services = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const serviceContext = useContext(ServiceContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { services, getServices } = serviceContext;

   const marginStyle = {
      marginTop: "20px",
      display: "block",
   };

   const handleHeaderClick = () => {
      console.log("Header was clicked...");
   };

   useEffect(() => {
      if (!user) {
         getUser();
      } else {
         removeMessage();
         getServices(user.ID, false);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, user]);

   return (
      <section className="section-myopportunities">
         {user && (
            <h2>
               Provided Services - {user.FIRSTNAME} {user.LASTNAME}
            </h2>
         )}

<MessageStrip style={marginStyle} type="success">
            Please find below all the services provided
         </MessageStrip>
         <Link href="/volunteeringopportunities">Click here to find out how you can help...</Link>

         <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
         >
            {services &&
               services.map((service) => (
                  <ServiceItem
                     key={service.ID}
                     service={service}
                     user={user}
                  />

                  /* let date = opportunity.STARTDATE.substring(0, 10);
                  return (
                     <Card
                        key={opportunity.ID}
                        avatar={<Icon name={"add-employee"} />}
                        heading={`${opportunity.BENEFICIARYFIRSTNAME} ${opportunity.BENEFICIARYLASTNAME}`}
                        subheading={`Start Date: ${date}`}
                        status={"Open"}
                        className="ui5card"
                        style={{ ...spacing.sapUiContentPadding }}
                        headerInteractive
                        onHeaderClick={handleHeaderClick}
                     >
                        <Button design="Positive" style={{ margin: "10px" }}>
                           Click to volunteer !
                        </Button>
                        <Badge
                           style={{ padding: "5px" }}
                        >{`Category:  ${opportunity.CATEGORYNAME}`}</Badge>
                        <Text style={spacing.sapUiContentPadding}>
                           {opportunity.DESCRIPTION}
                        </Text>
                     </Card>
                  ); */
               ))}
         </FlexBox>
      </section>
   );
};

export default Services;
