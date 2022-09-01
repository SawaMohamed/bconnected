import React, { useEffect, useState } from 'react'

const FavUsers = () => {
  const [favUsers, setFavUsers] = useState(null)

  useEffect(() => {
    return () => {
      setFavUsers(JSON.parse(localStorage.getItem('UsersFav')))
    }
    console.log(favUsers && favUsers)
  }, [])

  return (
    <div className='fav-container'>
      {favUsers?.map(i => (
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
