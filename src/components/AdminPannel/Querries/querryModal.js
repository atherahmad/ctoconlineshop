import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../../styles/main.css'


function QuerryModal({ closeHandler, querryId,getData }) {

    const [querry,setQuerry]=useState(false)
    const [formError, setFormError]=useState(false)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DB_HOST}/api/admin/querrydetails/${querryId}`, {
        headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
        }
    })
        .then(res => { if (res.data.success) setQuerry(res.data.success) })
        .catch(err => err)

}, [])
    const submitHandler=(e)=>{
        e.preventDefault()
        if(e.target.response.value.length<15) return setFormError(true)
        axios.post(`${process.env.REACT_APP_DB_HOST}/api/admin/handlequerry`,{id:querryId,  response:e.target.response.value, email:querry.email, name:querry.name,subject:querry.subject},{
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { 
                if (res.data.success) closeHandler()
                    getData() })
            .catch(err => err)

    }

    return (
        <div className="adminRedBox">

            <div className="adminBlueBox-head"></div>

            <div className="active-message-text">
                <h1>Querries</h1>
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>Query-ID:</strong> {querry._id}
                </div>
                <div className="bg-gray m-1">
                    <strong>Sender:</strong> {querry.name}
                </div>
            </div>
            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>Subject:</strong> {querry.subject   }
                </div>
                <div className="bg-gray m-1">
                    <strong>Email:</strong> {querry.email}
                </div>
            </div>
            <div className="bg-gray mb-5">
                <strong>Details</strong> <br /> {querry.message}
            </div>
        <form onSubmit={submitHandler}>
            <div className="p-2">
                <textarea 
                    style={{ width: "100%", height: "100px", padding: "10px" }} 
                    name="response"
                    placeholder="Write answer"
                    disabled={querry.completed}
                    value={querry.response} 
                    onChange={()=>setFormError(false)}/>
                    {formError?<small className="text-danger">* Please reply with atleast 15 characters.</small>:null}
            </div>

            {!querry.completed?<button style={{ float: "center" }} 
                        type="submit"
                        className="myBlueButton-lg m-1">
                    Reply
                    </button> 
                	
                    :null}

            <button style={{ float: "center" }}
                onClick={closeHandler}
                className="myRedButton-lg m-1">
                Close
                </button>
            </form>
        </div>
    )
}

export default QuerryModal
