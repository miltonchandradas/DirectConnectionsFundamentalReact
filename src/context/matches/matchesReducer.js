import { SET_TOP_MATCHES, SET_TOP_MATCHES_FAILED } from "../types";

export default (state, action) => {
   switch (action.type) {
      case SET_TOP_MATCHES:
         return {
            ...state,
            topMatches: action.payload,
         };

      case SET_TOP_MATCHES_FAILED:
      default:
         return state;
   }
};
