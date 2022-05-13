import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import io from 'socket.io-client'

const ENDPOINT = 'localhost:5000'

let socket

const Chat = () => {
  const [searchParams] = useSearchParams()

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

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

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message])
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return <h1>Chat</h1>
}

export default Chat
