import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../App.css";
import { POST } from "../lib/post";
import Errors from "../lib/errors";
import "./style.css";
import SignupForm from "./signupForm";
import GET from "../lib/get";
import { GlobalContextContext } from "../Context/contextApi";
import AlertBox from "../AlertBox/alertBox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function MaterialSignup(props) {
  const [profile, setProfile] = useContext(GlobalContextContext);
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  let [inputErrors, setInputErrors] = useState("");
  const formData = { firstName, lastName, email, pass };
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("c2c-token")) {
      const getData = async () => {
        let response = await GET(
          `${process.env.REACT_APP_DB_HOST}/api/auth/authenticated`
        );

        if (response.data.status === "success") {
          setProfile({
            ...profile,
            auth: true,
            userId: response.data.data._id,
            name: response.data.data.firstName,
            favorities: response.data.data.liked,
            email: response.data.data.email,
            admin: response.data.data.admin,
          });

          props.history.push("/dashboard");
        } else {
          localStorage.removeItem("c2c-token");
          localStorage.removeItem("c2c-profile");
        }
      };
      getData();
    }
    setInputErrors(Errors);
  }, []);

  const regexName = new RegExp(/^[a-zA-ZäöüÄÖÜß]*$/);
  const regexEmail = new RegExp(
    /^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
  );

  const changeHandler = (e) => {
    inputErrors = {
      ...inputErrors,
      form: { ...inputErrors.form, status: false },
    };

    switch (e.target.name) {
      case "firstName":
        if (!regexName.test(e.target.value) || e.target.value.length < 3)
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: true },
          });
        else
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: false },
          });

        setFirstName(e.target.value);
        break;
      case "lastName":
        if (!regexName.test(e.target.value) || e.target.value.length < 3)
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: true },
          });
        else
          setInputErrors({
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: false },
          });

        setLastName(e.target.value);
        break;
      case "email":
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

        setEmail(e.target.value);
        break;

      case "pass":
        setPass(e.target.value);

        if (e.target.value.length > 12 || e.target.value.length < 6)
          inputErrors = {
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: true },
          };
        else
          inputErrors = {
            ...inputErrors,
            [e.target.name]: { ...inputErrors[e.target.name], status: false },
          };
        if (e.target.value !== confirmPass && confirmPass !== "")
          inputErrors = {
            ...inputErrors,
            confirmPass: { ...inputErrors.confirmPass, status: true },
          };
        else
          inputErrors = {
            ...inputErrors,
            confirmPass: { ...inputErrors.confirmPass, status: false },
          };
        setInputErrors(inputErrors);
        break;

      case "confirmPass":
        setconfirmPass(e.target.value);

        if (pass !== e.target.value)
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
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!Object.keys(formData).every((key) => formData[key]))
      return setInputErrors({
        ...inputErrors,
        form: { ...inputErrors.form, status: true },
      });
    else
      setInputErrors({
        ...inputErrors,
        form: { ...inputErrors.form, status: false },
      });
    if (pass !== confirmPass)
      return setInputErrors({
        ...inputErrors,
        confirmPass: { ...inputErrors.confirmPass, status: true },
      });

    if (inputErrors.form.status) return;
    else {
      const response = await POST(
        `${process.env.REACT_APP_DB_HOST}/api/auth/signup`,
        formData
      );
      if (response.data.status === "success") setShowAlert(true);
      else if (response.data.status === "failed")
        setInputErrors({
          ...inputErrors,
          backend: {
            ...inputErrors.backend,
            status: true,
            value: response.data.message,
          },
        });
    }
  };
  return (
    <div>
      <SignupForm
        classes={classes}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        firstName={firstName}
        inputErrors={inputErrors}
        email={email}
        lastName={lastName}
        confirmPass={confirmPass}
        pass={pass}
      />
      {showAlert ? (
        <AlertBox
          simpleAlert={true}
          alertBoxTitle={"Successfully Registered"}
          alertBoxBody={
            "We have sent you an email containing confirmation Link, please confirm your email first to login."
          }
          hideAlertBox={() => props.history.push(`/signin`)}
        />
      ) : null}
    </div>
  );
}
