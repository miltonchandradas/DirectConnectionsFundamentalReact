import React, { useEffect, useState, useContext } from "react";
import { LoremIpsum } from "lorem-ipsum";

import axios from "axios";
import MyOpportunityItem from "./MyOpportunityItem";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import OpportunityContext from "../../context/opportunity/opportunityContext";

import { Link } from "fundamental-react/lib/Link";
import { Checkbox } from "fundamental-react/lib/Forms";
import { MessageStrip } from "fundamental-react/lib/MessageStrip";

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

let DateGenerator = require("random-date-generator");

const MyOpportunities = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const opportunityContext = useContext(OpportunityContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { opportunities, getOpportunities } = opportunityContext;

   const [showAll, setShowAll] = useState(true);

   const marginStyle = {
      marginTop: "20px",
      display: "block",
   };

   const isPast = (startDate) => {
      return new Date(startDate) < new Date();
   };

   const handleAddOpportunity = () => {
      addOpportunity(user.ID);
   };

   const handleShowAll = () => {
      setShowAll(!showAll);
   };

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   const addOpportunity = async (id) => {
      const config = {
         headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
         },
      };

      const lorem = new LoremIpsum({
         sentencesPerParagraph: {
            max: 8,
            min: 4,
         },
         wordsPerSentence: {
            max: 16,
            min: 4,
         },
      });

      let startDate = new Date(2020, 10, 1);
      let endDate = new Date(2020, 11, 31);

      let randomStartDate = DateGenerator.getRandomDateInRange(
         startDate,
         endDate
      );

      let payload = {
         beneficiaryId: id,
         categoryId: Math.floor(Math.random() * 5) + 1,
         description: lorem.generateSentences(2),
         startDate: randomStartDate,
         endDate: randomStartDate,
         estimatedHours: Math.floor(Math.random() * 5) + 1,
         additionalComments: lorem.generateSentences(2),
         difficultyLevel: Math.floor(Math.random() * 5) + 1,
      };

      try {
         const res = await axios.post(
            `${baseUrl}/api/v1/opportunities`,
            payload,
            config
         );

         console.log("Result: ", res);

         getOpportunities(user.ID, true);
      } catch (error) {
         console.log("Error: ", error);
      }
   };

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

         <MessageStrip style={marginStyle} type="success">
            Please find below all your needs
         </MessageStrip>
         <Button design="Transparent" onClick={handleAddOpportunity}>
            Click here to add your need...
         </Button>

         <FlexBox justifyContent={FlexBoxJustifyContent.Center}>
            <Checkbox
               checked={showAll}
               state="success"
               onChange={handleShowAll}
            >
               Show all needs (Past and Future)
            </Checkbox>
         </FlexBox>

         <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
         >
            {opportunities &&
               opportunities
                  .filter(
                     (allOpportunity) =>
                        !isPast(allOpportunity.STARTDATE) || showAll
                  )

                  .map((opportunity) => (
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
