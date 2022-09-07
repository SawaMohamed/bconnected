import {} from 'react-router-dom'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import NavDashboard from '../components/NavHome'
import { useCookies } from 'react-cookie'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [usersJobs, setUsersJobs] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [userJobFilter, setUserJobFilter] = useState('hiring')
  const [professionFilter, setProfessionFilter] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [favUsers, setFavUsers] = useState([])
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

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      usersJobInterest()
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
          <ChatContainer user={user} />
          <div className='swipe-container'>
            <div className='card-container'>
              {finalFilteredUsers?.map(i => (
                <TinderCard
                  className='swipe'
                  key={i.user_id}
                  onSwipe={dir => swiped(dir, i.user_id)}
                  onCardLeftScreen={() => outOfFrame(i.first_name)}
                >
                  <div
                    style={{ backgroundImage: 'url(' + i.url + ')' }}
                    className='card'
                  >
                    <h3>{i.first_name}</h3>
                  </div>
                  <button className='fav-button' onClick={() => addFav(i)}>
                    Favorites
                  </button>
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
