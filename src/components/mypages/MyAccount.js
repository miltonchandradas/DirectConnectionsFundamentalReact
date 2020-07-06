import React, { useContext, useState, useEffect } from "react";

import axios from "axios";

import { LayoutGrid } from "fundamental-react/LayoutGrid";
import { Panel } from "fundamental-react/Panel";
import { Button } from "fundamental-react/Button";
import { ComboboxInput } from "fundamental-react/ComboboxInput";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

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

const MyAccount = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;

   const [displayMessage, setDisplayMessage] = useState(false);
   const [selectedKey, setSelectedKey] = useState("0");

   const marginStyle = {
      marginTop: "20px",
   };

   useEffect(() => {
      if (!user) {
         getUser();
      } else {
         removeMessage();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

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
         <h2>My Account</h2>

         <LayoutGrid cols={3}>
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
            <Panel>
               {user && (
                  <Panel.Body>
                     <FormFieldset>
                        <FormLegend>Services Provided</FormLegend>
                        <FormItem>
                           <MessageStrip style={marginStyle} type="warning">
                              Currently, you do not provide any services
                           </MessageStrip>
                           <Link href="/myservices">
                              Click here to add a service...
                           </Link>
                        </FormItem>
                     </FormFieldset>
                  </Panel.Body>
               )}
            </Panel>
            <Panel className="fr-panel">
               <Panel.Body>
                  <FormFieldset>
                     <FormLegend>Products Provided</FormLegend>
                     <FormItem>
                        <MessageStrip style={marginStyle} type="warning">
                           Currently, you do not provide any products
                        </MessageStrip>
                        <Link href="/myproducts">
                           Click here to add a product...
                        </Link>
                     </FormItem>
                  </FormFieldset>
               </Panel.Body>
            </Panel>
         </LayoutGrid>
      </section>
   );
};

export default MyAccount;
