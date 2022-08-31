import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()
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

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: { gender: user?.interest },
      })
      setGenderedUsers(response.data)
    } catch (error) {
      // console.log(error)
    }
  }

  //   const updateMatches = async matchedUserId => {
  //     try {
  //       await axios.put('http://localhost:8000/addmatch', {
  //         userId,
  //         matchedUserId,
  //       })
  //       getUser()
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

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

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId)

  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
  )

  
  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      getGenderedUsers()
    }
  }, [user])


  //   console.log('filteredGenderedUsers ', filteredGenderedUsers)
  return (
    <>
      {user && (
        <div className='dashboard'>
          <ChatContainer user={user} />
          <div className='swipe-container'>
            <div className='card-container'>
              {users?.map(e => (
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
