import React from "react";
import { useAuth } from "../globals/auth";

export const Home = () => {
   const auth = useAuth();

   if (auth.user) return <div></div>;
   else return <div>home</div>;
};
