import React, { useContext } from "react";
import { GlobalContextContext } from "../Context/contextApi";
import { useHistory } from "react-router-dom";
import "../styles/main.css";

function AlertBox(props) {
  const history = useHistory();
  const {
    alertBoxTitle,
    alertBoxBody,
    proceedHandler,
    hideAlertBox,
    simpleAlert,
    cancelButtonBody,
  } = props;
  const [profile, setProfile] = useContext(GlobalContextContext);

  const adminHandler = () => {
    if (!localStorage.getItem("c2c-token")) {
      setProfile({
        ...profile,
        auth: false,
        userId: false,
        favorities: [],
        name: null,
        email: false,
        admin: false,
      });
      history.push("/signin");
    } else hideAlertBox();
  };
  return (
    <div className="alertBox ">
      <div className="alertBox-head"></div>
      <div className="alertBox-head-title">{alertBoxTitle}</div>

      <div className="alertBoxBody">
        <p>{alertBoxBody}</p>
      </div>
      {simpleAlert ? (
        <button
          type="button"
          className="myBlueButton-sm"
          onClick={profile.admin ? adminHandler : hideAlertBox}
        >
          Ok
        </button>
      ) : (
        <div className="alertBox-body">
          <button
            type="button"
            className="myBlueButton-sm"
            onClick={proceedHandler}
          >
            Yes{" "}
          </button>

          {cancelButtonBody ? (
            <button
              type="button"
              className="myRedButton-sm ml-1"
              onClick={hideAlertBox}
            >
              {cancelButtonBody}
            </button>
          ) : (
            <button
              type="button"
              className="myRedButton-sm ml-1"
              onClick={hideAlertBox}
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AlertBox;
