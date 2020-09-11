import React, { useReducer } from "react";
import MatchesContext from "./matchesContext";
import MatchesReducer from "./matchesReducer";

import axios from "axios";

import { SET_TOP_MATCHES, SET_TOP_MATCHES_FAILED } from "../types";

const MatchesState = (props) => {
   const initialState = { topMatches: [] };

   const [state, dispatch] = useReducer(MatchesReducer, initialState);

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   const getTopMatches = async (opportunityId) => {
      const config = {
         headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      try {
         const res = await axios.get(
            `${baseUrl}/tech/getTop5ProviderMatches(opportunityId='${opportunityId}')`,
            config
         );

         console.log("Result: ", res);

         dispatch({
            type: SET_TOP_MATCHES,
            payload: res.data.value,
         });
      } catch (error) {
         dispatch({
            type: SET_TOP_MATCHES_FAILED,
            payload: error,
         });
      }
   };

   return (
      <MatchesContext.Provider
         value={{
            topMatches: state.topMatches,
            getTopMatches,
         }}
      >
         {props.children}
      </MatchesContext.Provider>
   );
};

export default MatchesState;
