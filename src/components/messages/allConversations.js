import React from 'react';
import { Table } from 'react-bootstrap'
import '../styles/main.css'

const AllConversations = (props) => {

    const { showPopUp, setTargetConversation, setConversationRecipent, selectedArray, deleteHandler, selectAllHandler, selectOneHandler, conversations } = props

    let currentUserId = JSON.parse(localStorage.getItem("c2c-profile")).id
    const setConversationDetails = (data) => {
        setTargetConversation(data._id)
        data.senderId._id === currentUserId ?
            setConversationRecipent(data.recipentId.firstName)
            : setConversationRecipent(data.senderId.firstName)
        showPopUp()
    }
    return (
        <div className="wrapMessage">
            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>Message</h1>
            </div>
            <Table striped bordered hover >
                <thead className="t-head">
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th><input type="checkbox" onClick={selectAllHandler} /></th>
                    </tr>
                </thead>
                <tbody>

                    {conversations.length > 0 ? conversations.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr className="active-message-body">
                            <td>{data.senderId._id === currentUserId ? "Me" : data.senderId.firstName}</td>
                            <td>{data.recipentId._id === currentUserId ? "Me" : data.recipentId.firstName}</td>
                            <td
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setTargetConversation(data._id)
                                    showPopUp()
                                    setConversationDetails(data)
                                }}>{data.title}</td>
                            <td>{myDate.toLocaleString()}</td>
                            <td><input type="checkbox" checked={selectedArray.includes(data._id) ? true : false} onClick={() => selectOneHandler(data._id)} /></td>
                        </tr>
                    }
                    ) : <h4>You have no Messages!</h4>}


                </tbody>
            </Table>
            {conversations.length > 0 ? <div>
                <button className="myRedButton-lg" onClick={deleteHandler}>Delete</button>
            </div> : null}
        </div>
    );
}

export default AllConversations;
