import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import '../styles/main.css'
import {POST} from "../lib/post"

function ProductMessage(props) {

    const {hideAlertBox,title, productId, recipentId, recipentName}=props

    const [message, setMessage] = useState("")

    const changeHandler = (e) => {
        setMessage(e.target.value)
      }
      const submitHandler = async () => {
        let senderId = JSON.parse(localStorage.getItem("c2c-profile")).id
        console.log(title,productId,recipentId, "props in msg")
        const messageData = {
          productId,
          recipentId,
          title,
          senderId,
          message
        }
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
          }
        }
        let response = await POST("/api/messages/sendmessage", messageData, config)
        if(response.data.status==="success") props.history.push("/messages")
      }
    return (
        <div className="pdm">
        <div className="pdm-content">
            <div className="pdm-head">
            </div>
            <div className="pdm-head-title">
                {title}
            </div>
            
            <div className="pdm-tilte">

                <InputLabel 
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    disabled={true}
                     >To : {recipentName}</InputLabel>

                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    name="description"
                    multiline
                    rows={4}
                    placeholder="Write Your Message Here"
                    variant="outlined"
                    className="col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}
                    onChange={changeHandler}

                />
            </div>
                <div className="alertBox-body">

                        <button type="button" className="myOrabgeButton-lg fa fa-envelope" onClick={submitHandler}></button>
                        <button type="button" className="myRedButton-lg ml-1" onClick={hideAlertBox}>Close</button>

                </div>
            </div>
        </div>
    )
}

export default ProductMessage
