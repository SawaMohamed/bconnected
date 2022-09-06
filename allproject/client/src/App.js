import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatContainer from "./components/ChatContainer";
import FavUsers from "./components/FavUsers";
import NavHome from "./components/NavHome";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const authToken = cookies.AuthToken;

    return (
        <BrowserRouter>
            <NavHome/>
            <Routes>
                {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
                {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
                <Route path="/" element={<Home/>}/>
                <Route path="/fav" element={<FavUsers />} />

                {<Route path="/chat" element={<ChatContainer />} />}
                
                </Routes>
                </BrowserRouter>

    )
}

export default App;
