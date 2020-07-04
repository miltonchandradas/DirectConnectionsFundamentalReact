import React, { useState } from "react";
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
import { datasets, labels, tableData, tableColumns } from "../../data/data";

const AnalyticalTableCards = () => {
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

   return (
      <div>
         <Card
            avatar={
               <Icon
                  name={
                     toggleCharts === "lineChart"
                        ? "line-chart"
                        : "horizontal-bar-chart"
                  }
               />
            }
            heading="Karma Points"
            className="ui5card"
            headerInteractive
            onHeaderClick={handleHeaderClick}
            subheading={`Click here to switch to ${switchToChart}`}
         >
            <Text style={spacing.sapUiContentPadding}>{contentTitle}</Text>
            {toggleCharts === "lineChart" ? (
               <LineChart
                  datasets={datasets}
                  labels={labels}
                  loading={loading}
               />
            ) : (
               <BarChart
                  datasets={datasets}
                  labels={labels}
                  loading={loading}
               />
            )}
         </Card>

         <Card
            heading="Progress"
            subheading="List"
            className="ui5card"
            avatar={<Icon name="list" />}
         >
            <List>
               <StandardListItem info="finished" infoState={ValueState.Success}>
                  Activity 1
               </StandardListItem>
               <StandardListItem info="failed" infoState={ValueState.Error}>
                  Activity 2
               </StandardListItem>
               <StandardListItem
                  info="in progress"
                  infoState={ValueState.Warning}
                  style={{ height: "80px" }}
               >
                  <FlexBox direction={FlexBoxDirection.Column}>
                     <Title level={TitleLevel.H5}>Activity 3</Title>
                     <ProgressIndicator
                        displayValue="89%"
                        percentValue={89}
                        width="180px"
                        state={ValueState.Success}
                     />
                  </FlexBox>
               </StandardListItem>
               <StandardListItem
                  info="in progress"
                  infoState={ValueState.Warning}
                  style={{ height: "80px" }}
               >
                  <FlexBox direction={FlexBoxDirection.Column}>
                     <Title level={TitleLevel.H5}>Activity 4</Title>
                     <ProgressIndicator
                        displayValue="5%"
                        percentValue={5}
                        width="180px"
                        state={ValueState.Error}
                     />
                  </FlexBox>
               </StandardListItem>
            </List>
         </Card>

         <Card
            heading="AnalyticalTable"
            style={{ maxWidth: "900px" }}
            avatar={<Icon name="table-view" />}
         >
            <AnalyticalTable
               data={tableData}
               columns={tableColumns}
               visibleRows={5}
            />
         </Card>
      </div>
   );
};

export default AnalyticalTableCards;
