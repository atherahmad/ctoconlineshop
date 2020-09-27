import React, { useState, useEffect, useContext } from "react";
import "../styles/main.css";
import GET from "../lib/get";
import { GlobalContextContext } from "../Context/contextApi";
import UserNavbar from "./userNavebar";
import AdminNavbar from "./adminNavbar";

const MyNavbar = (props) => {
  const [profile, setProfile] = useContext(GlobalContextContext);
  const logoutHandler = () => {
    localStorage.removeItem("c2c-token");
    localStorage.removeItem("c2c-profile");
    setProfile({
      ...profile,
      auth: false,
      userId: false,
      favorities: [],
      name: false,
      email: false,
      admin: false,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("c2c-token")) {
      const getData = async () => {
        let response = await GET(
          `${process.env.REACT_APP_DB_HOST}/api/auth/authenticated`
        );
        if (response.data) {
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
          }
        } else {
          setProfile({
            ...profile,
            auth: false,
            userId: false,
            favorities: [],
            name: false,
            email: false,
            admin: false,
          });
          localStorage.removeItem("c2c-token");
          localStorage.removeItem("c2c-profile");
        }
      };
      getData();
    } else
      setProfile({
        ...profile,
        auth: false,
        userId: false,
        favorities: [],
        name: false,
        email: false,
        admin: false,
      });
  }, []);

  return (
    <div>
      {!profile.admin ? (
        <UserNavbar profile={profile} logoutHandler={logoutHandler} />
      ) : (
        <AdminNavbar profile={profile} logoutHandler={logoutHandler} />
      )}
    </div>
  );
};
export default MyNavbar;
