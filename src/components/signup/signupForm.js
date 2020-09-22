import React, { useEffect, useState } from 'react';
import Zoom from 'react-reveal/Zoom'
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom"

import '../styles/main.css'

export default function SignupForm(props) {

    const { classes, submitHandler, changeHandler, firstName, inputErrors, email, lastName, confirmPass, pass } = props

    useEffect(() => {


    })
    return (
        <div>
            <div id="signup" className='mySignin'>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>
                    <Zoom >

                        <div className="mySignin-form">
                            <div className="h2-box-signup"></div>
                            <h2 className="mb-5" >Sign Up</h2>
                            <TextField
                                id="standard-name-input"
                                label="First Name"
                                type="name"
                                autoComplete="current-name"
                                name="firstName"
                                value={firstName}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.firstName ? inputErrors.firstName.status ? inputErrors.firstName.value : null : null}</smail>

                            <TextField
                                id="standard-name-input"
                                label="Last Name"
                                type="name"
                                autoComplete="current-name"
                                name="lastName"
                                value={lastName}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.lastName ? inputErrors.lastName.status ? inputErrors.lastName.value : null : null}</smail>
                            <TextField
                                id="standard-email-input"
                                label="Email"
                                type="email"
                                autoComplete="current-email"
                                name="email"
                                value={email}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.email ? inputErrors.email.status ? inputErrors.email.value : null : null}</smail>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                name="pass"
                                value={pass}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.pass ? inputErrors.pass.status ? inputErrors.pass.value : null : null}</smail>

                            <TextField
                                id="standard-password-input"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                name="confirmPass"
                                value={confirmPass}
                                onChange={changeHandler}
                            />
                            <smail className="sText">{inputErrors.confirmPass ? inputErrors.confirmPass.status ? inputErrors.confirmPass.value : null : null}</smail>

                            <button className="myRedButton-lg mt-4" type='submit'>Submit</button>
                            <small className="sText">{inputErrors.form ? inputErrors.form.status ? inputErrors.form.value : null : null}</small>
                            <small className="sText">{inputErrors.backend ? inputErrors.backend.status ? inputErrors.backend.value : null : null}</small>
                            <small className="mt-5 myText text-dark">Are you already registered with us? <Link to="/signin" className="L2">Signin</Link> </small>

                        </div>

                    </Zoom>
                </form>
            </div>
        </div>
    )
}
