import React, { useRef, useEffect, useState } from 'react';
import { Overlay, Popover } from "react-bootstrap"
import Button from '@material-ui/core/Button';
import GET from '../lib/get';
import { Link } from "react-router-dom"
import Input from '@material-ui/core/Input';
import { POST } from "../lib/post"

import '../styles/main.css'
// import './newMessage.css'



const NewMessage = (props) => {
  const { title, productId, recipentId, openShowSignin } = props
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState("")
  const ref = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("c2c-token")
    const checkAuth = async () => {

      if (token) {
        let response = await GET("api/auth/authenticated")
        console.log("response in authentication", response)
        if (response.data.status === "success") setAuth(true)
        else setAuth(false)
      }
    }
    checkAuth()
  }, [])
  const changeHandler = (e) => {
    setMessage(e.target.value)
  }
  const submitHandler = async () => {
    let senderId = JSON.parse(localStorage.getItem("c2c-profile")).id
    console.log(props, "props in msg")
    const { productId, recipentId, title } = props
    const messageData = {
      productId,
      recipentId,
      title,
      senderId,
      message
    }
    console.log("mesg data", messageData)
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('c2c-token'),
        'Content-Type': 'application/json'
      }
    }
    let response = await POST("/api/messages/sendmessage", messageData, config)
    console.log("response in msge", response)
  }

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <div className="myIcons fa fa-envelope-o" variant="secondary" onClick={handleClick}></div>

      <Overlay
        show={show}
        target={target}
        placement="left"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained" >

          {auth ?
            <div className='s-m-b-title mb-3'>
              <Popover.Title as="h3" className="bestRedColor">Inquire about product</Popover.Title>
              <Popover.Content>
                <Input
                  multiline="true"
                  placeholder="Message"
                  value={message}
                  onChange={changeHandler}
                  className="mb-3"
                />
                <button
                  onClick={submitHandler}
                  className="myBlueButton-sm fa fa-angle-double-right mt-2"
                >
                </button>
              </Popover.Content>
            </div>
            :
            <div className="s-m-title">
              <Popover.Title as="h3" >Request Failed!</Popover.Title>
              <Popover.Content>
                <small className="mt-3 myText">You are not logged in please <Link onClick={openShowSignin}>Signin</Link></small>
              </Popover.Content>
            </div>

          }



        </Popover>
      </Overlay>

    </div>
  );

}

export default NewMessage;