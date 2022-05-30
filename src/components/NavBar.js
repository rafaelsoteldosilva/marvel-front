import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../globals/auth";
import styled, { css } from "styled-components";

const NavStripe = styled.nav`
   display: flex;
   flex-direction: row;
`;

const NavItem = css`
   margin-left: 1em;
   cursor: pointer;
   text-decoration: none;
`;

export const NavElementAlwaysShow = styled(NavLink)`
   ${NavItem}
`;

export const NavElementShowWhenLoggedIn = styled(NavLink)`
   ${NavItem}
   display: ${({ logged }) => (logged ? "inline" : "none")};
`;

export const NavElementNoShowWhenLoggedIn = styled(NavLink)`
   ${NavItem}
   display: ${({ logged }) => (logged ? "none" : "inline")};
`;

// const NavElementAlwaysShow = styled(NavLink)`
//    ${NavItem}
// `;

export const Navbar = () => {
   const auth = useAuth();
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      setIsLoggedIn(auth.user === null ? false : true);
   }, [auth.user]);

   return (
      <>
         <NavStripe>
            <NavElementAlwaysShow activeClassName="any" to="/home">
               Home
            </NavElementAlwaysShow>
            <NavElementShowWhenLoggedIn logged={isLoggedIn} to="/favorites">
               Favorites
            </NavElementShowWhenLoggedIn>
            <NavElementNoShowWhenLoggedIn logged={isLoggedIn} to="/login">
               Login
            </NavElementNoShowWhenLoggedIn>
            <NavElementNoShowWhenLoggedIn logged={isLoggedIn} to="/signup">
               Sign Up
            </NavElementNoShowWhenLoggedIn>
            <NavElementShowWhenLoggedIn logged={isLoggedIn} to="/profile">
               Profile
            </NavElementShowWhenLoggedIn>
         </NavStripe>
      </>
   );
};
