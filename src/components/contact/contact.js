import React,{useState,useEffect,useContext}  from 'react';
import  {GlobalContextContext} from "../Context/contextApi"
import '../styles/main.css';
import axios from 'axios';


const Contact = (props) => {
    const [profile,setProfile]=useContext(GlobalContextContext)
    const [hideForm,setHideForm]=useState(false)
    const [formError, setFormError]=useState(false)
    const [message,setMessage]=useState({
        name:profile.auth? profile.name:null,
        email:profile.auth? profile.email:null,
        subject:null,
        messageText:null
    })
    const regexEmail = new RegExp(/^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)

    const submitHandler= async (e)=>{
        e.preventDefault();
        if((!Object.keys(message).every(key=>message[key])) || (!regexEmail.test(message.email))) setFormError(true)
            else
                {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                axios.post("/api/contact/querry", message, config)
                    .then(res=>{
                        if(res.data.success) setHideForm(true)
                    })
                    .catch(err=>err)
                }
                
        }
    const changeHandler=(e)=>{
        setFormError(false)
        setMessage({...message,[e.target.name]:e.target.value})
        console.log(message)
    }

    useEffect(()=>{
        if(profile.auth) console.log("user is atuhenticated", profile.userId)
    },[])
    return (
        <div className="contact">
            <div className="container">

                <section className="mb-4" hidden={hideForm}>

                    <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>

                    <p className="text-center w-responsive mx-auto mb-5">
                        Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                        a matter of hours to help you.</p>

                    <div className="row">
                        <div className="col-md-12 mb-md-0 mb-5">
                            <form id="contact-form" 
                                  name="contact-form" 
                                  noValidate 
                                  autoComplete="off"
                                  onSubmit={submitHandler}
                                  >

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="md-form mb-0">
                                            <label for="name" className="">Your name</label>
                                            <input type="text" 
                                                   id="name" 
                                                   name="name" 
                                                   className="form-control" 
                                                   value={message.name} 
                                                   disabled={profile.name?true:false}
                                                   onChange={changeHandler} />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <div className="md-form mb-0">
                                            <label for="email" className="">Your email</label>
                                            <input type="text" 
                                                   id="email" 
                                                   name="email" 
                                                   className="form-control" 
                                                   value={message.email} 
                                                   disabled={profile.email?true:false}
                                                   onChange={changeHandler}
                                                 />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="md-form mb-0">
                                            <label for="subject" className="">Subject</label>
                                            <input type="text" 
                                                   id="subject" 
                                                   name="subject" 
                                                   className="form-control"
                                                   onChange={changeHandler}
                                                   value={message.subject} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="md-form">
                                            <label for="message">Your message</label>
                                            <textarea type="text" 
                                                      id="message"
                                                      name="messageText" 
                                                      rows="2" 
                                                      className="form-control md-textarea"
                                                      onChange={changeHandler}
                                                      value={message.messagetext} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-md-left mt-3">
                                    <button className="myBlueButton-lg btn-block"
                                            type="submit"> 
                                        Send
                                    </button>
                                    {formError?<p className="sText">*Please fill out all fields or check your email address</p>: null}
                                </div>
                            </form>
                        </div>
                    </div>

                </section>

                <section className="mb-4" hidden={!hideForm}>
                    <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
                    <p className="text-center w-responsive mx-auto mb-5">
                        We have recieved your querry and our support Team will repy on your given email address in next 48 Hours.</p>
                    <button className="myBlueButton-lg btn-block"
                        onClick={()=>props.history.push(`/`)}>
                        Go Back to Home
                    </button>
                </section>

            </div>
        </div>
    );
}

export default Contact;