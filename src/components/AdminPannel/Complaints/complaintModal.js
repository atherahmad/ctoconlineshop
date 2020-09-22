import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../../styles/main.css'


function ComplaintModal({ closeHandler, complainId, getComplaints}) {

    const [complainData, setComplainData]=useState({})
    const [selectError, setSelectError]=useState(false)
    const [commentsError, setCommentsError]=useState(false)


    useEffect(() => {

        axios.get(`/api/admin/complaindetails/${complainId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setComplainData(res.data.success) })
            .catch(err => err)

    }, [])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(e.target.response.value==="0") return setSelectError(true)
        if(e.target.remarks.value==="") return setCommentsError(true)

        axios.post("/api/admin/handlecomplain",{id:complainId, remarks:e.target.remarks.value, response:e.target.response.value},{
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) {
                                        getComplaints()
                                        closeHandler()
            } })
            .catch(err => err)


    }


    return (
        <div className="adminRedBox">

            <div className="adminBlueBox-head"></div>

            <div className="active-message-text">
                <h1>Complaints</h1>
            </div>

            <div className="adminPopupContent">

                <div className="bg-gray m-1">
                    <strong>User-ID:</strong> {complainData._id}
                </div>
                <div className="bg-gray m-1">
                    <strong>Title:</strong> {complainData.title}
                </div>
            </div>
            <div className="adminPopupContent">
                <div className="bg-gray m-1">
                    <strong>Product-ID:</strong> {complainData.productId}
                </div>

                <div className="bg-gray m-1">
                    <strong>Status:</strong> {complainData.completed?"Completed":"In Proccess"}
                </div>
            </div>
            <div className="bg-gray mb-5">
                <strong>Costumer Comments:</strong> <br /> {complainData.message}
            </div>

            <form onSubmit={submitHandler}>

            <div className="p-2">
                <textarea name="remarks" 
                    style={{ width: "100%", height: "70px", padding: "10px" }} placeholder="Write a Comment" 
                    onChange={()=>{
                        setCommentsError(false)
                        setSelectError(false)}}
                    disabled={complainData.completed}
                    value={complainData.remarks}>
                </textarea>
                {commentsError?<small className="text-danger">* Please enter your comments.</small>:null}
            </div>

            <div className="bg-gray m-2">
                <strong className="m-2">Remarks:</strong>
                <select className="bg-gray m-2" name="response" 
                        onChange={()=>{
                            setSelectError(false)
                            setCommentsError(false)}}
                        disabled={complainData.completed}>
                    <option className="bg-gray m-2" selected={complainData.completed?false:true} value="0">Select Response</option>
                    <option className="bg-gray m-2" selected={complainData.valid?true:false}  value="1">Valid Complaint</option>
                    <option className="bg-gray m-2" selected={complainData.completed?!complainData.valid?true:false:false}  value="2">Inalid Complaint</option>
        
                </select> <br /> 
                {selectError?<small className="text-danger">* Please select valid response.</small>:null}

            </div>

            {!complainData.completed?
                <button style={{ float: "centre" }}
                type="submit"
                className="myBlueButton-lg m-1">
                Submit
                </button>
                :null}
            
            <button style={{ float: "centre" }}
                onClick={closeHandler}
                className="myRedButton-lg m-1">
                Close
                </button>
                </form>
        </div>
    )
}

export default ComplaintModal
