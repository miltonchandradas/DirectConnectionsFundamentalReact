import React, { useContext, useState, useEffect, Fragment } from "react";

import axios from "axios";
import { isMobile } from "react-device-detect";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import ServiceContext from "../../context/service/serviceContext";

/* import { categories } from "../../data/data"; */

import {
   FormFieldset,
   FormLabel,
   FormItem,
   FormInput,
   FormLegend,
   MessageStrip,
   Link,
   InfoLabel,
   Container,
   Row,
   Column,
   Button,
   ComboboxInput,
   Table,
   LayoutPanel,
} from "fundamental-react";

const MyAccount = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const serviceContext = useContext(ServiceContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { myServices, getMyServices } = serviceContext;

   const [displayMessage, setDisplayMessage] = useState(false);
   const [selectedKey, setSelectedKey] = useState("1");

   const [defaultData, setDefaultData] = useState([]);

   const marginStyle = {
      marginTop: "20px",
   };

   const formatDate = (startDate) => {
      /* let myDate = new Date(startDate);

      return `${myDate.getUTCFullYear()}-${
         myDate.getUTCMonth() + 1
      }-${myDate.getUTCDate()}`;
      */
      return startDate.substring(0, 10);
   };

   const categories = [
      {
         key: "1",
         text: "Grocery Pickup",
      },
      {
         key: "2",
         text: "Giving Rides",
      },
      {
         key: "3",
         text: "Home Improvement",
      },
      {
         key: "4",
         text: "Tuition",
      },
      {
         key: "5",
         text: "Home Helper",
      },
   ];

   useEffect(() => {
      if (!user) {
         getUser();
      } else {
         removeMessage();

         async function populateMyServices(user) {
            await getMyServices(user.ID, true);

            if (defaultData.length < 1) {
               console.log("My Services is now being populated...");
               await setDefaultData(
                  myServices.map((service) => {
                     let startDate = formatDate(service.STARTDATE);
                     let description = isMobile
                        ? service.DESCRIPTION.substring(0, 40) + "..."
                        : service.DESCRIPTION.substring(0, 65) + "...";

                     let data = isMobile
                        ? {
                             rowData: [
                                <LayoutPanel>
                                   <LayoutPanel.Body>
                                      <p>
                                         <b>Date: </b>
                                         {startDate}
                                      </p>
                                      <br></br>
                                      <p>{description}</p>
                                      <br></br>
                                      <p>
                                         <b>State: </b>
                                         <InfoLabel color={1}>
                                            {service.STATE}
                                         </InfoLabel>
                                      </p>
                                   </LayoutPanel.Body>
                                </LayoutPanel>,
                             ],
                          }
                        : {
                             rowData: [
                                description,
                                startDate,
                                <InfoLabel color={1}>
                                   {service.STATE}
                                </InfoLabel>,
                             ],
                          };

                     console.log("Row Data: ", data);
                     return data;
                  })
               );
            }
         }

         populateMyServices(user);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated, user, defaultData]);

   const defaultHeaders = isMobile
      ? [<Link subtle>My Services</Link>]
      : [
           <Link subtle>Description</Link>,
           <Link subtle>Start Date</Link>,
           <Link subtle>State</Link>,
        ];

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

         <Container>
            <Row>
               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 3,
                     xLargeScreen: 3,
                  }}
               >
                  {user && (
                     <LayoutPanel>
                        <LayoutPanel.Body>
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
                                 <FormInput
                                    id="ex04"
                                    readOnly
                                    value={user.EMAIL}
                                 />
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
                                 <ComboboxInput
                                    id="cbCategory"
                                    label="Volunteering Category:"
                                    arrowLabel="Show categories"
                                    onSelectionChange={function s(e, option) {
                                       console.log("Options: ", option);
                                       setSelectedKey(option.key);
                                    }}
                                    options={categories}
                                    selectionType="auto-inline"
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
                                    dismissible
                                    style={marginStyle}
                                 >
                                    Successfully updated user info...
                                 </MessageStrip>
                              )}
                           </FormFieldset>
                        </LayoutPanel.Body>
                     </LayoutPanel>
                  )}
               </Column>

               <Column
                  span={{
                     smallScreen: 12,
                     mediumScreen: 12,
                     largeScreen: 9,
                     xLargeScreen: 9,
                  }}
               >
                  {user && (
                     <LayoutPanel>
                        <LayoutPanel.Body>
                           <FormFieldset>
                              <FormLegend>Services Provided</FormLegend>
                              <FormItem>
                                 {myServices ? (
                                    <Fragment>
                                       <Table
                                          /* style={{
                                             border: "1px solid black",
                                             tableLayout: "auto",
                                          }} */
                                          headers={defaultHeaders}
                                          tableData={defaultData}
                                       ></Table>
                                    </Fragment>
                                 ) : (
                                    <Fragment>
                                       <MessageStrip
                                          style={marginStyle}
                                          type="warning"
                                       >
                                          Currently, you do not provide any
                                          services
                                       </MessageStrip>
                                       <Link href="/myservices">
                                          Click here to add a service...
                                       </Link>
                                    </Fragment>
                                 )}
                              </FormItem>
                           </FormFieldset>
                        </LayoutPanel.Body>
                     </LayoutPanel>
                  )}
               </Column>
            </Row>
         </Container>
      </section>
   );
};

export default MyAccount;
