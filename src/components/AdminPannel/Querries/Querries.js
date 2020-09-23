import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import QuerryModal from './querryModal'

function Querries() {

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_DB_HOST}/api/admin/getquerries`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setQuerries(res.data.success) })
            .catch(err => err)

    }, [])
    const [querries, setQuerries] = useState([])
    const [querryId, setQuerryId] = useState(false)
    const [showQuerryModal, setShowQuerryModal] = useState(false)

    const getData=()=>{
        axios.get(`${process.env.REACT_APP_DB_HOST}/api/admin/getquerries`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setQuerries(res.data.success) })
            .catch(err => err)
    }

    const closeHandler = () => {
        setShowQuerryModal(false)
    }
    return (
        <div className="mt-5">
            {showQuerryModal ? <QuerryModal
                querryId={querryId}
                closeHandler={closeHandler}
                getData={getData}
            /> : null}

            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>Customer Querries</h1>
            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>Query ID</th>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {querries.length > 0 ? querries.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr key={data._id} className="active-message-body"
                            onClick={() => {
                                setShowQuerryModal(true)
                                setQuerryId(data._id)
                            }
                            }
                            style={{ cursor: "pointer" }}

                        >
                            <td>{data._id}</td>
                            <td>{data.name}</td>
                            <td>{data.subject}</td>
                            <td>{data.timeStamp}</td>
                            <td>{data.completed ? "Completed" : "In Proccess"}</td>
                        </tr>
                    }
                    ) : <h4>You have no Messages!</h4>}

                </tbody>
            </Table>
        </div >
    )
}


export default Querries
