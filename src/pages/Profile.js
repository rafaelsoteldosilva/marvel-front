import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../globals/auth";

export const Profile = () => {
   const { user, logout } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      logout();
      navigate("/");
   };

   return (
      <div>
         {user && (
            <p>
               Welcome {user.email}
               <button onClick={handleLogout}>&nbsp;&nbsp;Logout</button>
            </p>
         )}
      </div>
   );
};
