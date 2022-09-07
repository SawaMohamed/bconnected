import React, { useEffect } from 'react'

const Chat = ({ descendingOrderMessages, userId }) => {
  // useEffect(() => {
  //   console.log(descendingOrderMessages && descendingOrderMessages)
  // })

  

  return (
    <div className='chat-display'>
      {descendingOrderMessages?.map((message, _index) => (
        <div
          className={message?.senderId === userId && 'chat-my-message'}
          key={_index}
        >
          <div className='chat-message-header'>
            <div className='img-container'>
              <img src={message.img} alt={message.name + ' profile'} />
            </div>
            <p>{message.name}</p>
          </div>
          <p className='message-box'>{message.message}</p>
        </div>
      ))}
    </div>
  )
}

export default Chat
