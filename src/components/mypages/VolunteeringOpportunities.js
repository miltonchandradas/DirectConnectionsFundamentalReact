import React, { useEffect, useState, useContext } from "react";
import VolunteeringOpportunityItem from "./VolunteeringOpportunityItem";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import OpportunityContext from "../../context/opportunity/opportunityContext";

import { Link, MessageStrip } from "fundamental-react";

import {
   FlexBox,
   FlexBoxJustifyContent,
   FlexBoxWrap,
} from "@ui5/webcomponents-react";

import "@ui5/webcomponents-icons/dist/icons/add-employee.js";

const VolunteeringOpportunities = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const opportunityContext = useContext(OpportunityContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { opportunities, getOpportunities } = opportunityContext;

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
         getOpportunities(user.ID, false);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, user]);

   return (
      <section className="section-myopportunities">
         {user && (
            <h2>
               Volunteering Opportunities - {user.FIRSTNAME} {user.LASTNAME}
            </h2>
         )}

         <MessageStrip style={marginStyle} type="success">
            Please find below all the volunteering opportunities
         </MessageStrip>
         <Link href="/volunteeringopportunities">
            Click here to find out how you can help...
         </Link>

         <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
         >
            {opportunities &&
               opportunities.map((opportunity) => (
                  <VolunteeringOpportunityItem
                     key={opportunity.ID}
                     opportunity={opportunity}
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

export default VolunteeringOpportunities;
