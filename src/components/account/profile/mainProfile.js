import React, { useState, useEffect } from "react";
import "./../styles.css";
import GET from "../../lib/get";
import FormData from "form-data";
import { IMGPOST, POST } from "../../lib/post";
import ProfileData from "./profile";
import AlertBox from "../../AlertBox/alertBox";
import PasswordChange from "./changepassword";
import Errors from "../../lib/errors";

const MyProfile = (props) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    paypalId: "",
    phoneNumber: "",
    profileImage: "",
    street: "",
    city: "",
    zipCode: "",
  });
  const [avatarChanged, setAvatarChange] = useState(false);
  const [editAble, setEditAble] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [alertBoxTitle, setAlertBoxTitle] = useState("");
  const [alertBoxBody, setAlertBoxBody] = useState("");
  const [passChanged, setPassChanged] = useState(false);
  const [inputErrors, setInputErrors] = useState("");

  const regexAlphabet = new RegExp(/^[a-zA-ZäöüÄÖÜß]*$/);
  const regexNumber = new RegExp(/^[0-9]*$/);
  const regexAlphaNumber = new RegExp(/[a-zA-Z0-9äöüÄÖÜß]/);
  const regexEmail = new RegExp(
    /^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
  );

  useEffect(() => {
    const getData = async () => {
      let response = await GET(
        `${process.env.REACT_APP_DB_HOST}/api/account/profile`
      );

      if (response.data) {
        if (response.data.status === "success") setProfile(response.data.data);
      } else {
        localStorage.removeItem("c2c-token");
        localStorage.removeItem("c2c-profile");
        props.history.push("/signin");
      }
    };
    setInputErrors(Errors);

    if (localStorage.getItem("c2c-token")) getData();
    else props.history.push("/signin");
  }, []);

  const changeAlertBoxTitle = (title) => setAlertBoxTitle(title);
  const changeAlertBoxBody = (body) => setAlertBoxBody(body);
  const passChangedHandler = () => setPassChanged(true);
  const editEnabler = () => setEditAble(true);
  const editDisabler = () => setEditAble(false);
  const renderModal = () => setShowModal(true);
  const derenderModal = () => setShowModal(false);

  const hideAlertBox = () => {
    setShowAlertBox(false);
    if (passChanged) props.history.push("/signin");
  };
  const changeHandler = (e) => {
    setInputErrors({
      ...inputErrors,
      form: { ...inputErrors.form, status: false },
    });
    switch (e.target.name) {
      case "firstName":
        if (!regexAlphabet.test(e.target.value) || e.target.value.length < 3)
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

      case "lastName":
        if (!regexAlphabet.test(e.target.value) || e.target.value.length < 3)
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

      case "paypalId":
        if (!regexEmail.test(e.target.value))
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

      case "city":
        if (!regexAlphabet.test(e.target.value) || e.target.value.length < 3)
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

      case "phoneNumber":
        if (!regexNumber.test(e.target.value) || e.target.value.length < 9)
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

      case "street":
        if (!regexAlphaNumber.test(e.target.value) || e.target.value.length < 5)
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

      case "zipCode":
        if (
          !regexNumber.test(e.target.value) ||
          e.target.value.length < 3 ||
          e.target.value.length > 7
        )
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

    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const imageChangeHandler = (image) => {
    setProfile({ ...profile, profileImage: image.image });
    setAvatarChange(true);
  };

  const submitHandler = async (e) => {
    console.log("submit handler called");
    e.preventDefault();
    if (
      !Object.keys(profile).every((key) => {
        if (key === "paypalId") return true;
        else return profile[key];
      })
    )
      return setInputErrors({
        ...inputErrors,
        form: { ...inputErrors.form, status: true },
      });
    else
      setInputErrors({
        ...inputErrors,
        form: { ...inputErrors.form, status: false },
      });

    if (profile.paypalId === "") {
      setInputErrors({
        ...inputErrors,
        paypalId: { ...inputErrors.form, status: false },
      });
      if (
        Object.keys(profile)
          .filter((e) => {
            if (e === "paypalId" || e === "profileImage") return false;
            else return true;
          })
          .map((key) => inputErrors[key].status)
          .includes(true)
      )
        return;
    } else if (
      Object.keys(profile)
        .filter((e) => {
          if (e === "profileImage") return false;
          else return true;
        })
        .map((key) => inputErrors[key].status)
        .includes(true)
    )
      return;

    if (avatarChanged) {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("c2c-token"),
          "Content-type": "application/json",
        },
      };

      const formData = new FormData();
      formData.append("file", profile.profileImage);
      Object.keys(profile).forEach((key) => {
        if (key !== "profileImage") formData.append(key, profile[key]);
      });
      let response = await IMGPOST(
        `${process.env.REACT_APP_DB_HOST}/api/uploads/profile`,
        formData,
        config
      );

      if (response.data && response.data.status === "success") {
        setShowAlertBox(true);
        changeAlertBoxTitle("Profile updated");
        changeAlertBoxBody("You have successfully updated your profile.");
        setShowAlertBox(true);
        setEditAble(false);
        setAvatarChange(false);
      } else {
        changeAlertBoxTitle("Request failed");
        changeAlertBoxBody("Please correct the inputs.");
        setShowAlertBox(true);
        setEditAble(false);
      }
    } else {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("c2c-token"),
          "Content-Type": "application/json",
        },
      };
      let response = await POST(
        `${process.env.REACT_APP_DB_HOST}/api/account/profile`,
        profile,
        config
      );
      if (response.data && response.data.status === "success") {
        changeAlertBoxTitle("Profile updated");
        changeAlertBoxBody("You have successfully updated your profile.");
        setShowAlertBox(true);
        setEditAble(false);
      } else {
        changeAlertBoxTitle("Request failed");
        changeAlertBoxBody("Please correct the inputs.");
        setShowAlertBox(true);
        setEditAble(false);
      }
    }
  };
  return (
    <div className="mainProfile">
      <ProfileData
        submitHandler={submitHandler}
        imageChangeHandler={imageChangeHandler}
        changeHandler={changeHandler}
        editDisabler={editDisabler}
        editEnabler={editEnabler}
        profile={profile}
        editAble={editAble}
        renderModal={renderModal}
        errors={inputErrors}
        {...props}
      />

      {showAlertBox ? (
        <AlertBox
          simpleAlert={true}
          alertBoxTitle={alertBoxTitle}
          alertBoxBody={alertBoxBody}
          hideAlertBox={hideAlertBox}
        />
      ) : null}
      {showModal ? (
        <PasswordChange
          showModal={showModal}
          derenderModal={derenderModal}
          changeAlertBoxTitle={changeAlertBoxTitle}
          changeAlertBoxBody={changeAlertBoxBody}
          passChangedHandler={passChangedHandler}
          {...props}
          showAlertBox={() => setShowAlertBox(true)}
          editDisabler={editDisabler}
        />
      ) : null}
    </div>
  );
};

export default MyProfile;
