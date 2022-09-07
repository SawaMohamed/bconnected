import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import HandshakeIcon from '@mui/icons-material/Handshake'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import StarIcon from '@mui/icons-material/Star'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const FavUsers = () => {
  const [favUsers, setFavUsers] = useState(null)
  const [me, setMe] = useState(null)
  const [myFavIds, setMyFavIds] = useState(null)
  const [fav, setFav] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const userId = cookies.UserId

  // @desc    get my personal data
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

  // @desc    get my fav users data according to my favUsers
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

  // @desc    add user to me matches
  const addUser = async i => {
    try {
      let userId = me.user_id
      let matchedUserId = i.user_id
      const { data } = await axios.put('http://localhost:8000/users', {
        userId,
        matchedUserId,
      })
      console.log(data)
      removeUser(i)
    } catch (err) {
      console.log(err.message)
    }
  }

  // @desc    remove user from my fav
  const removeUser = async i => {
    try {
      if (me) {
        let arr = []
        me?.favUsers.map(e => e.user_id !== i?.user_id && arr.push(e))
        let formData = { ...me, favUsers: arr }
        const response = await axios.put(
          `http://localhost:8000/users/${me?.user_id}`,
          {
            formData,
          }
        )
        if (response) {
          window.location.reload()
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  useEffect(() => {
    getFav()
  }, [myFavIds])

  console.log(fav && fav[0])

  return (
    <div className='fav-container'>
      {fav?.map(i => (
        <div className='fav-users-cards' key={i?.user_id}>
          <div className='fav-info'>
            <div
              style={{ backgroundImage: 'url(' + i?.url + ')' }}
              className='fav-card-img'
            ></div>
            <p>
              Name: {i?.first_name} {i?.last_name}
            </p>
            <p>Profession: {i?.profession}</p>
            <p>About me: {i?.about}</p>
            <p>Interested in : {i?.interest}</p>
            <p className='fav-links'>
              {i?.link_linkedin && (
                <a target='#' href={i?.link_linkedin}>
                  My linkedin
                </a>
              )}
              {i?.link_github && (
                <a target='#' href={i?.link_github}>
                  My github
                </a>
              )}
              {i?.link_portfolio && (
                <a target='#' href={i?.link_portfolio}>
                  My portfolio
                </a>
              )}
            </p>
            {i?.show_dob && <p>Date of Birth: {i.dob}</p>}
          </div>

          <div className='swipe-icons fav-buttons'>
            <IconButton
              className='swipeButton_close'
              onClick={() => removeUser(i)}
            >
              <CloseIcon fontSize='large' />
            </IconButton>
            <IconButton className='swipeButton-like' onClick={() => addUser(i)}>
              <HandshakeIcon fontSize='large' />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FavUsers
