import {} from 'react-router-dom'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import NavDashboard from '../components/NavHome'
import { useCookies } from 'react-cookie'
import HandshakeIcon from '@mui/icons-material/Handshake'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import StarIcon from '@mui/icons-material/Star'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [usersJobs, setUsersJobs] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [userJobFilter, setUserJobFilter] = useState('hiring')
  const [professionFilter, setProfessionFilter] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [favUsers, setFavUsers] = useState([])
  const [tinderLayoutHeight, setTinderLayoutHeight] = useState('none')
  const [buttonLayout, setButtonLayout] = useState('flex')
  const [finalFilteredUsers, setFinalFilteredUsers] = useState([])

  const userId = cookies.UserId
  // @desc      get all users & get current user
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users`)
      setUsers(response.data)

      const activeUser = await axios.get(
        `http://localhost:8000/users/${userId}`
      )

      setUser(activeUser.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  // @desc      get users according to your job interest
  const usersJobInterest = async () => {
    try {
      const response = await axios.get('http://localhost:8000/interest-users', {
        // params: { interest: user.interest },
        params: { interest: user.interest, profession: user.profession },
      })
      setUsersJobs(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // @desc      add matched users to your matches array
  const updateMatches = async matchedUserId => {
    try {
      await axios.put('http://localhost:8000/users', {
        userId,
        matchedUserId,
      })
      getUser()
    } catch (err) {
      console.log(err.message)
    }
  }

  // @desc    add user to favorites add filter them form list
  const addFav = async i => {
    try {
      let userFavUpdate = i.user_id
      await axios.put('http://localhost:8000/addfav', {
        userId,
        userFavUpdate,
      })
      let arr = []
      finalFilteredUsers.map(e => e.user_id !== userFavUpdate && arr.push(e))
      setFinalFilteredUsers(arr)
    } catch (err) {
      console.log(err.message)
    }
  }

  // @desc    swipe user to update matches
  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const clicked = (direction, swipedUserId) => {
    updateMatches(swipedUserId)
  }

  const outOfFrame = name => {
    console.log(name + ' left the screen!')
  }

  // @desc      list array of users that i matched including me
  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId)

  user?.favUsers.forEach(({ user_id }) => {
    matchedUserIds.push(user_id)
  })

  const hideTinderLayout = () => {
    if (tinderLayoutHeight === 'flex') {
      setTinderLayoutHeight('none')
      setButtonLayout('flex')
    } else {
      setTinderLayoutHeight('flex')
      setButtonLayout('none')
    }
  }

  // @desc    save me in local for all other components
  const saveUserLocal = user => {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      usersJobInterest()
      saveUserLocal(user)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      setFinalFilteredUsers(
        usersJobs?.filter(e => !matchedUserIds.includes(e.user_id))
      )
    }
  }, [usersJobs])

  return (
    <>
      {user && (
        <div className='dashboard'>
          {/*  <ChatContainer user={user} /> */}
          <div className='swipe-container'>
            <div className='card-container'>
              {finalFilteredUsers?.map(i => (
                <TinderCard
                  className='swipe'
                  key={i.user_id}
                  onSwipe={dir => swiped(dir, i.user_id)}
                  onCardLeftScreen={() => outOfFrame(i.first_name)}
                >
                  <IconButton
                    className='show-card-content'
                    onClick={hideTinderLayout}
                    style={{ display: `${buttonLayout}` }}
                  >
                    <ArrowDropDownCircleOutlinedIcon />
                  </IconButton>

                  <div
                    className='tinder-layout'
                    style={{ display: `${tinderLayoutHeight}` }}
                  >
                    <IconButton
                      className='hide-card-content'
                      onClick={hideTinderLayout}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <div
                      className='card-content-about'
                      style={{ fontSize: '16px' }}
                    >
                      About me:
                      <br></br>
                      <br></br>
                      <p style={{ fontSize: '14px' }}>{i.about}</p>
                    </div>
                    <div className='card-content-interest'>
                      I am looking for..
                      <br></br>
                      <br></br>
                      <p style={{ fontSize: '14px' }}>{i.interest}</p>
                    </div>
                    <div className='card-content-links'>
                      You can also find me at:
                      <br></br>
                      <br></br>
                      <p
                        className='interest-content'
                        style={{ fontSize: '14px' }}
                      >
                        {i.link_github}
                        {i.link_portfolio}
                        {i.link_linkedin}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{ backgroundImage: 'url(' + i.url + ')' }}
                    className='card'
                  >
                    <h3 className='card-title'>
                      {i.first_name} {i.last_name}, {i.profession}
                    </h3>
                  </div>

                  <div className='swipe-icons'>
                    <IconButton className='swipeButton_close' onClick={clicked}>
                      <CloseIcon fontSize='large' />
                    </IconButton>
                    <IconButton
                      className='swipeButton-favorite'
                      onClick={() => addFav(i)}
                    >
                      <StarIcon fontSize='large' />
                    </IconButton>
                    <IconButton className='swipeButton-like'>
                      <HandshakeIcon fontSize='large' />
                    </IconButton>
                  </div>
                </TinderCard>
              ))}

              <div className='swipe-info'>
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Dashboard
