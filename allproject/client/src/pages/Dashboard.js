import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [usersJobs, setUsersJobs] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [userJobFilter, setUserJobFilter] = useState("hiring")
  const [professionFilter, setProfessionFilter] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId
  // @desc      get all users & get current user
  const getUser = async () => {
    try {
      // const response = await axios.get('http://localhost:8000/user', {
      //     params: {userId}
      // })
      //   setUser(user.data)

      const response = await axios.get(`http://localhost:8000/users`)
      setUsers(response.data)

      const activeUser = await axios.get(
        `http://localhost:8000/users/${userId}`
      )
      setUser(activeUser.data)
    } catch (error) {
      // console.error(error.message)
      console.log(error.message)
    }
  }

  // @desc      get users according to your job interest
  const usersJobInterest = async () => {
    try {
      const response = await axios.get('http://localhost:8000/interest-users', {
        params: { interest: userJobFilter },
      })
      setUsersJobs(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // @desc      get users according to your profession interest
  const usersProfession = async () => {
    try {
      const response = await axios.get('http://localhost:8000/profession-users', {
        params: { profession: professionFilter },
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
console.log(matchedUserIds)

// @desc        filter matched users out of your interest users
// @desc        finally use this array to display users
  const filteredGenderedUsers = usersJobs?.filter(
    e => !matchedUserIds.includes(e.user_id)
  )

  
  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      usersJobInterest()
    }
  }, [user])


  return (
    <>
      {user && (
        <div className='dashboard'>
          <ChatContainer user={user} />
          <div className='swipe-container'>
            <div className='card-container'>
              {filteredGenderedUsers?.map(e => (
                <TinderCard
                  className='swipe'
                  key={e.user_id}
                  onSwipe={dir => swiped(dir, e.user_id)}
                  onCardLeftScreen={() => outOfFrame(e.first_name)}
                >
                  <div
                    style={{ backgroundImage: 'url(' + e.url + ')' }}
                    className='card'
                  >
                    <h3>{e.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
              {/* {filteredGenderedUsers?.map(genderedUser => (
                <TinderCard
                  className='swipe'
                  key={genderedUser.user_id}
                  onSwipe={dir => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                    className='card'
                  >
                    <h3>{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))} */}
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
