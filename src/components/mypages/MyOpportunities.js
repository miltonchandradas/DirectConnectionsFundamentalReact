import React, { useEffect, useState, useContext } from "react";

import { Table } from "fundamental-react/Table";
import { Checkbox } from "fundamental-react/Forms";
import { Link } from "fundamental-react/Link";
import { FormLabel } from "fundamental-react/Forms";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import OpportunityContext from "../../context/opportunity/opportunityContext";

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
import { datasets, labels, tableData, tableColumns } from "../../data/data";

const MyOpportunities = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const opportunityContext = useContext(OpportunityContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { opportunities, getOpportunities } = opportunityContext;

   const [toggleCharts, setToggleCharts] = useState("lineChart");
   const [loading, setLoading] = useState(false);

   const contentTitle =
      toggleCharts === "lineChart" ? "Line Chart" : "Bar Chart";
   const switchToChart =
      toggleCharts === "lineChart" ? "Bar Chart" : "Line Chart";

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

   const handleChange = (event) => {
      setCheckedItems({
         ...checkedItems,
         [event.target.name]: event.target.checked,
      });
   };

   useEffect(() => {
      if (!user) {
         getUser();
      } else {
         removeMessage();
      }

      getOpportunities();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

   return (
      <section className="section-myopportunities">
         <h2>My Volunteering Opportunities</h2>

         <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
         >
            {opportunities &&
               opportunities.map((opportunity) => {

                  let date = opportunity.STARTDATE.substring(0, 10);
                  return (
                     <Card
                        avatar={<Icon name={"add-employee"} />}
                        heading={`${opportunity.BENEFICIARYFIRSTNAME} ${opportunity.BENEFICIARYLASTNAME}`}
                        subheading={`Start Date: ${date}`}
                        status={"Open"}
                        className="ui5card"
                        style={{ ...spacing.sapUiContentPadding }}
                        headerInteractive
                        onHeaderClick={handleHeaderClick}
                     >
                        <Text style={spacing.sapUiContentPadding}>
                           {opportunity.DESCRIPTION}
                        </Text>
                     </Card>
                  );
               })}
         </FlexBox>
      </section>
   );
};

export default MyOpportunities;

/* <section className="section-myopportunities">
         <h2>My Volunteering Opportunities</h2>

         {opportunities && (
            <Table
               headers={[
                  <Checkbox>Checkbox</Checkbox>,
                  "Start Date",
                  "Description",
                  "Estimated Hours",
                  "Level",
               ]}
               tableData={opportunities.map((item) => {
                  return {
                     rowData: [
                        <Checkbox
                           checked={checkedItems[item.BENEFICIARY_ID]}
                           onChange={handleChange}
                        >
                           {item.BENEFICIARY_ID}
                        </Checkbox>,

                        <Link href="#">{item.STARTDATE}</Link>,

                        <FormLabel>{item.DESCRIPTION}</FormLabel>,

                        <FormLabel>{item.ESTIMATEDHOURS}</FormLabel>,

                        <FormLabel>{item.DIFFICULTYLEVEL}</FormLabel>,
                     ],
                  };
               })}
            ></Table>
         )}
      </section> */
