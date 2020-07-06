import {
   SET_SERVICES,
   SET_MY_SERVICES,
   SET_SERVICES_FAILED,
   SET_MY_SERVICES_FAILED,
} from "../types";

export default (state, action) => {
   switch (action.type) {
      case SET_SERVICES:
         return {
            ...state,
            services: action.payload,
         };
      case SET_MY_SERVICES:
         return {
            ...state,
            myServices: action.payload,
         };
      case SET_SERVICES_FAILED:
      case SET_MY_SERVICES_FAILED:
      default:
         return state;
   }
};
