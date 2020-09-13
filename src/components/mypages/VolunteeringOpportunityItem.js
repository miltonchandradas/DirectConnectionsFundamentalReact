import React, { Fragment, useState, useContext } from "react";
import { isMobile } from "react-device-detect";

import { Dialog, Button } from "fundamental-react";


import { Badge, Card, Text, Icon } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";


import "@ui5/webcomponents-icons/dist/icons/add-employee.js";

import OpportunityContext from "../../context/opportunity/opportunityContext";

const VolunteeringOpportunityItem = ({ opportunity, user }) => {
   const opportunityContext = useContext(OpportunityContext);

   const { subscribeOpportunity, getOpportunities } = opportunityContext;

   const [showDialog, setShowDialog] = useState(false);
   const [isSubscribed, setIsSubscribed] = useState(false);

   const handleHeaderClick = () => {
      console.log("Header was clicked...");
   };

   const handleVolunteeringOpportunity = () => {
      console.log("Opportunity ID: ", opportunity.ID);
      console.log("Button was clicked...");

      subscribeOpportunity(user, opportunity);

      setShowDialog(true);

      opportunity.STATE = "subscribed";

      setIsSubscribed(true);
   };

   let date = opportunity.STARTDATE.substring(0, 10);

   return (
      <Fragment>
         <Card
            key={opportunity.ID}
            avatar={isMobile ? null : <Icon name={"add-employee"} />}
            heading={`${opportunity.BENEFICIARYFIRSTNAME} ${opportunity.BENEFICIARYLASTNAME}`}
            subheading={
               isMobile ? `${date}` : `Start Date: ${date}`
            }
            status={opportunity.STATE}
            className="ui5card"
            style={{ ...spacing.sapUiContentPadding }}
            headerInteractive
            onHeaderClick={handleHeaderClick}
         >
            <Button
               type="positive"
               compact
               onClick={handleVolunteeringOpportunity}
               disabled={opportunity.STATE === "subscribed"}
               style={{ margin: "10px", display: "block" }}
            >
               Click to volunteer !
            </Button>

            <Badge
               style={{ margin: "10px", padding: "5px" }}
            >{`Category:  ${opportunity.CATEGORYNAME}`}</Badge>
            <Text style={spacing.sapUiContentPadding}>
               {opportunity.DESCRIPTION}
            </Text>
         </Card>
         <Dialog
            actions={[<Button option="transparent">Ok</Button>]}
            onClose={() => setShowDialog(false)}
            show={showDialog}
            title="Edit my need..."
         >
            <p>
               <b>Opportunity ID:</b> {opportunity.ID}
            </p>
            <p>
               Thank you for volunteering. Your benefactor will get in touch
               with you shortly !!
            </p>
         </Dialog>
      </Fragment>
   );
};

export default VolunteeringOpportunityItem;
