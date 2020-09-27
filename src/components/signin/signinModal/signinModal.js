import React, { useState, useContext } from "react";
import { POST } from "../../lib/post";
import SigninForm from "./signinForm";
import "../../styles/main.css";
import axios from "axios";
import { GlobalContextContext } from "../../Context/contextApi";

export default function SigninModal(props) {
  const { handleClose, show, classes, productSubmitHandler } = props;
  const regexEmail = new RegExp(
    /^([a-zA-Z0-9_\-.äöüÄÖÜß_]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
  );
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState("");
  const [profile, setProfile] = useContext(GlobalContextContext);

  const changeHandler = (e) => {
    setErrors({ ...errors, form: { ...errors.form, status: false } });
    switch (e.target.name) {
      case "email":
        if (!regexEmail.test(e.target.value))
          setErrors({
            ...errors,
            [e.target.name]: { ...errors[e.target.name], status: true },
          });
        else
          setErrors({
            ...errors,
            [e.target.name]: { ...errors[e.target.name], status: false },
          });
        setEmail(e.target.value);
        break;
      case "pass":
        setPass(e.target.value);
        break;
      default:
        break;
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (errors.email.status) return ;
    if (email === "" || pass === "")
      return setErrors({ ...errors, form: { ...errors.form, status: true } });

    if (errors.form.status) return ;
    else {
      const formData = {
        email: email,
        pass: pass,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await POST(
        `${process.env.REACT_APP_DB_HOST}/api/auth/signin`,
        formData,
        config
      );
      if (response.data.status === "success") {
        localStorage.setItem("c2c-token", response.data.token);
        localStorage.setItem("c2c-profile", JSON.stringify(response.data.data));
        axios.defaults.headers["x-auth-token"] = response.data.token;
        setProfile({
          ...profile,
          auth: true,
          userId: response.data.data.id,
          favorities: response.data.data.liked,
          name: response.data.data.firstName,
          email: response.data.data.email,
          admin: response.data.data.admin,
        });
        productSubmitHandler();
      } else
        setErrors({
          ...errors,
          authentication: { ...errors.authentication, status: true },
        });
    }
  };
  return (
    <div>
      <SigninForm
        {...props}
        classes={classes}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        email={email}
        errors={errors}
        pass={pass}
        handleClose={handleClose}
        show={show}
      />
    </div>
  );
}
