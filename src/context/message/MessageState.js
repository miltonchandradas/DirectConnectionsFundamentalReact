import React, { useReducer } from "react";
import AlertContext from "./messageContext";
import AlertReducer from "./messageReducer";

import { SET_MESSAGE, REMOVE_MESSAGE } from "../types";

const MessageState = (props) => {
   const initialState = { msg: "", type: "information", visible: false };

   const [state, dispatch] = useReducer(AlertReducer, initialState);

   // Set Alert
   const setMessage = (msg, type, visible) => {
      dispatch({
         type: SET_MESSAGE,
         payload: { msg, type, visible },
      });

      setTimeout(() => dispatch({ type: REMOVE_MESSAGE }), 5000);
   };

   return (
      <AlertContext.Provider
         value={{
            message: state,
            setMessage,
         }}
      >
         {props.children}
      </AlertContext.Provider>
   );
};

export default MessageState;
