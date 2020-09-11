import React, { useEffect, useContext, useState } from "react";

import axios from "axios";

import { LayoutGrid } from "fundamental-react/lib/LayoutGrid";

import AddressMaps from "../maps/AddressMaps";

import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/message/messageContext";

const MyFriends = () => {
   const authContext = useContext(AuthContext);
   const messageContext = useContext(MessageContext);
   const { isAuthenticated, user, getUser } = authContext;

   const [users, setUsers] = useState([]);

   const baseUrl =
      process.env.REACT_APP_HOSTED_URL ||
      "https://myfullstack-srv-courteous-ratel-kz.cfapps.eu10.hana.ondemand.com";

   useEffect(() => {
      messageContext.setMessage("Successfully registered...", "success", true);

      if (isAuthenticated) {
         const config = {
            headers: { Authorization: `Bearer ${localStorage.token}` },
         };

         const getAllUsers = async () => {
            const res = await axios.get(`${baseUrl}/api/v1/auth/users`, config);
            setUsers(res.data.data);

            console.log("Result getAllUsers: ", res);
         };

         if (!user) {
            getUser();
         }

         getAllUsers();

         console.log("User: ", user);
         console.log("Users: ", users);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuthenticated]);

   return (
      <div>
         <LayoutGrid>
            {user && users && (
               <AddressMaps
                  latitude={user.LATITUDE}
                  longitude={user.LONGITUDE}
                  users={users}
               />
            )}
         </LayoutGrid>
      </div>
   );
};

export default MyFriends;
