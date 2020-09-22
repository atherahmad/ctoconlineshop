import React, { useState, useEffect } from 'react';
import axios from "axios"
const ConfirmEmail = (props) => {

    const [text, setText]=useState("")

    useEffect(() => {
            const { id, token } = props.match.params
            console.log("id ", id, " token ", token)
            const formData = {
                id,
                token
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post("/api/auth/confirm", formData, config)
                .then(res=>{
                    if(res.data.success) {
                        setText(res.data.success)
                        console.log(res.data)
                    }
                    else setText(res.data.failed)
                }
                )
                .catch(err=>err)
    }, [])

    return ( 
        <div>
            {text}
        </div>
     );
}
 
export default ConfirmEmail;