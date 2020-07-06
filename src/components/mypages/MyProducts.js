import React, { useEffect, useState, useContext } from "react";

import { Table } from "fundamental-react/Table";
import { Checkbox } from "fundamental-react/Forms";
import { Link } from "fundamental-react/Link";
import { FormLabel } from "fundamental-react/Forms";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";
import ProductContext from "../../context/product/productContext";

import { MessageStrip } from "fundamental-react/MessageStrip";

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
   productColumns,
} from "../../data/data";

const MyProducts = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const productContext = useContext(ProductContext);
   const { isAuthenticated, user, getUser } = authContext;
   const { removeMessage } = messageContext;
   const { products, myProducts, getProducts, getMyProducts } = productContext;

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

   const marginStyle = {
      marginTop: "20px",
      display: "block",
   };

   const [checkedItems, setCheckedItems] = useState({});

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
      getProducts();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <section className="section-myproducts">
         <h2>My Products</h2>

         <MessageStrip style={marginStyle} type="success">
            Please find below all the products that you are offering
         </MessageStrip>
         <Link href="/myservices">Click here to add a service...</Link>
         <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
         >
            {
               user &&
                  products &&
                  products.map((product) => {
                     return (
                        <Card
                           avatar={<Icon name={"add-employee"} />}
                           heading={`${product.PROVIDERFIRSTNAME} ${product.PROVIDERLASTNAME}`}
                           subheading={`Price: ${product.PRICE} $`}
                           status={"Open"}
                           className="ui5card"
                           style={{ ...spacing.sapUiContentPadding }}
                           headerInteractive
                           onHeaderClick={handleHeaderClick}
                        >
                           <Text style={spacing.sapUiContentPadding}>
                              {product.DESCRIPTION}
                           </Text>
                        </Card>
                     );
                  })
               /* <Card
                  heading="My Products"
                  style={{ maxWidth: "100%" }}
                  avatar={<Icon name="table-view" />}
               >
                  <AnalyticalTable
                     data={products}
                     columns={productColumns}
                  />
               </Card> */
            }
         </FlexBox>
      </section>
   );
};

export default MyProducts;
