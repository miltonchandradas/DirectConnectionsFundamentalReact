import React, { useReducer } from "react";
import ProductContext from "./productContext";
import ProductReducer from "./productReducer";

import axios from "axios";

import {
   SET_PRODUCTS,
   SET_MY_PRODUCTS,
   SET_PRODUCTS_FAILED,
   SET_MY_PRODUCTS_FAILED,
} from "../types";

const ProductState = (props) => {
   const initialState = { products: [], myProducts: [] };

   const [state, dispatch] = useReducer(ProductReducer, initialState);

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   // Get products
   const getProducts = async () => {
      try {
         const res = await axios.get(`${baseUrl}/api/v1/products`);

         console.log("Result: ", res.data);

         dispatch({
            type: SET_PRODUCTS,
            payload: res.data.data,
         });
      } catch (error) {
         dispatch({
            type: SET_PRODUCTS_FAILED,
            payload: error,
         });
      }
   };

   // Get products
   const getMyProducts = async (id) => {
      try {
         const res = await axios.get(`${baseUrl}/api/v1/products?id=${id}`);

         console.log("Result: ", res.data);

         dispatch({
            type: SET_MY_PRODUCTS,
            payload: res.data.data,
         });
      } catch (error) {
         dispatch({
            type: SET_MY_PRODUCTS_FAILED,
            payload: error,
         });
      }
   };

   return (
      <ProductContext.Provider
         value={{
            products: state.products,
            myProducts: state.myProducts,
            getProducts,
            getMyProducts,
         }}
      >
         {props.children}
      </ProductContext.Provider>
   );
};

export default ProductState;
