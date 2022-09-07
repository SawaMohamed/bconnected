import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import FavUsers from './components/FavUsers'
import NavHome from './components/NavHome'
import ChatContainer from './components/ChatContainer'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  const show = window.location.href === 'http://localhost:3000/'
  
  return (
    <BrowserRouter>
      {!show && <NavHome />}
      <Routes>
        {authToken && <Route path='/onboarding' element={<OnBoarding />} />}
        {authToken && <Route path='/dashboard' element={<Dashboard />} />}
        <Route path='/' element={<Home />} />
        <Route path='/fav' element={<FavUsers />} />
        {<Route path='/chat' element={<ChatContainer />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App
