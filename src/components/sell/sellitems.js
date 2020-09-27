import React, { useState, useEffect } from "react";
import { POST, IMGPOST } from "../lib/post";
import FormData from "form-data";
import SellDetails from "./sellDetails";
import SigninModal from "../signin/signinModal/signinModal";
import { makeStyles } from "@material-ui/core/styles";
import PasswordReset from "../signin/resetModal";
import axios from "axios";
import AlertBox from "../AlertBox/alertBox";
import Errors from "../lib/errors";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SellItems = (props) => {
  const { id, editHandler } = props;
  const [images, setImages] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [redirectAlertBox, setRedirectAlertBox] = useState(false);
  const [tempImageArray, setTempImageArray] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    category: "",
    condition: "",
    quantity: "",
    color: "",
    price: "",
    description: "",
  });
  const classes = useStyles();
  const [alertBox, setAlertBox] = useState(false);
  let [inputErrors, setInputErrors] = useState([]);

  const regexNumber = new RegExp(/^[0-9]*$/);
  const regexPrice = new RegExp(/^[0-9]*$/);

  const changeHandler = (e) => {
    inputErrors = {
      ...inputErrors,
      form: { ...inputErrors.form, status: false },
    };

    switch (e.target.name) {
      case "title":
        if (e.target.value.length < 4 || e.target.value.length > 40)
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: true },
          });
        else
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: false },
          });

        break;

      case "quantity":
        if (!regexNumber.test(e.target.value))
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: true },
          });
        else
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: false },
          });

        break;

      case "price":
        if (!regexPrice.test(e.target.value) || e.target.value < 1)
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: true },
          });
        else
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: false },
          });
        break;

      case "description":
        if (e.target.value.length < 10 || e.target.value.length > 200)
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: true },
          });
        else
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: false },
          });
        break;

      default:
        break;
    }
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const proceedHandler = () => {
    editHandler(product, images, tempImageArray);
    setAlertBox(false);
  };
  const hideAlertBox = () => setAlertBox(false);

  const redirectHandler = () => {
    setRedirectAlertBox(false);
    props.history.push({ pathname: "/account", mykey: "activities" });
  };

  const handleOpenReset = () => {
    setShowSignin(false);
    setShowReset(true);
  };
  const handleCloseReset = () => {
    setShowReset(false);
    setShowSignin(true);
  };
  const handleOpen = () => setShowSignin(true);
  const handleClose = () => setShowSignin(false);

  useEffect(() => {
    let previousImages = [];
    if (id)
      axios
        .get(
          `${process.env.REACT_APP_DB_HOST}/api/buy/activeproductdetails/${id}`
        )
        .then((res) => {
          setProduct(res.data.success);
          for (let i = 0; i < res.data.success.images.length; i++) {
            previousImages.push({
              id: `${i}`,
              image: res.data.success.images[i],
            });
          }
          setImages([...previousImages]);
          setEdit(true);
          setTempImageArray(previousImages);
        })
        .catch((err) => err);
    setInputErrors(Errors);
  }, []);

  const showAlertBox = () => {
    if (!Object.keys(product).every((key) => product[key]))
      return setInputErrors({
        ...inputErrors,
        form: { ...inputErrors.form, status: true },
      });
    else
      setInputErrors({
        ...inputErrors,
        form: { ...inputErrors.form, status: false },
      });

    if (
      Object.keys(product)
        .filter((item) => {
          if (item === "_id" || item === "creator" || item === "images")
            return false;
          else return true;
        })
        .map((key) => inputErrors[key].status)
        .includes(true)
    )
      return;

    setAlertBox(true);
  };

  const imageChangeHandler = (newImage) => {
    if (tempImageArray.length === 0) tempImageArray.push(newImage);
    else {
      let index = tempImageArray.findIndex((data) => data.id === newImage.id);
      if (index === -1) tempImageArray.push(newImage);
      else tempImageArray[index] = newImage;
    }
  };

  const submitHandler = async () => {
    if (redirectAlertBox) return;

    if (!Object.keys(product).every((key) => product[key]))
      return setInputErrors({
        ...inputErrors,
        form: { ...inputErrors.form, status: true },
      });
    else
      setInputErrors({
        ...inputErrors,
        form: { ...inputErrors.form, status: false },
      });

    if (
      Object.keys(product)
        .map((key) => inputErrors[key].status)
        .includes(true)
    )
      return;

    if (!localStorage.getItem("c2c-token")) return handleOpen();

    if (showSignin) handleClose();
    let config;
    if (tempImageArray.length > 0) {
      const formData = new FormData();
      let imagesArray = tempImageArray.map((value) => value.image);
      imagesArray.forEach((value) => formData.append("images", value));
      Object.keys(product).forEach((key) => formData.append(key, product[key]));
      config = {
        headers: {
          "x-auth-token": localStorage.getItem("c2c-token"),
          "Content-type": "multipart/form-data",
        },
      };

      const response = await IMGPOST(
        `${process.env.REACT_APP_DB_HOST}/api/uploads/newproduct`,
        formData,
        config
      );
      if (response.data && response.data.status === "success") {
        setRedirectAlertBox(true);
        //props.history.push({pathname:"/account",mykey:"activities"})
      }
    } else {
      config = {
        headers: {
          "x-auth-token": localStorage.getItem("c2c-token"),
          "Content-Type": "application/json",
        },
      };
      const response = await POST(
        `${process.env.REACT_APP_DB_HOST}/api/uploads/newproduct`,
        product,
        config
      );
      if (response.data && response.data.status === "success") {
        setRedirectAlertBox(true);
        //
      }
    }
  };

  return (
    <div>
      <SellDetails
        {...props}
        imageChangeHandler={imageChangeHandler}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        product={product}
        edit={edit}
        showAlertBox={showAlertBox}
        inputErrors={inputErrors}
      />

      {showSignin ? (
        <SigninModal
          handleClose={handleClose}
          show={showSignin}
          classes={classes}
          handleCloseReset={handleCloseReset}
          handleOpenReset={handleOpenReset}
          showReset={showReset}
          productSubmitHandler={submitHandler}
          erros={inputErrors}
        />
      ) : null}
      {showReset ? (
        <PasswordReset
          handleClose={handleCloseReset}
          handleOpen={handleOpenReset}
          show={showReset}
          classes={classes}
        />
      ) : null}

      {alertBox ? (
        <AlertBox
          alertBoxTitle="Update!"
          alertBoxBody="Are you sure to update your product?"
          hideAlertBox={hideAlertBox}
          proceedHandler={proceedHandler}
        />
      ) : null}
      {redirectAlertBox ? (
        <AlertBox
          simpleAlert={true}
          alertBoxTitle={"Congratulation!"}
          alertBoxBody={"You have successfully uploaded your product."}
          hideAlertBox={redirectHandler}
        />
      ) : null}
    </div>
  );
};

export default SellItems;
