import React, { useEffect, useContext } from "react";

import { Link } from "fundamental-react/Link";

import { MessageStrip } from "fundamental-react/MessageStrip";

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
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";

import "@ui5/webcomponents-icons/dist/icons/add-employee.js";

const MyServices = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const serviceContext = useContext(ServiceContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { myServices, getMyServices } = serviceContext;

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

   useEffect(() => {
      if (!user) {
         getUser();
      } else {
         removeMessage();
         getMyServices(user.ID);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, user, myServices]);

   return (
      <section className="section-myservices">
         <h2>My Services</h2>
         <MessageStrip style={marginStyle} type="success">
            Please find below all the services that you are providing
         </MessageStrip>
         <Link href="/myservices">Click here to add a service...</Link>
         <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
         >
            {user &&
               myServices &&
               myServices.map((service) => {
                  return (
                     <Card
                        avatar={<Icon name={"add-employee"} />}
                        heading={`${service.PROVIDERFIRSTNAME} ${service.PROVIDERLASTNAME}`}
                        subheading={`Difficulty: ${service.DIFFICULTYLEVEL}`}
                        status={isPast(service.STARTDATE) ? "Closed" : "Open"}
                        className="ui5card"
                        style={{
                           ...spacing.sapUiContentPadding
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
                           colorScheme={isPast(service.STARTDATE) ? "2" : "7"}
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
