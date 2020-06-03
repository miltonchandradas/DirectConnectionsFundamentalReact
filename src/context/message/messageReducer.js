import { SET_MESSAGE, REMOVE_MESSAGE } from "../types";

export default (state, action) => {
   switch (action.type) {
      case SET_MESSAGE:
         return action.payload;
      case REMOVE_MESSAGE:
         return {
            ...state,
            msg: "",
            type: "information",
            visible: false,
         };

      default:
         return state;
   }
};
