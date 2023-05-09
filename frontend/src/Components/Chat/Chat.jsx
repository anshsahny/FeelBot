import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UserList from "../UserList/UserList";
import Sentiment from "../Sentiment/Sentiment";
import Chatbox from "../Chatbox/Chatbox";

import io from 'socket.io-client'

import './Chat.css'

const ENDPOINT = 'http://localhost:8000/'
console.log(ENDPOINT)

const Chat = props => {
    const [signedIn, setSignedIn] = useState(false)
    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState('')

    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = io.connect(ENDPOINT, { transports: ['websocket'] })

        socketRef.current.on('your id', id => {
            setId(id)
        })

        socketRef.current.on('get users', users => {
            console.log(users)
            setUsers(users)
        })
    }, [])

    useEffect(() => {
        if (signedIn) {
            socketRef.current.emit('new user', { Username: username })
        }
    }, [signedIn, username])

    const sendMessage = e => {
        console.log('send message')
        e.preventDefault()
        setMessage('')
    }

    return (
        <div className="main-section">
            <Container>
                {signedIn ?
                    <>
                        <h3>Welcome, {username}!</h3>
                        <Row md={2}>
                            <Col>
                                <UserList users={users} />
                            </Col>
                            <Col>
                                <Sentiment />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Chatbox id={id} message={message} setMessage={setMessage} sendMessage={sendMessage} />
                            </Col>
                        </Row>
                    </>
                    :
                    <form>
                        <Row>
                            <Col>
                                Enter Username:
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className="username" type="text" name="name" onChange={(e) => setUsername(e.target.value)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button className="submit-button" onClick={(e) => setSignedIn(true)}>Submit</button>
                            </Col>
                        </Row>
                    </form>
                }
            </Container>
        </div>
    )
}

export default Chat