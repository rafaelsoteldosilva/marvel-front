import { Provider } from "react-redux";
import configStore from "./redux/stores/configStore";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./globals/auth";
import { Navbar } from "./components/NavBar";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import { LoginSignUp } from "./components/LoginSignUp";
import { GlobalStyles } from "./globals/globalStyles";

function App() {
   return (
      <Provider store={configStore}>
         <AuthProvider>
            <GlobalStyles />
            <Navbar />
            <Routes>
               <Route path="/" element={<Navigate to="/home" />} />
               <Route path="/home" element={<Home />} />
               <Route
                  path="/signup"
                  element={<LoginSignUp isSignUp={true} />}
               />
               <Route
                  path="/login"
                  element={<LoginSignUp isSignUp={false} />}
               />
               <Route path="/profile" element={<Profile />} />
            </Routes>
         </AuthProvider>
      </Provider>
   );
}

export default App;
