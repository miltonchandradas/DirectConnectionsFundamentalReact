import React, { Fragment, useState, useContext } from "react";
import { isMobile } from "react-device-detect";

import { Dialog, Button } from "fundamental-react";

import { Badge, Card, Text, Icon } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

/* import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import "@ui5/webcomponents-icons/dist/icons/list.js"; */

import "@ui5/webcomponents-icons/dist/icons/add-employee.js";

import ServiceContext from "../../context/service/serviceContext";

const ServiceItem = ({ service, user }) => {
   const serviceContext = useContext(ServiceContext);

   const { subscribeService, getServices } = serviceContext;

   const [showDialog, setShowDialog] = useState(false);
   const [isSubscribed, setIsSubscribed] = useState(false);

   const handleHeaderClick = () => {
      console.log("Header was clicked...");
   };

   const handleService = () => {
      console.log("Service ID: ", service.ID);
      console.log("Button was clicked...");

      setShowDialog(true);
   };

   let date = service.STARTDATE.substring(0, 10);

   return (
      <Fragment>
         <Card
            key={service.ID}
            avatar={isMobile ? null : <Icon name={"add-employee"} />}
            heading={`${service.PROVIDERFIRSTNAME} ${service.PROVIDERLASTNAME}`}
            subheading={
               isMobile ? `${date}` : `Start Date: ${date}`
            }
            status={service.STATE}
            className="ui5card"
            style={{ ...spacing.sapUiContentPadding }}
            headerInteractive
            onHeaderClick={handleHeaderClick}
         >
            <Button
               type="positive"
               compact
               onClick={handleService}
               disabled={service.STATE === "subscribed"}
               style={{ margin: "10px", display: "block" }}
            >
               Contact {service.PROVIDERFIRSTNAME}
            </Button>

            <Badge
               style={{ margin: "10px", padding: "5px" }}
            >{`Category:  ${service.CATEGORYNAME}`}</Badge>
            <Text style={spacing.sapUiContentPadding}>
               {service.DESCRIPTION}
            </Text>
         </Card>
         <Dialog
            actions={[<Button option="transparent">Ok</Button>]}
            onClose={() => setShowDialog(false)}
            show={showDialog}
            title="Edit my need..."
         >
            <p>
               <b>Service ID:</b> {service.ID}
            </p>
            <p>
               Thank you for contacting. Please note that{" "}
               {service.PROVIDERFIRSTNAME} needs to approve your request.
               {service.PROVIDERFIRSTNAME} will get in touch with you shortly !!
            </p>
         </Dialog>
      </Fragment>
   );
};

export default ServiceItem;
