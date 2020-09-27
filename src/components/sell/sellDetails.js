import React from 'react';

import Categories from "../lib/categories"
import ImageCard from "./imageCard"
import Colors from "../lib/colors"
import Conditions from "../lib/condition"
import Fade from 'react-reveal/Fade';
import '../styles/main.css'

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';





const SellDetails = (props) => {
    const { imageChangeHandler, changeHandler, submitHandler, product, edit, showAlertBox, inputErrors } = props

    const cancelHandler = () => {
        props.history.push("/")
    }


    return (

        <div className="sellWrapAll ">
            <div className="row sellBgGradient ">
                <Fade cascade delay={100}>
                    <div className="boxLeft">
                        <div className="boxLeftChild">

                            <form noValidate autoComplete="off">

                                <TextField
                                    id="standard-name-input"
                                    label="Title"
                                    type="text"
                                    name="title"
                                    value={product.title}
                                    onChange={changeHandler}
                                    required={true}
                                    className="mb-3 col-lg-12 col-md-12 col-sm-12"
                                    helperText={<small className="sText">{inputErrors.title ? inputErrors.title.status ? inputErrors.title.value : null : null}</small>}
                                />



                                <TextField
                                    id="standard-select-currency"
                                    label="Categories"
                                    select
                                    name="category"
                                    value={product.category}
                                    onChange={changeHandler}
                                    fullWidth={true}
                                    required={true}
                                    className="mb-3 col-lg-12 col-md-12 col-sm-12"
                                    helperText={<small className="sText"> {inputErrors.category ? inputErrors.category.status ? inputErrors.category.value : null : null}</small>}
                                >
                                    {Categories.map((key, index) => {
                                        if (key.id === 0) return null
                                        else return <MenuItem value={key.id}>{key.value}</MenuItem>
                                    })}
                                </TextField>
                                <div>

                                    <div >
                                        <TextField
                                            id="standard-select-currency"
                                            label="Condition"
                                            select
                                            name="condition"
                                            value={product.condition}
                                            onChange={changeHandler}
                                            required={true}
                                            fullWidth={true}
                                            className="mb-3 mr-1 col-lg-5 col-md-5 col-sm-12"
                                            helperText={<small className="sText">{inputErrors.condition ? inputErrors.condition.status ? inputErrors.condition.value : null : null}</small>}
                                        >
                                            {Conditions.map((key, index) => {
                                                if (key.id === 0) return null
                                                else return <MenuItem value={key.id}>{key.value}</MenuItem>
                                            })}
                                        </TextField>


                                        <TextField
                                            id="standard-name-input"
                                            label="Quantity"
                                            name="quantity"
                                            value={product.quantity}
                                            onChange={changeHandler}
                                            required={true}
                                            className="mb-3 mr-1 col-lg-5 col-md-5 col-sm-12"
                                            helperText={<small className="sText">{inputErrors.quantity ? inputErrors.quantity.status ? inputErrors.quantity.value : null : null}</small>}
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            id="standard-select-currency"
                                            label="Select Color"
                                            select
                                            name="color"
                                            value={product.color}
                                            onChange={changeHandler}
                                            required={true}
                                            fullWidth={true}
                                            className="mb-3 mr-1 col-lg-5 col-md-5 col-sm-12"
                                            helperText={<small className="sText">{inputErrors.color ? inputErrors.color.status ? inputErrors.color.value : null : null}</small>}
                                        >
                                            {Colors.map((key, index) => {
                                                if (key.id === 0) return null
                                                else return <MenuItem value={key.id}>{key.value}</MenuItem>
                                            })}
                                        </TextField>


                                        <TextField
                                            id="standard-name-input"
                                            label="Price"
                                            name="price"
                                            value={product.price}
                                            onChange={changeHandler}
                                            required={true}
                                            className="mb-5 mr-1 col-lg-5 col-md-5 col-sm-12"
                                            helperText={<small className="sText">{inputErrors.price ? inputErrors.price.status ? inputErrors.price.value : null : null}</small>}
                                        />
                                    </div>
                                </div>
                            </form>

                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                name="description"
                                value={product.description}
                                onChange={changeHandler}
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                variant="outlined"
                                className="mb-3 col-lg-12 col-md-12 col-sm-12"
                                fullWidth={true}
                                helperText={<small className="sText">{inputErrors.description ? inputErrors.description.status ? inputErrors.description.value : null : null}</small>}
                            />
                            <small className="sText float-left">You have used {product.description ? product.description.length : null}</small>
                        </div>
                    </div>
                </Fade>



                <Fade cascade delay={100}>
                    <div className=" boxRight">
                        <div >
                            <div className="d-flex justify-content-around mb-2">
                                <ImageCard id={"0"} image={product.images ? product.images[0] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"1"} image={product.images ? product.images[1] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"2"} image={product.images ? product.images[2] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                            </div>
                            <div className="d-flex justify-content-around mt-4">
                                <ImageCard id={"3"} image={product.images ? product.images[3] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"4"} image={product.images ? product.images[4] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"5"} image={product.images ? product.images[5] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                            </div>
                        </div>
                        {edit ?
                            <div style={{ marginTop: "60px" }}>
                                <button className="myOrabgeButton-lg" onClick={showAlertBox}>Update</button>
                                <button className="myRedButton-lg ml-2" onClick={cancelHandler}>Cancel</button>
                            </div>
                            :
                            <div style={{ marginTop: "60px" }}>
                                <button className="myBlueButton-lg" type="submit" onClick={submitHandler}>Submit</button>
                                <button className="myRedButton-lg ml-2" onClick={cancelHandler}>Cancel</button>
                            </div>}
                        <small className="sText">{inputErrors.form ? inputErrors.form.status ? inputErrors.form.value : null : null}</small>

                    </div>
                </Fade>
            </div>
        </div>

    );
}

export default SellDetails;