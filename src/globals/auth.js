import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [users, setUsers] = useState(null);
   const [favoritesArr, setFavoritesArr] = useState([]);

   const login = (user) => {
      setUser(user);
   };

   const logout = () => {
      setUser(null);
   };

   return (
      <AuthContext.Provider
         value={{
            users,
            setUsers,
            user,
            login,
            logout,
            favoritesArr,
            setFavoritesArr,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   return useContext(AuthContext);
};
