import React, { useReducer } from "react";
import OpportunityContext from "./opportunityContext";
import OpportunityReducer from "./opportunityReducer";

import axios from "axios";

import { SET_OPPORTUNITIES, SET_OPPORTUNITIES_FAILED } from "../types";

const OpportunityState = (props) => {
   const initialState = { opportunities: [] };

   const [state, dispatch] = useReducer(OpportunityReducer, initialState);

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   // Get Opportunities
   const getOpportunities = async () => {
      try {
         const res = await axios.get(`${baseUrl}/api/v1/opportunities`);

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

   return (
      <OpportunityContext.Provider
         value={{
            opportunities: state.opportunities,
            getOpportunities,
         }}
      >
         {props.children}
      </OpportunityContext.Provider>
   );
};

export default OpportunityState;
