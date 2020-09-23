import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Table } from 'react-bootstrap'
import ComplaintModal from './complaintModal'


function Complains() {

    const [complainsList, setComplainsList] = useState('')
    const [showComplainModal, setShowComplainModal] = useState(false)
    const [complainId, setComplainId] = useState()

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_DB_HOST}/api/admin/getcomplaints`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setComplainsList(res.data.success) })
            .catch(err => err)

    }, [])
    
    const getComplaints =()=>{
        axios.get(`${process.env.REACT_APP_DB_HOST}/api/admin/getcomplaints`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setComplainsList(res.data.success) })
            .catch(err => err)
    }

    const closeHandler = () => {
        setShowComplainModal(false)
        setComplainId(false)
    }





    return (
        <div className="mt-5">

            {showComplainModal ? <ComplaintModal
                complainId={complainId}
                closeHandler={closeHandler}
                getComplaints={getComplaints} /> : null}

            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>Customer Complains</h1>
            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>Complaint Id</th>
                        <th>Title</th>
                        <th>Product Id   </th>
                        <th>Date/Time</th>
                        <th>Status</th>
                        <th>Response</th>
                    </tr>
                </thead>
                <tbody>

                    {complainsList.length > 0 ? complainsList.map(data => {
                        return <tr className="active-message-body" onClick={() => {
                            setShowComplainModal(true)
                            setComplainId(data._id)
                        }} >
                            <td>{data._id}</td>
                            <td>{data.title}</td>
                            <td>{data.productId}</td>
                            <td>{data.timeStamp}</td>
                            <td>{data.completed ? "Completed" : "In Proccess"}</td>
                            <td>{data.completed ? data.valid? "Valid":"Invalid"  : "Decision Pending"}</td>
                        </tr>
                    }
                    ) : <h4>You have no Complaints!</h4>}

                </tbody>
            </Table>
        </div>
    )
}
export default Complains
