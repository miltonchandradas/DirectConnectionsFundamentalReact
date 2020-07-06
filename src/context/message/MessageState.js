import React, { useReducer } from "react";
import MessageContext from "./messageContext";
import MessageReducer from "./messageReducer";

import { SET_MESSAGE, REMOVE_MESSAGE } from "../types";

const MessageState = (props) => {
   const initialState = { msg: "", type: "information", visible: false, isDismissible: true, linkText: "Learn more" };

   const [state, dispatch] = useReducer(MessageReducer, initialState);

   // Set Alert
   const setMessage = (msg, type, visible, isDismissible, linkText = "Learn more") => {
      dispatch({
         type: SET_MESSAGE,
         payload: { msg, type, visible, isDismissible, linkText},
      });

   };

   const removeMessage = () => {
      dispatch({ type: REMOVE_MESSAGE });
   }

   return (
      <MessageContext.Provider
         value={{
            message: state,
            setMessage,
            removeMessage
         }}
      >
         {props.children}
      </MessageContext.Provider>
   );
};

export default MessageState;
