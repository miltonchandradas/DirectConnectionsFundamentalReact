import React, { useEffect, useContext, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";

import axios from "axios";

import { Link } from "fundamental-react/Link";

import { MessageStrip } from "fundamental-react/MessageStrip";
import { Checkbox } from "fundamental-react/Forms";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import ServiceContext from "../../context/service/serviceContext";

import {
   Badge,
   Card,
   Text,
   FlexBox,
   FlexBoxJustifyContent,
   FlexBoxWrap,
   Icon,
   Button,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

import "@ui5/webcomponents-icons/dist/icons/add-employee.js";

let DateGenerator = require("random-date-generator");

const MyServices = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const serviceContext = useContext(ServiceContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { myServices, getMyServices } = serviceContext;

   const [showAll, setShowAll] = useState(true);

   const marginStyle = {
      marginTop: "20px",
      display: "block",
   };

   const isPast = (startDate) => {
      return new Date(startDate) < new Date();
   };

   const formatDate = (startDate) => {
      let myDate = new Date(startDate);

      return `${myDate.getUTCFullYear()}-${
         myDate.getUTCMonth() + 1
      }-${myDate.getUTCDate()}`;
   };

   const handleShowAll = () => {
      setShowAll(!showAll);
   };

   const handleAddService = () => {
      addOpportunity(user.ID);
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
         providerId: id,
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
            `${baseUrl}/api/v1/services`,
            payload,
            config
         );

         console.log("Result: ", res);

         getMyServices(user.ID);
      } catch (error) {
         console.log("Error: ", error);
      }
   };

   useEffect(() => {
      if (!user) {
         getUser();
      } else {
         removeMessage();
         getMyServices(user.ID);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, user]);

   return (
      <section className="section-myservices">
         {user && (
            <h2>
               My Services - {user.FIRSTNAME} {user.LASTNAME}
            </h2>
         )}
         <MessageStrip style={marginStyle} type="success">
            Please find below all the services that you are providing
         </MessageStrip>

         <Button design="Transparent" onClick={handleAddService}>
            Click here to add a service...
         </Button>
         <FlexBox justifyContent={FlexBoxJustifyContent.Center}>
            <Checkbox
               checked={showAll}
               state="success"
               onChange={handleShowAll}
            >
               Show all services (Past and Future)
            </Checkbox>
         </FlexBox>
         <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
         >
            {user &&
               myServices &&
               myServices
                  .filter(
                     (allservice) => !isPast(allservice.STARTDATE) || showAll
                  )
                  .map((service) => {
                     return (
                        <Card
                           key={service.ID}
                           avatar={<Icon name={"add-employee"} />}
                           heading={`${service.PROVIDERFIRSTNAME} ${service.PROVIDERLASTNAME}`}
                           subheading={`Difficulty: ${service.DIFFICULTYLEVEL}`}
                           status={service.STATE}
                           className="ui5card"
                           style={{
                              ...spacing.sapUiContentPadding,
                           }}
                           headerInteractive
                           onHeaderClick={"handleHeaderClick"}
                           key={service.ID}
                        >
                           <Badge
                              style={{
                                 marginTop: "10px",
                                 marginLeft: "20px",
                                 padding: "5px",
                              }}
                           >{`Category:  ${service.CATEGORYNAME}`}</Badge>
                           <Badge
                              colorScheme={
                                 isPast(service.STARTDATE) ? "2" : "7"
                              }
                              style={{
                                 marginTop: "10px",
                                 marginLeft: "20px",
                                 padding: "5px",
                              }}
                           >{`StartDate:  ${formatDate(
                              service.STARTDATE
                           )}`}</Badge>
                           <Text style={spacing.sapUiContentPadding}>
                              {service.DESCRIPTION}
                           </Text>
                        </Card>
                     );
                  })}
         </FlexBox>
      </section>
   );
};

export default MyServices;
