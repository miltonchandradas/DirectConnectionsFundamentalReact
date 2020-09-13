import React, { Fragment, useState } from "react";
import {
   Dialog,
   Table,
   Link,
   Button,
   InfoLabel,
   InlineHelp,
   LayoutPanel,
} from "fundamental-react";

import axios from "axios";
import { isMobile } from "react-device-detect";

import { Badge, Card, Text, Icon } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

import "@ui5/webcomponents-icons/dist/icons/add-employee.js";

const MyOpportunityItem = ({ opportunity }) => {
   const [topProviders, setTopProviders] = useState([]);
   const [showDialog, setShowDialog] = useState(false);
   const [showMatchesDialog, setShowMatchesDialog] = useState(false);

   const handleHeaderClick = () => {
      console.log("Header was clicked...");
   };

   const isPast = (startDate) => {
      return new Date(startDate) < new Date();
   };

   const handleEditOpportunity = () => {
      console.log("Opportunity ID: ", opportunity.ID);
      console.log("Button was clicked...");

      setShowDialog(true);
   };

   const handleMatches = async () => {
      console.log("Opportunity ID: ", opportunity.ID);
      console.log("Button was clicked...");

      // await getTopMatches(opportunity.ID);
      // console.log("Top matches: ", topMatches);

      getTopProviders(opportunity.ID);
      setShowMatchesDialog(true);
   };

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   const getTopProviders = async (opportunityId) => {
      const config = {
         headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      try {
         const res = await axios.get(
            `${baseUrl}/tech/getTop5ProviderMatches(opportunityId='${opportunityId}')`,
            config
         );

         console.log("Result: ", res);

         setTopProviders(
            res.data.value.map((provider) => {
               const pointsHelp = `Distance Points: ${provider.distancePoints}; Category Points: ${provider.categoryPoints}; Previous Rating Points: ${provider.previousRatingPoints}; Karma Points: ${provider.karma}`;
               const locationHelp = `Address: ${provider.address}`;

               let data = isMobile
                  ? {
                       rowData: [
                          <LayoutPanel>
                             <LayoutPanel.Body>
                                <p>
                                   <b>Name: </b>
                                   {provider.providerName}
                                </p>
                                <p>
                                   <b>Email: </b>
                                   {provider.email}
                                </p>
                                <p>
                                   <b>Ranking: </b>
                                   {provider.ranking}
                                </p>
                                <p>
                                   <b>Points: </b>
                                   {provider.points}
                                </p>
                                <p>
                                   <InlineHelp text={pointsHelp}></InlineHelp>
                                </p>
                                <br></br>
                                <p>
                                   <b>Distance: </b>
                                   <InfoLabel color={1}>
                                      {provider.distance}
                                   </InfoLabel>
                                </p>
                                <p>
                                   <b>Duration: </b>
                                   {provider.duration} {provider.mode}
                                </p>
                                <p>
                                   <InlineHelp text={locationHelp}></InlineHelp>
                                </p>
                             </LayoutPanel.Body>
                          </LayoutPanel>,
                       ],
                    }
                  : {
                       rowData: [
                          provider.ranking,
                          provider.points,
                          <InlineHelp text={pointsHelp}></InlineHelp>,
                          provider.providerName,
                          <a href="#">{provider.email}</a>,
                          <InfoLabel color={1}>{provider.distance}</InfoLabel>,
                          <InlineHelp text={locationHelp}></InlineHelp>,
                          `${provider.duration} ${provider.mode}`,
                       ],
                    };

               return data;
            })
         );
      } catch (error) {
         console.log("Error: ", error);
      }
   };

   let date = opportunity.STARTDATE.substring(0, 10);

   const defaultHeaders = isMobile
      ? [<Link subtle>Top Providers</Link>]
      : [
           <Link subtle>Ranking</Link>,
           <Link subtle>Points</Link>,
           <Link subtle>Points Info</Link>,
           <Link subtle>Provider Name</Link>,
           <Link subtle>Email</Link>,
           <Link subtle>Distance</Link>,
           <Link subtle>Location Info</Link>,
           <Link subtle>Driving Info</Link>,
        ];

   return (
      <Fragment>
         <Card
            key={opportunity.ID}
            avatar={isMobile ? null : <Icon name={"add-employee"} />}
            heading={`${opportunity.BENEFICIARYFIRSTNAME} ${opportunity.BENEFICIARYLASTNAME}`}
            subheading={isMobile ? `${date}` : `Start Date: ${date}`}
            status={opportunity.STATE}
            className="ui5card"
            style={{ ...spacing.sapUiContentPadding }}
            headerInteractive
            onHeaderClick={handleHeaderClick}
         >
            <Button
               compact
               type="positive"
               style={{ margin: "10px" }}
               disabled={
                  isPast(opportunity.STARTDATE) ||
                  opportunity.STATE === "subscribed"
               }
               onClick={handleEditOpportunity}
            >
               Edit my needs !
            </Button>
            <Button
               compact
               type="positive"
               onClick={handleMatches}
               disabled={
                  isPast(opportunity.STARTDATE) ||
                  opportunity.STATE === "subscribed"
               }
               style={{ margin: "10px", display: "inline-block" }}
            >
               Show top 5 matches !
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
            <p>The following ID is now updated !!</p>
         </Dialog>

         <Dialog
            actions={[<Button option="transparent">Ok</Button>]}
            onClose={() => setShowMatchesDialog(false)}
            show={showMatchesDialog}
            title="Top 5 matches for your need"
         >
            <Table headers={defaultHeaders} tableData={topProviders} />
         </Dialog>
      </Fragment>
   );
};

export default MyOpportunityItem;
