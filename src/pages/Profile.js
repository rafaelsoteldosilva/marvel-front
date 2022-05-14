import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../globals/auth";
import { connect } from "react-redux";
import styled from "styled-components";

import { favoriteComicsReset } from "../redux/actions/favoriteComicsActions";

const ContentContainer = styled.div`
   width: 100%;
   height: 95%;
   z-index: 1;
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   padding-top: 0.5em;
   padding-left: 2em;
   padding-bottom: 2em;
   justify-content: center;
   align-items: center;
   margin-top: 1em;
   margin-bottom: 1em;
`;

const Profile = ({ favoriteComicsResetLocal }) => {
   const { user, logout } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      logout();
      favoriteComicsResetLocal();
      navigate("/");
   };

   return (
      <div>
         {user && (
            <ContentContainer>
               <h2>Welcome</h2>
               <h4>{user.email}</h4>
               <button onClick={handleLogout}>Logout</button>
            </ContentContainer>
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
