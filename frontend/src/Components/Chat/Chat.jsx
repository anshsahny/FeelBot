import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import UserList from "../UserList/UserList";
import Sentiment from "../Sentiment/Sentiment";
import Chatbox from "../Chatbox/Chatbox";

import './Chat.css'

const Chat = props => {
    const [signedIn, setSignedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

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
                                <UserList />
                            </Col>
                            <Col>
                                <Sentiment />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Chatbox message={message} setMessage={setMessage} sendMessage={sendMessage} />
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