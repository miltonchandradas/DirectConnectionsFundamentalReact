import {
    REGISTER,
    LOGIN,
    LOGOUT,
    AUTH_ERROR,
    FACEBOOK_RESPONSE,
    CLEAR_ERROR,
 } from "../types";
 
 export default (state, action) => {
    switch (action.type) {
       case REGISTER:
       case LOGIN:
       case FACEBOOK_RESPONSE:
          localStorage.setItem("token", action.payload.token);
          return {
             ...state,
             isAuthenticated: true,
             token: action.payload.token,
          };
 
       case LOGOUT:
       case AUTH_ERROR:
          localStorage.removeItem("token");
          return {
             ...state,
             isAuthenticated: false,
             token: null,
             error: action.payload
          };
      case CLEAR_ERROR:
         return {
            ...state,
            error: null
         };
       default:
          return state;
    }
 };
 