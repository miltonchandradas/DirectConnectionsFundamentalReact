import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";

import { LayoutGrid } from "fundamental-react/LayoutGrid";
import { Panel } from "fundamental-react/Panel";
import { Table } from "fundamental-react/Table";
import { MessageStrip } from "fundamental-react/MessageStrip";
import { InfoLabel } from "fundamental-react/InfoLabel";
import { Counter } from "fundamental-react/Counter";
import { Link } from "fundamental-react/Link";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const MyOrders = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;

   const [myActivities, setMyActivities] = useState([]);

   const [defaultHeaders, setDefaultHeaders] = useState([
      <Link subtle>Description</Link>,
      <Link subtle>Initiated By</Link>,
      <Link subtle>Start Date</Link>,
      <Link subtle>Beneficiary Name</Link>,
      <Link subtle>Provider Name</Link>,
      <Link subtle>State</Link>,
      <Link subtle>Rating</Link>,
   ]);
   const [defaultData, setDefaultData] = useState([]);

   const marginStyle = {
      marginTop: "20px",
   };

   useEffect(() => {
      if (!user) {
         getUser();
      } else {
         removeMessage();
         // getMyActivities(user.ID);

         async function populateMyActivities(user) {
            await getMyActivities(user.ID);

            if (defaultData.length < 1) {
               console.log("My Activities is now populated...");
               await setDefaultData(
                  myActivities.map((activity) => {
                     return {
                        rowData: [
                           activity.SERVICEDESCRIPTION
                              ? activity.SERVICEDESCRIPTION.substring(0, 80) +
                                "..."
                              : activity.OPPORTUNITYDESCRIPTION.substring(
                                   0,
                                   80
                                ) + "...",
                           <InfoLabel color={6}>
                              {activity.INITIATEDBY}
                           </InfoLabel>,
                           formatDate(activity.ACTIVITYDATE),
                           activity.BENEFICIARYFIRSTNAME +
                              " " +
                              activity.BENEFICIARYLASTNAME,
                           activity.PROVIDERFIRSTNAME +
                              " " +
                              activity.PROVIDERLASTNAME,
                           <InfoLabel color={1}>{activity.STATE}</InfoLabel>,
                           <Counter>{activity.RATING}</Counter>,
                        ],
                     };
                  })
               );
            }
         }

         populateMyActivities(user);
      }

      /* if (myActivities) {
         setDefaultData(
            myActivities.map((activity) => {
               return {
                  rowData: [
                     activity.SERVICEDESCRIPTION
                        ? activity.SERVICEDESCRIPTION.substring(0, 80) + "..."
                        : activity.OPPORTUNITYDESCRIPTION + "...",
                     <InfoLabel color={6}>{activity.INITIATEDBY}</InfoLabel>,
                     formatDate(activity.ACTIVITYDATE),
                     activity.BENEFICIARYFIRSTNAME +
                        " " +
                        activity.BENEFICIARYLASTNAME,
                     activity.PROVIDERFIRSTNAME +
                        " " +
                        activity.PROVIDERLASTNAME,
                     <InfoLabel color={1}>{activity.STATE}</InfoLabel>,
                     <Counter>{activity.RATING ? 5 : 5}</Counter>,
                  ],
               };
            })
         );
      } */

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, user, defaultData]);

   const formatDate = (startDate) => {
      let myDate = new Date(startDate);

      return `${myDate.getUTCFullYear()}-${
         myDate.getUTCMonth() + 1
      }-${myDate.getUTCDate()}`;
   };

   const getMyActivities = async (id) => {
      const config = {
         headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      const baseUrl =
         process.env.REACT_APP_HOSTED_URL ||
         "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

      const results = await axios.get(
         `${baseUrl}/api/v1/activities?id=${id}`,
         config
      );

      console.log("Results: ", results);

      setMyActivities(results.data.data);
   };

   return (
      <section className="section-myactivity">
         {user && (
            <h2>
               My Activity - {user.FIRSTNAME} {user.LASTNAME}
            </h2>
         )}

         {myActivities ? (
            <Table
               style={{
                  border: "1px solid black",
                  tableLayout: "auto",
               }}
               headers={defaultHeaders}
               richTable
               tableData={defaultData}
            ></Table>
         ) : (
            <Fragment>
               <MessageStrip style={marginStyle} type="warning">
                  Currently, you do not have any activities
               </MessageStrip>
            </Fragment>
         )}
      </section>
   );
};

export default MyOrders;
