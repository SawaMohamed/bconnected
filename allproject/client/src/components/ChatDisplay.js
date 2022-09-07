import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import { useState, useEffect } from 'react'

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id
  const clickedUserId = clickedUser?.user_id
  const [usersMessages, setUsersMessages] = useState(null)
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

  const getUsersMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: userId, correspondingUserId: clickedUserId },
      })
      setUsersMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: clickedUserId, correspondingUserId: userId },
      })
      setClickedUsersMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // setInterval(() => {
    getUsersMessages()
    getClickedUsersMessages()
    // }, 2000)
  }, [])

  const messages = []

  usersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = user?.first_name
    formattedMessage['img'] = user?.url
    formattedMessage['message'] = message.message
    formattedMessage['createdAt'] = message.createdAt
    formattedMessage['senderId'] = message.from_userId
    messages.push(formattedMessage)
  })

  clickedUsersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = clickedUser?.first_name
    formattedMessage['img'] = clickedUser?.url
    formattedMessage['message'] = message.message
    formattedMessage['createdAt'] = message.createdAt
    formattedMessage['senderId'] = message.from_userId
    messages.push(formattedMessage)
  })

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  )

  return (
    <div>
      <Chat descendingOrderMessages={descendingOrderMessages} userId={userId} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </div>
  )
}

export default ChatDisplay
