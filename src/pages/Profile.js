import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../globals/auth";
import { connect } from "react-redux";

import { favoriteComicsReset } from "../redux/actions/favoriteComicsActions";

const Profile = ({ favoriteComicsResetLocal }) => {
   const { user, logout } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      logout();
      console.log("reseting favorites");
      favoriteComicsResetLocal();
      console.log("going home");
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

function mapDispatchToProps(dispatch) {
   return {
      favoriteComicsResetLocal: () => {
         return dispatch(favoriteComicsReset());
      },
   };
}

export default connect(null, mapDispatchToProps)(Profile);
