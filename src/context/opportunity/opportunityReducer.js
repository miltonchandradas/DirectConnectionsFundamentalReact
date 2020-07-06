import { SET_OPPORTUNITIES, SET_OPPORTUNITIES_FAILED } from "../types";

export default (state, action) => {
   switch (action.type) {
      case SET_OPPORTUNITIES:
         return {
            ...state,
            opportunities: action.payload,
         };
      case SET_OPPORTUNITIES_FAILED:
      default:
         return state;
   }
};
