import React, { useContext } from "react";
import { MessageStrip } from "fundamental-react/MessageStrip";
import MessageContext from "../../context/message/messageContext";

const Message = () => {
   const messageContext = useContext(MessageContext);

   const { message } = messageContext;

   return (
      <div className="fr-messagestrip">
         {message.visible ? <MessageStrip dismissible link="#" linkText="Learn More" type={message.type}>
            {message.msg}
         </MessageStrip> : null}
         
      </div>
   );
};

export default Message;
