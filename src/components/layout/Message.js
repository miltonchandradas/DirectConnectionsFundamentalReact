import React, { useContext } from "react";
import { MessageStrip } from "fundamental-react/lib/MessageStrip";
import MessageContext from "../../context/message/messageContext";

const Message = () => {
   const messageContext = useContext(MessageContext);

   const { message } = messageContext;

   return (
      <div className="fr-messagestrip">
         {message.visible ? (
            <MessageStrip
               dismissible={message.isDismissible}
               link="#"
               linkText={message.linkText}
               type={message.type}
            >
               {message.msg}
            </MessageStrip>
         ) : null}
      </div>
   );
};

export default Message;
