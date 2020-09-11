import React, { Fragment, useState, useContext } from "react";
import { Dialog } from "fundamental-react/lib/Dialog";
import { Table } from "fundamental-react/lib/Table";
import { Link } from "fundamental-react/lib/Link";
import { Button } from "fundamental-react/lib/Button";
import { InfoLabel } from "fundamental-react/lib/InfoLabel";
import { InlineHelp } from "fundamental-react/lib/InlineHelp";

import axios from "axios";

import MatchesContext from "../../context/matches/matchesContext";

import { Badge, Card, Text, Icon } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";

import "@ui5/webcomponents-icons/dist/icons/add-employee.js";

const MyOpportunityItem = ({ opportunity }) => {
   const matchesContext = useContext(MatchesContext);

   const { topMatches, getTopMatches } = matchesContext;

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

         /* const res = {
            "@odata.context":
               "$metadata#Collection(TechService.providersResult)",
            value: [
               {
                  ranking: 1,
                  success: true,
                  points: 43,
                  distancePoints: 15,
                  categoryPoints: 3,
                  previousRatingPoints: 0,
                  karma: 25,
                  providerId: "3a48c513-1a33-4509-bc8b-4cecaa9eb143",
                  providerName: "Antonia Zorn",
                  email: "antonia@live.com",
                  address: "5750 GA-9, N, Alpharetta, GA 30004-3967, US",
                  latitude: 34.143347,
                  longitude: -84.25111,
                  distance: "8.4 km",
                  mode: "driving",
                  duration: "12 mins",
                  karmaPoints: 3700,
                  category: "Giving Rides",
               },
               {
                  ranking: 2,
                  success: true,
                  points: 30,
                  distancePoints: 15,
                  categoryPoints: 10,
                  previousRatingPoints: 0,
                  karma: 5,
                  providerId: "46b01037-6029-449d-b48f-8d8f9308c192",
                  providerName: "Christoph Christophersen",
                  email: "christoph@live.com",
                  address:
                     "[8100 - 8130] Avalon Blvd, Alpharetta, GA 30009, US",
                  latitude: 34.070781,
                  longitude: -84.27481,
                  distance: "9.3 km",
                  mode: "driving",
                  duration: "13 mins",
                  karmaPoints: 1200,
                  category: "Tuition",
               },
               {
                  ranking: 3,
                  success: true,
                  points: 28,
                  distancePoints: 15,
                  categoryPoints: 3,
                  previousRatingPoints: 0,
                  karma: 10,
                  providerId: "a741d85b-d6db-4b3b-b871-79acf9ef52cb",
                  providerName: "Milton Chandradas",
                  email: "milton@live.com",
                  address: "325 Swingline Ln, Alpharetta, GA 30004-3150, US",
                  latitude: 34.106383,
                  longitude: -84.270679,
                  distance: "8.5 km",
                  mode: "driving",
                  duration: "12 mins",
                  karmaPoints: 1700,
                  category: "Grocery Pickup",
               },
               {
                  ranking: 4,
                  success: true,
                  points: 23,
                  distancePoints: 5,
                  categoryPoints: 3,
                  previousRatingPoints: 0,
                  karma: 15,
                  providerId: "8333b764-8252-4e16-ab4a-34163af0d61f",
                  providerName: "Evan Schiele",
                  email: "evan@live.com",
                  address:
                     "2950 Holcomb Bridge Rd, Alpharetta, GA 30022-5311, US",
                  latitude: 33.989482,
                  longitude: -84.274801,
                  distance: "15.5 km",
                  mode: "driving",
                  duration: "21 mins",
                  karmaPoints: 2300,
                  category: "Home Improvement",
               },
               {
                  ranking: 5,
                  success: true,
                  points: 23,
                  distancePoints: 10,
                  categoryPoints: 10,
                  previousRatingPoints: 0,
                  karma: 3,
                  providerId: "11539e8c-a4df-4337-8b9c-5c0474c854b4",
                  providerName: "Jean Lauzon",
                  email: "jean@live.com",
                  address: "591 Holcomb Bridge Rd, Roswell, GA 30076-1509, US",
                  latitude: 34.035527,
                  longitude: -84.342603,
                  distance: "20.3 km",
                  mode: "driving",
                  duration: "18 mins",
                  karmaPoints: 800,
                  category: "Tuition",
               },
            ],
         }; */

         console.log("Result: ", res);

         setTopProviders(
            res.data.value.map((provider) => {
               const pointsHelp = `Distance Points: ${provider.distancePoints}; Category Points: ${provider.categoryPoints}; Previous Rating Points: ${provider.previousRatingPoints}; Karma Points: ${provider.karma}`;
               const locationHelp = `Address: ${provider.address}`;

               return {
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
            })
         );
      } catch (error) {
         console.log("Error: ", error);
      }
   };

   let date = opportunity.STARTDATE.substring(0, 10);

   const defaultHeaders = [
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
            avatar={<Icon name={"add-employee"} />}
            heading={`${opportunity.BENEFICIARYFIRSTNAME} ${opportunity.BENEFICIARYLASTNAME}`}
            subheading={`Start Date: ${date}`}
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
