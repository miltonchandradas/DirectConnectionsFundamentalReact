import React, { useContext, useState, useEffect, Fragment } from "react";

import axios from "axios";

import { LayoutGrid } from "fundamental-react/LayoutGrid";
import { Panel } from "fundamental-react/Panel";
import { Button } from "fundamental-react/Button";
import { ComboboxInput } from "fundamental-react/ComboboxInput";
import { Table } from "fundamental-react/Table";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import ServiceContext from "../../context/service/serviceContext";

import { categories } from "../../data/data";

import {
   FormFieldset,
   FormLabel,
   FormItem,
   FormInput,
   FormLegend,
} from "fundamental-react/Forms";
import { MessageStrip } from "fundamental-react/MessageStrip";
import { Link } from "fundamental-react/Link";
import { InfoLabel } from "fundamental-react/InfoLabel";

const MyAccount = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const serviceContext = useContext(ServiceContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { myServices, getMyServices } = serviceContext;

   const [displayMessage, setDisplayMessage] = useState(false);
   const [selectedKey, setSelectedKey] = useState("0");

   const [defaultHeaders, setDefaultHeaders] = useState([
      "Description",
      "Start Date",
      "State",
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

         async function populateMyServices(user) {
            await getMyServices(user.ID, true);

            if (defaultData.length < 1) {
               console.log("My Services is now populated...");
               await setDefaultData(
                  myServices.map((service) => {
                     return {
                        rowData: [
                           `${service.DESCRIPTION.substring(0, 65)}...`,
                           formatDate(service.STARTDATE),
                           <InfoLabel color={1}>{service.STATE}</InfoLabel>,
                        ],
                     };
                  })
               );
            }
         }

         populateMyServices(user);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, user, defaultData]);

   const formatDate = (startDate) => {
      let myDate = new Date(startDate);

      return `${myDate.getUTCFullYear()}-${
         myDate.getUTCMonth() + 1
      }-${myDate.getUTCDate()}`;
   };

   const onSubmitClick = async (e) => {
      /* setEditMode(true); */
      console.log("Submit button was clicked...");
      console.log("Selected Key: ", selectedKey);

      const config = {
         headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      const baseUrl =
         process.env.REACT_APP_HOSTED_URL ||
         "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

      await axios.put(
         `${baseUrl}/api/v1/auth/me`,
         {
            category: parseInt(selectedKey),
         },
         config
      );

      getUser();

      setDisplayMessage(true);
   };

   return (
      <section className="section-myaccount">
         {user && (
            <h2>
               My Account - {user.FIRSTNAME} {user.LASTNAME}
            </h2>
         )}

         <LayoutGrid cols={4}>
            <Panel>
               {user && (
                  <Panel.Body>
                     <FormFieldset>
                        <FormItem>
                           <FormLabel htmlFor="ex01">Name:</FormLabel>
                           <FormInput
                              id="ex01"
                              readOnly
                              value={`${user.FIRSTNAME} ${user.LASTNAME}`}
                           ></FormInput>
                        </FormItem>
                        <FormItem>
                           <FormLabel htmlFor="ex04">Email:</FormLabel>
                           <FormInput id="ex04" readOnly value={user.EMAIL} />
                        </FormItem>
                        <FormItem>
                           <FormLabel htmlFor="ex02">Address:</FormLabel>
                           <FormInput
                              id="ex02"
                              readOnly={user.FORMATTEDADDRESS !== ""}
                              value={user.FORMATTEDADDRESS}
                           />
                        </FormItem>
                        <FormItem>
                           <FormLabel htmlFor="cbCategory">
                              Volunteering Category:
                           </FormLabel>
                           <ComboboxInput
                              id="cbCategory"
                              onSelect={function s(e, option) {
                                 setSelectedKey(option.key);
                              }}
                              options={categories}
                              placeholder="Select a category"
                              selectedKey={
                                 user.CATEGORY_ID
                                    ? user.CATEGORY_ID.toString()
                                    : selectedKey
                              }
                           />
                        </FormItem>

                        <Button
                           style={marginStyle}
                           onClick={function s() {
                              onSubmitClick();
                           }}
                        >
                           Submit
                        </Button>
                        {displayMessage && (
                           <MessageStrip
                              type="success"
                              dismissible="true"
                              style={marginStyle}
                           >
                              Successfully updated user info...
                           </MessageStrip>
                        )}
                     </FormFieldset>
                  </Panel.Body>
               )}
            </Panel>
            <Panel colSpan={3}>
               {user && (
                  <Panel.Body>
                     <FormFieldset>
                        <FormLegend>Services Provided</FormLegend>
                        <FormItem>
                           {myServices ? (
                              <Fragment>
                                 <Table
                                    style={{
                                       border: "1px solid black",
                                       tableLayout: "auto",
                                    }}
                                    headers={defaultHeaders}
                                    richTable
                                    tableData={defaultData}
                                 ></Table>
                              </Fragment>
                           ) : (
                              <Fragment>
                                 <MessageStrip
                                    style={marginStyle}
                                    type="warning"
                                 >
                                    Currently, you do not provide any services
                                 </MessageStrip>
                                 <Link href="/myservices">
                                    Click here to add a service...
                                 </Link>
                              </Fragment>
                           )}
                        </FormItem>
                     </FormFieldset>
                  </Panel.Body>
               )}
            </Panel>
         </LayoutGrid>
      </section>
   );
};

export default MyAccount;
