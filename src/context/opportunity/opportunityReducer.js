import {
   SET_OPPORTUNITIES,
   SET_OPPORTUNITIES_FAILED,
   UPDATE_OPPORTUNITY,
} from "../types";

export default (state, action) => {
   switch (action.type) {
      case SET_OPPORTUNITIES:
         return {
            ...state,
            opportunities: action.payload,
         };
      case SET_OPPORTUNITIES_FAILED:
      case UPDATE_OPPORTUNITY:
      default:
         return state;
   }
};
