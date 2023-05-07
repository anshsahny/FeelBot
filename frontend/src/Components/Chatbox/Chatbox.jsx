import React, { useState, useEffect } from "react";
import './Chatbox.css'

const Chatbox = props => {
    return (
        <div className="chatbox-card card">
            <h5 className="invert-color">Chat</h5>
            <div className="scrollable chatbox">
                {props.messages && props.messages.length > 0 ?
                    {/* show all previous messages between user and bot */}
                    :
                    <div>No messages yet.</div>
                }
            </div>
            <div>
                <form className="invert-color">
                    <input className="chat-input" placeholder="Enter chat message here" value={props.message} onChange={(e) => props.setMessage(e.target.value)}></input>
                    <button className="submit-button" onClick={(e) => props.sendMessage(e)}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chatbox