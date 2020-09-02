import React, { useReducer } from "react";
import OpportunityContext from "./opportunityContext";
import OpportunityReducer from "./opportunityReducer";

import axios from "axios";

import {
   SET_OPPORTUNITIES,
   UPDATE_OPPORTUNITY,
   SET_OPPORTUNITIES_FAILED,
} from "../types";

const OpportunityState = (props) => {
   const initialState = { opportunities: [] };

   const [state, dispatch] = useReducer(OpportunityReducer, initialState);

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   // Get Opportunities
   const getOpportunities = async (id, self) => {
      try {
         const res = await axios.get(
            `${baseUrl}/api/v1/opportunities?active=true&userId=${id}&self=${self}`
         );

         console.log("Result: ", res.data);

         dispatch({
            type: SET_OPPORTUNITIES,
            payload: res.data.data,
         });
      } catch (error) {
         dispatch({
            type: SET_OPPORTUNITIES_FAILED,
            payload: error,
         });
      }
   };

   const subscribeOpportunity = async (user, opportunity) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
         },
      };

      console.log("User: ", user);
      console.log("Opportunity: ", opportunity);

      const payload = {
         startDate: opportunity.STARTDATE,
         initiatedBy: "provider",
         providerId: user.ID,
         beneficiaryId: opportunity.BENEFICIARY_ID,
      };

      console.log("Payload: ", payload);

      try {
         const res = await axios.put(
            `${baseUrl}/api/v1/opportunities/${opportunity.ID}`,
            payload,
            config
         );

         console.log("Calling dispatch...");
         dispatch({
            type: UPDATE_OPPORTUNITY,
            payload: res.data,
         });
      } catch (error) {
         dispatch({
            type: SET_OPPORTUNITIES_FAILED,
            payload: error,
         });
      }
   };

   return (
      <OpportunityContext.Provider
         value={{
            opportunities: state.opportunities,
            getOpportunities,
            subscribeOpportunity,
         }}
      >
         {props.children}
      </OpportunityContext.Provider>
   );
};

export default OpportunityState;
