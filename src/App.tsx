// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import { WelcomePage } from "./pages/welcomePage";
import { Menu } from "./pages/Menu";
// import { Expenses } from "./pages/Expenses";
import { Blog } from "./pages/Blog";
// import { Profile } from "./pages/Profile";
import { ProtectedRute } from "./components/ProtectedRute";
import ProfilePage from "./pages/ProfilePage";
import Quiz from "./pages/Quiz";
import Result from "./pages/Results";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <RootLayout>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route
                path="/menu"
                element={
                  <ProtectedRute>
                    <Menu />
                  </ProtectedRute>
                }
              />
              {/* <Route index element={<Expenses/>}/> */}
              {/* </Route> */}
              <Route path="/quiz/:category/:difficulty/" element={<Quiz/>} />    
                        <Route path="/blog" element={<Blog />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRute>
                    <ProfilePage />
                  </ProtectedRute>
                }
              />
                  <Route path='/results' element={<Result/>} />
            </Routes>
          </RootLayout>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
