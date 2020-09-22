import React, { useState } from 'react';

import '../../styles/main.css';

const MessagePopup = (props) => {
    const [send, setSend] = useState({
        message: {}
    })

    const changeHandler = (e) => {
        setSend({ message: e.target.value })
    }

    const handleAddMessage = (e) => {
        e.preventDefault();

    }


    return (
        <div className="message-wrapper">
            <div className="message-header">
                <button>X</button>
                <h2>Milad Mosadegh</h2>
            </div>
            <div className="p-id">
                Product ID : 123456778
            </div>
            <div className="message-box">
                <div className="sender-box">
                    <div className="sender">
                        Sender
                    </div>
                </div>

                <div className="reciver-box">
                    <div className="reciver">Reeciver</div>
                </div>
            </div>

            <form className="message-write" onSubmit={handleAddMessage}>
                <input type="text" onChange={changeHandler} />
                <button className="fa fa-send-o" ></button>
            </form>
        </div>
    );
}

export default MessagePopup;