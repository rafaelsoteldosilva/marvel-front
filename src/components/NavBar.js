import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../globals/auth";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const NavStripe = styled.nav`
   display: flex;
   flex-direction: row;
`;

export const Navbar = () => {
   const auth = useAuth();
   const navigate = useNavigate();

   const navLinkStyles = ({ isActive }) => {
      return {
         color: "black",
         fontWeight: isActive ? "bold" : "normal",
         textDecoration: "none",
         display: auth.user ? "block" : "none",
      };
   };

   const handleLoginOnclick = () => {
      navigate("/login");
   };

   const handleSignUpOnclick = () => {
      navigate("/signup");
   };

   return (
      <>
         <NavStripe>
            <NavLink to="/home" style={navLinkStyles}>
               Home
            </NavLink>
            <NavLink to="/favorites" style={navLinkStyles}>
               Favorites
            </NavLink>
            {!auth.user && (
               <span
                  onClick={handleLoginOnclick}
                  style={{
                     cursor: "pointer",
                  }}
               >
                  Login
               </span>
            )}
            &nbsp;&nbsp;&nbsp;
            {!auth.user && (
               <span
                  onClick={handleSignUpOnclick}
                  style={{
                     cursor: "pointer",
                  }}
               >
                  Sign Up
               </span>
            )}
            {auth.user && (
               <NavLink to="/profile" style={navLinkStyles}>
                  Pefil
               </NavLink>
            )}
         </NavStripe>
      </>
   );
};
