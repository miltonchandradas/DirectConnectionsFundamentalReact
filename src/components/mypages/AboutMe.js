import React, { useEffect, useState } from "react";
import axios from "axios";

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

const AboutMe = () => {
   const [code, setCode] = useState({});

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   useEffect(() => {
      getCodeOfConduct();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [code]);

   const getCodeOfConduct = async () => {
      const res = await axios.get(`${baseUrl}/api/v1/conductcode`);
      setCode(res.data.data[0]);

      console.log("Result Code of Conduct: ", res);
   };

   return (
      <section className="section-mypages">
         <h2>About Us - Helpful Heroes</h2>

         <Card
            heading={`Code of Conduct`}
            subheading={`Bringing the whole world closer !!`}
            className="ui5card"
            style={{
               ...spacing.sapUiContentPadding,
            }}
         >
            <Text style={spacing.sapUiContentPadding}>{code.BODY}</Text>
         </Card>
      </section>
   );
};

export default AboutMe;
