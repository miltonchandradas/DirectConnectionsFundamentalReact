import React, { useEffect, useState, useContext, Fragment } from "react";

import axios from "axios";
import { isMobile } from "react-device-detect";

import {
   Table,
   MessageStrip,
   InfoLabel,
   Counter,
   Link,
   LayoutPanel,
} from "fundamental-react";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const MyOrders = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;

   const [myActivities, setMyActivities] = useState([]);

   const defaultHeaders = isMobile
      ? [<Link subtle>Activity Info</Link>]
      : [
           <Link subtle>Description</Link>,
           <Link subtle>Initiated By</Link>,
           <Link subtle>Start Date</Link>,
           <Link subtle>Beneficiary Name</Link>,
           <Link subtle>Provider Name</Link>,
           <Link subtle>State</Link>,
           <Link subtle>Rating</Link>,
        ];

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
                     let description = activity.SERVICEDESCRIPTION
                        ? activity.SERVICEDESCRIPTION.substring(0, 80) + "..."
                        : activity.OPPORTUNITYDESCRIPTION.substring(0, 80) +
                          "...";

                     description = isMobile
                        ? description.substring(0, 40) + "..."
                        : description;
                     let activityDate = formatDate(activity.ACTIVITYDATE);
                     let beneficiary =
                        activity.BENEFICIARYFIRSTNAME +
                        " " +
                        activity.BENEFICIARYLASTNAME;
                     let provider =
                        activity.PROVIDERFIRSTNAME +
                        " " +
                        activity.PROVIDERLASTNAME;

                     let data = isMobile
                        ? {
                             rowData: [
                                <LayoutPanel>
                                   <LayoutPanel.Body>
                                      <p>
                                         <b>Date: </b>
                                         {activityDate}
                                      </p>
                                      <p>
                                         <b>Beneficiary: </b>
                                         {beneficiary}
                                      </p>
                                      <p>
                                         <b>Provider: </b>
                                         {provider}
                                      </p>
                                      <br></br>
                                      <p>{description}</p>
                                      <br></br>
                                      <p>
                                         <b>State: </b>
                                         <InfoLabel color={1}>
                                            {activity.STATE}
                                         </InfoLabel>
                                      </p>
                                      <p>
                                         <b>Rating: </b>
                                         <Counter>{activity.RATING}</Counter>
                                      </p>
                                   </LayoutPanel.Body>
                                </LayoutPanel>,
                             ],
                          }
                        : {
                             rowData: [
                                description,
                                <InfoLabel color={6}>
                                   {activity.INITIATEDBY}
                                </InfoLabel>,
                                activityDate,
                                beneficiary,
                                provider,
                                <InfoLabel color={1}>
                                   {activity.STATE}
                                </InfoLabel>,
                                <Counter>{activity.RATING}</Counter>,
                             ],
                          };

                     return data;
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
      /* let myDate = new Date(startDate);

      return `${myDate.getUTCFullYear()}-${
         myDate.getUTCMonth() + 1
      }-${myDate.getUTCDate()}`; */

      return startDate.substring(0, 10);
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
