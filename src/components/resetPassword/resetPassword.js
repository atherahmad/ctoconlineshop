import React, { useState, useEffect } from "react";

import { POST } from "../lib/post";
import Errors from "../lib/errors";

import "../signin/style.css";
import ResetForm from "./resetForm";
import MyAlert from "../lib/alert";

export default function ResetPassword(props) {
  const [pass, setPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  let [inputErrors, setInputErrors] = useState("");

  const [alertId, setAlertId] = useState("");
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const verifyParams = async () => {
      const { id, token } = props.match.params;
      console.log("id ", id, " token ", token);
      const formData = {
        id,
        token,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await POST(
        `${process.env.REACT_APP_DB_HOST}/api/recovery/resetcheck`,
        formData,
        config
      );
      if (response.data.status !== "success") props.history.push("/");
      if (response.data.status === "success")
        localStorage.setItem("c2creset-token", response.data.token);
    };
    verifyParams();
    setInputErrors(Errors);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { id } = props.match.params;
    const formData = {
      pass: pass,
      confirmPass: confirmPass,
    };

    // else setErrors({ ...errors, authentication: { ...errors.authentication, status: true } })
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
    if (!localStorage.getItem("c2creset-token")) return props.push.history("/");
    else {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("c2creset-token"),
          "Content-Type": "application/json",
        },
      };
      const response = await POST(
        `${process.env.REACT_APP_DB_HOST}/api/recovery/resetpass/${id}`,
        formData,
        config
      );
      if (response.data.status === "success") {
        // alert("you have succesfully changed your password")
        setAlertId("A");
        setAlertText("you have succesfully changed your password");
        setShowAlert(true);

        localStorage.removeItem("c2creset-token");
        localStorage.removeItem("c2c-profile");
        props.history.push("/signin");
      } else if (response.data.status === "failed") {
        setInputErrors({
          ...inputErrors,
          backend: {
            ...inputErrors.backend,
            status: true,
            value: response.data.message,
          },
        });
        // alert("sorry request failedn try again later")
        setAlertId("B");
        setAlertText("Sorry request failedn try again later");
        setShowAlert(true);
      }
    }
  };

  const changeHandler = (e) => {
    inputErrors = {
      ...inputErrors,
      form: { ...inputErrors.form, status: false },
    };

    switch (e.target.name) {
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

  return (
    <div>
      <div className="App-header bg-full ">
        <ResetForm
          submitHandler={submitHandler}
          pass={pass}
          changeHandler={changeHandler}
          inputErrors={inputErrors}
          confirmPass={confirmPass}
        />
      </div>
      {showAlert ? <MyAlert id={alertId} alertText={alertText} /> : null}
    </div>
  );
}
