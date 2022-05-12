import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import io from 'socket.io-client'

const ENDPOINT = 'localhost:5000'

let socket

const Chat = () => {
  const [searchParams] = useSearchParams()

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  useEffect(() => {
    const { name, room } = Object.fromEntries([...searchParams])

    setRoom(room)
    setName(name)

    socket = io(ENDPOINT)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error)
      }
    })

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [ENDPOINT, searchParams])

  return <h1>Chat</h1>
}

export default Chat
