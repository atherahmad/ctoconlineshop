import React from 'react'
import MyProfile from './mainProfile'

function MyAccount(props) {
    return (
        <div className="mt-5">
            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>My Account </h1>
            </div>

            <MyProfile {...props} />
        </div>
    )
}

export default MyAccount
