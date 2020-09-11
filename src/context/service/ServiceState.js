import React, { useReducer } from "react";
import ServiceContext from "./serviceContext";
import ServiceReducer from "./serviceReducer";

import axios from "axios";

import {
   SET_SERVICES,
   SET_MY_SERVICES,
   UPDATE_SERVICE,
   SET_SERVICES_FAILED,
   SET_MY_SERVICES_FAILED,
} from "../types";

const ServiceState = (props) => {
   const initialState = { services: [], myServices: [] };

   const [state, dispatch] = useReducer(ServiceReducer, initialState);

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   // Get Services
   const getServices = async (id, self) => {
      try {
         const res = await axios.get(`${baseUrl}/api/v1/services?active=true&userId=${id}&self=${self}`);

         console.log("Result: ", res.data);

         dispatch({
            type: SET_SERVICES,
            payload: res.data.data,
         });
      } catch (error) {
         dispatch({
            type: SET_SERVICES_FAILED,
            payload: error,
         });
      }
   };

   // Get Services
   const getMyServices = async (id, active) => {
      try {
         let res = "";

         if (!active) {
            res = await axios.get(`${baseUrl}/api/v1/services?&id=${id}`);
         } else {
            res = await axios.get(
               `${baseUrl}/api/v1/services?active=${active}&id=${id}`
            );
         }

         console.log("Result: ", res.data);

         dispatch({
            type: SET_MY_SERVICES,
            payload: res.data.data,
         });
      } catch (error) {
         dispatch({
            type: SET_MY_SERVICES_FAILED,
            payload: error,
         });
      }
   };

   const subscribeService = async (user, service) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
         },
      };

      console.log("User: ", user);
      console.log("Service: ", service);

      const payload = {
         startDate: service.STARTDATE,
         initiatedBy: "beneficiary",
         providerId: service.PROVIDER_ID,
         beneficiaryId: user.ID,
      };

      console.log("Payload: ", payload);

      try {
         const res = await axios.put(
            `${baseUrl}/api/v1/opportunities/${service.ID}`,
            payload,
            config
         );

         console.log("Calling dispatch...");
         dispatch({
            type: UPDATE_SERVICE,
            payload: res.data,
         });
      } catch (error) {
         dispatch({
            type: SET_SERVICES_FAILED,
            payload: error,
         });
      }
   };

   return (
      <ServiceContext.Provider
         value={{
            services: state.services,
            myServices: state.myServices,
            getServices,
            getMyServices,
            subscribeService,
         }}
      >
         {props.children}
      </ServiceContext.Provider>
   );
};

export default ServiceState;
