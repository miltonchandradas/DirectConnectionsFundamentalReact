import {
   SET_PRODUCTS,
   SET_MY_PRODUCTS,
   SET_PRODUCTS_FAILED,
   SET_MY_PRODUCTS_FAILED,
} from "../types";

export default (state, action) => {
   switch (action.type) {
      case SET_PRODUCTS:
         return {
            ...state,
            products: action.payload,
         };
      case SET_MY_PRODUCTS:
         return {
            ...state,
            myProducts: action.payload,
         };
      case SET_PRODUCTS_FAILED:
      case SET_MY_PRODUCTS_FAILED:
      default:
         return state;
   }
};
