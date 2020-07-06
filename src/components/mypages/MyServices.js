import React, { useEffect, useState, useContext } from "react";

import { Table } from "fundamental-react/Table";
import { Checkbox } from "fundamental-react/Forms";
import { Link } from "fundamental-react/Link";
import { FormLabel } from "fundamental-react/Forms";

import { MessageStrip } from "fundamental-react/MessageStrip";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import ServiceContext from "../../context/service/serviceContext";

import {
   Avatar,
   Card,
   Text,
   ShellBar,
   ShellBarItem,
   List,
   StandardListItem,
   ValueState,
   ProgressIndicator,
   Title,
   TitleLevel,
   FlexBox,
   FlexBoxJustifyContent,
   FlexBoxWrap,
   FlexBoxDirection,
   AnalyticalTable,
   Icon,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";

import "@ui5/webcomponents-icons/dist/icons/line-chart.js";
import "@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js";
import "@ui5/webcomponents-icons/dist/icons/table-view.js";
import "@ui5/webcomponents-icons/dist/icons/list.js";

import "@ui5/webcomponents-icons/dist/icons/add-employee.js";
import {
   datasets,
   labels,
   tableData,
   tableColumns,
   serviceColumns,
} from "../../data/data";

const MyServices = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const serviceContext = useContext(ServiceContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { services, myServices, getServices, getMyServices } = serviceContext;

   const [toggleCharts, setToggleCharts] = useState("lineChart");
   const [loading, setLoading] = useState(false);

   const handleHeaderClick = () => {
      if (toggleCharts === "lineChart") {
         setLoading(true);
         setTimeout(() => {
            setLoading(false);
            setToggleCharts("barChart");
         }, 2000);
      } else {
         setLoading(true);
         setTimeout(() => {
            setLoading(false);
            setToggleCharts("lineChart");
         }, 2000);
      }
   };

   const [checkedItems, setCheckedItems] = useState({});

   const marginStyle = {
      marginTop: "20px",
      display: "block",
   };

   const handleChange = (event) => {
      setCheckedItems({
         ...checkedItems,
         [event.target.name]: event.target.checked,
      });
   };

   useEffect(() => {
      if (isAuthenticated) {
         removeMessage();
      }

      getUser();
      getServices();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

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
            {
               services &&
                  user &&
                  services.map((service) => {
                     return (
                        <Card
                           avatar={<Icon name={"add-employee"} />}
                           heading={`${service.PROVIDERFIRSTNAME} ${service.PROVIDERLASTNAME}`}
                           subheading={`Difficulty: ${service.DIFFICULTYLEVEL}`}
                           status={"Open"}
                           className="ui5card"
                           style={{ ...spacing.sapUiContentPadding }}
                           headerInteractive
                           onHeaderClick={handleHeaderClick}
                        >
                           <Text style={spacing.sapUiContentPadding}>
                              {service.DESCRIPTION}
                           </Text>
                        </Card>
                     );
                  })

               /* <Card
                  heading="My Services"
                  style={{ maxWidth: "100%" }}
                  avatar={<Icon name="table-view" />}
               >
                  <AnalyticalTable data={services} columns={serviceColumns} />
               </Card> */
            }
         </FlexBox>
      </section>
   );
};

export default MyServices;
