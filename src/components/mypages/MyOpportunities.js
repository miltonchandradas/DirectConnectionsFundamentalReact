import React, { useEffect, useState, useContext } from "react";
import MyOpportunityItem from "./MyOpportunityItem";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import OpportunityContext from "../../context/opportunity/opportunityContext";

import {
   Badge,
   Button,
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

const MyOpportunities = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const opportunityContext = useContext(OpportunityContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { opportunities, getOpportunities } = opportunityContext;

   /* const handleHeaderClick = () => {
      console.log("Header was clicked...");
   };

   const sayHello = () => {
      console.log("Button was clicked...");
   }; */

   useEffect(() => {
      if (!user) {
         getUser();
      } else {
         removeMessage();
         getOpportunities(user.ID, true);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, user]);

   return (
      <section className="section-myopportunities">
         {user && (
            <h2>
               My Needs - {user.FIRSTNAME} {user.LASTNAME}
            </h2>
         )}

         <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
         >
            {opportunities &&
               opportunities.map((opportunity) => (
                  <MyOpportunityItem
                     key={opportunity.ID}
                     opportunity={opportunity}
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
                        <Button
                           design="Positive"
                           style={{ margin: "10px" }}
                           onClick={sayHello}
                        >
                           Edit my needs !
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

export default MyOpportunities;
