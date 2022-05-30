import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [users, setUsers] = useState(null);

   const loadUsers = (usersPayload) => {
      setUsers([...usersPayload]);
   };

   const registerNewUserAndLogin = (user) => {
      setUsers((prevUsers) => {
         return [...prevUsers, user];
      });

      setUser(user);
   };

   const isARegisteredUser = (email) => {
      return users.some((user) => user.email === email);
   };

   const checkUserPassword = (email, password) => {
      const foundUser = users.find((user) => user.email === email);
      return foundUser ? true : false;
   };

   const login = (email) => {
      let loginToUser = users.find((user) => user.email === email);
      setUser(loginToUser);
   };

   const logout = () => {
      setUser(null);
   };

   return (
      <AuthContext.Provider
         value={{
            loadUsers,
            isARegisteredUser,
            registerNewUserAndLogin,
            checkUserPassword,
            user,
            login,
            logout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   return useContext(AuthContext);
};
