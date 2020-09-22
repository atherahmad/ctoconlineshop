import React from 'react';
import './../styles.css'
import { Form } from 'react-bootstrap';
import ImageCard from '../../sell/imageCard';


import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '500px',
        },
    },

}));

const ProfileData = (props) => {
    const classes = useStyles();

    const { submitHandler, imageChangeHandler, changeHandler, editDisabler, editEnabler, profile, renderModal, editAble, errors } = props



    return (
        <div className='shadow-lg p-5'>
            <Form onSubmit={submitHandler}>

                <fieldset disabled={editAble ? "" : "disabled"}>
                    <div className="w-25  ">
                        <ImageCard image={profile.profileImage} edit={true} id={"1"} imageChangeHandler={imageChangeHandler} />
                    </div>

                    <form className={`${classes.root}, `}>
                        <TextField
                            id="standard-name-input"
                            label="First Name"
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={changeHandler}
                            className="mb-4 mt-4 mr-1 col-lg-5 col-md-5 col-sm-12"
                            helperText={<small className="sText">{errors.firstName ? errors.firstName.status ? errors.firstName.value : null : null}</small>}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Last Name"
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={changeHandler}
                            className="mb-4 mt-4 mr-1 col-lg-5 col-md-5 col-sm-12"
                            helperText={<small className="sText">{errors.lastName ? errors.lastName.status ? errors.lastName.value : null : null}</small>}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Email"
                            type="text"
                            name="email"
                            value={profile.email}
                            onChange={changeHandler}
                            className="mb-4 mr-1 col-lg-5 col-md-5 col-sm-12"
                            fullWidth={true}
                            disabled={true}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Phone"
                            type="text"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={changeHandler}
                            className="mb-4 mr-1 col-lg-5 col-md-5 col-sm-12"
                            helperText={<small className="sText">{errors.phoneNumber ? errors.phoneNumber.status ? errors.phoneNumber.value : null : null}</small>}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Password"
                            type="password"
                            name="password"
                            value="*********"
                            onChange={changeHandler}
                            className="mb-4 mr-1 col-lg-5 col-md-5 col-sm-12"
                            disabled={true}
                            helperText={editAble ?
                                <small className="sText"
                                    onClick={renderModal}
                                    style={{ cursor: "pointer" }}>click here to change your password</small> : null}
                        />
                        <TextField
                            id="standard-name-input"
                            label="PayPal ID"
                            type="text"
                            name="paypalId"
                            value={profile.paypalId}
                            onChange={changeHandler}
                            className="mb-4 mr-1 col-lg-5 col-md-5 col-sm-12"
                            helperText={<small className="sText">{errors.paypalId ? errors.paypalId.status ? errors.paypalId.value : null : null}</small>}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Zipcode"
                            type="text"
                            name="zipCode"
                            value={profile.zipCode}
                            onChange={changeHandler}
                            className="mb-4 mr-1 col-lg-5 col-md-5 col-sm-12"
                            helperText={<small className="sText">{errors.zipCode ? errors.zipCode.status ? errors.zipCode.value : null : null}</small>}

                        />

                        <TextField
                            id="standard-name-input"
                            label="City"
                            type="text"
                            name="city"
                            value={profile.city}
                            onChange={changeHandler}
                            className="mb-4 mr-1 col-lg-5 col-md-5 col-sm-12"
                            helperText={<small className="sText">{errors.city ? errors.city.status ? errors.city.value : null : null}</small>}
                        />


                        <TextField
                            id="standard-name-input"
                            label="Street"
                            type="text"
                            name="street"
                            value={profile.street}
                            onChange={changeHandler}
                            className="mb-4 col-lg-12 col-md-12 col-sm-12"
                            fullWidth={true}
                            helperText={<small className="sText">{errors.street ? errors.street.status ? errors.street.value : null : null}</small>}
                        />
                    </form>

                </fieldset>
                {
                    editAble ?
                        <div>
                            <button className='myBlueButton-lg' type="submit">
                                Update
                    </button>
                            <button className="ml-1 myRedButton-lg" onClick={editDisabler} >
                                Cancel
                    </button>
                        </div>
                        :
                        <button className="myBlueButton-lg" onClick={editEnabler}>
                            Edit
            </button>
                }
                <small className="sText">{errors.form ? errors.form.status ? errors.form.value : null : null}</small>

            </Form>
        </div>
    );
}

export default ProfileData;