import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const FavUsers = () => {
  const [favUsers, setFavUsers] = useState(null)
  const [me, setMe] = useState(null)
  const [myFavIds, setMyFavIds] = useState(null)
  const [fav, setFav] = useState(null)

  const [cookies, setCookie, removeCookie] = useCookies(null)

  const userId = cookies.UserId

  const getMe = async () => {
    try {
      const activeUser = await axios.get(
        `http://localhost:8000/users/${userId}`
      )
      setMe(activeUser.data)

      setMyFavIds(activeUser.data?.favUsers.map(({ user_id }) => user_id))
    } catch (error) {
      console.log(error.message)
    }
  }

  const getFav = async () => {
    try {
      if (myFavIds) {
        const response = await axios.get('http://localhost:8000/addfav', {
          params: { favIds: JSON.stringify(myFavIds) },
        })
        setFav(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  useEffect(() => {
    getFav()
  }, [myFavIds])

  return (
    <div className='fav-container'>
      {fav?.map(i => (
        <div className='fav-users-cards' key={i?.user_id}>
          <div
            style={{ backgroundImage: 'url(' + i?.url + ')' }}
            className='card'
          >
            <h3>{i?.first_name}</h3>
            {i?.show_dob && <p>{i.dob}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FavUsers
