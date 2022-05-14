import { Provider } from "react-redux";
import configStore from "./redux/stores/configStore";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./globals/auth";
import { Navbar } from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import LoginSignUp from "./components/LoginSignUp";
import { GlobalStyles, globalTheme } from "./globals/globalStyles";
import { ThemeProvider } from "styled-components";
import { ComicComplete } from "./pages/ComicComplete";

function App() {
   return (
      <Provider store={configStore}>
         <ThemeProvider theme={globalTheme}>
            <AuthProvider>
               <GlobalStyles />
               <Navbar />
               <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/comicComplete" element={<ComicComplete />} />
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
         </ThemeProvider>
      </Provider>
   );
}

export default App;
