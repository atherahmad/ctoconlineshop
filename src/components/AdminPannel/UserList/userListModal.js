import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styles/main.css'


function UserListModal({ closeHandler, userId, getUserList }) {
    const [user, setUser] = useState('')
    const [bgImage, setBgImage] = useState('')
    const [showUpdate, setShowUpdate] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [recordUpdated, setRecordUpdated] = useState(false)


    useEffect(() => {

        axios.get(`/api/admin/userdetails/${userId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.data) {
                    setUser(res.data.data)
                    setAdmin(res.data.data.admin)
                        (res.data.data.profileImage ? setBgImage(res.data.data.profileImage) : null)
                }
            })
            .catch(err => err)
    }, [])

    const updateHandler = () => {
        console.log("admin status", admin)

        axios.post("/api/admin/updateuser",
            { userId, admin },
            {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.data.success) {
                    getUserList()
                    closeHandler()
                }
            })
            .catch(err => err)
    }
    return (
        <div className="adminRedBox">
            <div className="adminRedBox-head"></div>
            <div className="active-message-text">
                <h3>{user.firstName} {user.lastName}</h3>
            </div>
            <div>
                <img
                    width="200px" height="200px"
                    className="modalImageShadow"
                    src={`http://localhost:5000/avatars/${bgImage ? bgImage : "noimage.png"}`} alt="profile Image" />
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>City:</strong> {user.city}
                </div>
                <div className="bg-gray m-1">
                    <strong>Email:</strong> {user.email}
                </div>

                <div className="bg-gray m-1">
                    <strong>Phone:</strong> {user.phoneNumber}
                </div>
                <div className="bg-gray m-1">
                    <strong>ZipCode:</strong> {user.zipCode}
                </div>
                <div className="bg-gray m-1">
                    <strong>Street:</strong> {user.street}
                </div>
                <div className="bg-gray m-1">
                    <strong>Access Level:</strong> {user.admin ? "Admin" : "User"}
                </div>


            </div>

            <div className="bg-gray m-1 mb-2">
                <input id="exampleCheck1"
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={user.admin}
                    onClick={() => {
                        setShowUpdate(true)
                        setAdmin(!admin)
                        setRecordUpdated(false)
                    }} /> <strong>Mark him/her Admin</strong>

            </div>

            <button style={{ float: "center" }}
                onClick={closeHandler}
                className="myRedButton-lg m-1">
                Close
                </button>
            {recordUpdated ? <p className="text-success">You have successfully updated the user Access Level.</p> : null}
            {showUpdate ? <button style={{ float: "center" }}
                onClick={updateHandler}
                className="myOrabgeButton-lg m-1">
                Update
                </button> : null}

        </div>
    )
}

export default UserListModal
