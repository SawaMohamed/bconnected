import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import FavUsers from './components/FavUsers'
import NavHome from './components/NavHome'

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    return (
        <BrowserRouter>
            <NavHome/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
                <Route path="/fav" element={<FavUsers />} />
                {/* <Route path="/chat" element={<FavUsers />} /> */}
                {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}

            </Routes>

        </BrowserRouter>
    )
}

export default App
