import React from 'react'
import Zoom from 'react-reveal/Zoom'
import TextField from '@material-ui/core/TextField';
import { Modal } from "react-bootstrap"

export default function ChangePassform(props) {

    const { derenderModal, showModal, submitHandler, changeHandler, pass, confirmPass, inputErrors, oldPass } = props
    return (
        <Modal size="md" show={showModal} onHide={derenderModal} animation={true} centered>
            <div className='resetModal'  >
                <form noValidate autoComplete="off" onSubmit={submitHandler}>

                    <Zoom >

                        <div className="resetModal-form">
                            <div className="h2-box">
                            </div>
                            <h2 clsassName="mb-5 p-2" >Change Password</h2>
                            <div className="d-flex flex-column p-4">
                                <TextField
                                    id="standard-password-input"
                                    label="Old Password"
                                    type="password"
                                    autoComplete="current-password"
                                    name="oldPass"
                                    value={oldPass}
                                    onChange={changeHandler}
                                    className="mb-4"
                                />

                                <TextField
                                    id="standard-password-input"
                                    label="New Password"
                                    type="password"
                                    autoComplete="current-password"
                                    name="pass"
                                    value={pass}
                                    onChange={changeHandler}
                                    className="mb-4"
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
                                    className="mb-4"
                                />
                                <smail className="sText">{inputErrors.confirmPass ? inputErrors.confirmPass.status ? inputErrors.confirmPass.value : null : null}</smail>
                                <smail className="sText">{inputErrors.form ? inputErrors.form.status ? inputErrors.form.value : null : null}</smail>

                                <div className="mt-5 d-flex">
                                    <div className="col-md-6 co-sm-12">
                                        <button className="myBlueButton-lg btn-block" type="submit">Submit</button>
                                    </div>
                                    <div className="col-md-6 co-sm-12">
                                        <button onClick={derenderModal} className="myRedButton-lg btn-block" type="submit">
                                            Cancel
                                     </button>
                                    </div>
                                </div>

                            </div>



                        </div>

                    </Zoom>
                </form>
            </div>


        </Modal>
    )
}


