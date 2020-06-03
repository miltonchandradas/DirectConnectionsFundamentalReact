import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import axios from "axios";

import {
   REGISTER,
   LOGIN,
   LOGOUT,
   FACEBOOK_RESPONSE,
   AUTH_ERROR,
   CLEAR_ERROR,
} from "../types";

const AuthState = (props) => {
   const initialState = {
      token: localStorage.getItem("token"),
      isAuthenticated: false,
      error: null,
   };

   const [state, dispatch] = useReducer(AuthReducer, initialState);

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://mynodeproject-active-impala.cfapps.eu10.hana.ondemand.com";

   // Register
   const register = async (formData) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      console.log(formData);

      try {
         const res = await axios.post(
            `${baseUrl}/api/v1/auth/register`,
            formData,
            config
         );

         dispatch({
            type: REGISTER,
            payload: res.data,
         });
      } catch (error) {
         dispatch({
            type: AUTH_ERROR,
            payload: error,
         });
      }
   };

   // Login
   const login = async (formData) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      try {
         const res = await axios.post(
            `${baseUrl}/api/v1/auth/login`,
            formData,
            config
         );

         dispatch({
            type: LOGIN,
            payload: res.data,
         });
      } catch (error) {
         console.log(error.response.data.error);

         dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.error,
         });
      }
   };

   // Facebook callback
   const fbResponse = async (response) => {
      // Call NodeJs backend API to retrieve JWT Token
      console.log(response);

      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      const payload = {
         access_token: response.accessToken,
      };

      try {
         console.log("Calling axios post...");

         const res = await axios.post(
            `${baseUrl}/api/v1/auth/facebook`,
            payload,
            config
         );

         console.log("Calling dispatch...");
         dispatch({
            type: FACEBOOK_RESPONSE,
            payload: res.data,
         });
      } catch (error) {
         dispatch({
            type: AUTH_ERROR,
            payload: error,
         });
      }
   };

   // Logout
   const logout = () => dispatch({ type: LOGOUT });

   // Clear Error
   const clearError = () => dispatch({ type: CLEAR_ERROR });

   return (
      <AuthContext.Provider
         value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            error: state.error,
            register,
            login,
            logout,
            fbResponse,
            clearError,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthState;
