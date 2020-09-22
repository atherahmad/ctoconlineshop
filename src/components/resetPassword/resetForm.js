import React from 'react';

import TextField from '@material-ui/core/TextField';
import { Link, } from "react-router-dom"


const ResetForm = (props) => {
    const { submitHandler, pass, changeHandler, inputErrors, confirmPass } = props

    return (
        <div className='resetModal' style={{ width: "600px" }} >
            <form noValidate autoComplete="off" onSubmit={submitHandler}>
                <div className="resetModal-form">
                    <div className="h2-box"></div>
                    <h2 clsassName="mb-5 p-2" >Reset Password</h2>
                    <div className="resetModal-center">

                        <TextField
                            id="standard-password-input"
                            label="New Password"
                            type="password"
                            autoComplete="current-password"
                            name="pass"
                            value={pass}
                            onChange={changeHandler}
                            className="mb-4 w-100"
                        />
                        <smail className="sText">{inputErrors.pass ? inputErrors.pass.status ? inputErrors.pass.value : null : null}</smail>
                        <TextField
                            id="standard-password-input"
                            label="Confirm New Password"
                            type="password"
                            autoComplete="current-password"
                            name="confirmPass"
                            value={confirmPass}
                            onChange={changeHandler}
                            className="mb-4 w-100"
                        />
                        <smail className="sText">{inputErrors.confirmPass ? inputErrors.confirmPass.status ? inputErrors.confirmPass.value : null : null}</smail>
                        <div className="mt-5 d-flex">
                            <div className="resetModal-btn">
                                <button className="myBlueButton-lg" type="submit">Submit</button>

                                <button className="myRedButton-lg ml-1 " type="submit"> <Link style={{ color: "white", textDecoration: "none" }} to={"/"} >
                                    Cancel
                                    </Link></button>
                            </div>

                        </div>

                    </div>
                </div>
            </form>
        </div >
    );
}

export default ResetForm;