import React, { useEffect, useState } from 'react'
import { getChatRoomList } from '../../../api/chatApi'

const ChatListPage = () => {
    const [chatList, setChatList] = useState([])
    useEffect(() => {
      const getList=async()=>{
        const data = await getChatRoomList()
        setChatList(data)
      } ;getList()
    }, [])
    
  return (
    <div>
      {chatList.map(i=>(
        <div>{i}</div>
      ))}
    </div>
  )
}

export default ChatListPage
