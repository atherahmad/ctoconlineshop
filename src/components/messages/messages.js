import React, { useState, useEffect } from "react";
import AllConversations from "./allConversations";
import ActiveConversation from "./activeConversation";
import { CheckAuthentication } from "../lib/auth";
import GET from "../lib/get";
import axios from "axios";

const Messages = (props) => {
  const [conversationId, setConversationId] = useState("");
  const [showConversation, setShowConversation] = useState(false);
  const [recipentName, setRecipentName] = useState("testing");
  const [selectedArray, setSelectedArray] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);

  let targetArray = [];
  useEffect(() => {
    if (!localStorage.getItem("c2c-token"))
      return props.history.push("/signin");
    getMessages();
  }, []);
  const getMessages = async () => {
    axios
      .get(`${process.env.REACT_APP_DB_HOST}/api/messages/messageslist`, {
        headers: {
          "x-auth-token": localStorage.getItem("c2c-token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.status === "success") setConversations(res.data.data);
        else {
          localStorage.removeItem("c2c-token");
          localStorage.removeItem("c2c-profile");
          props.history.push("/signin");
        }
      })
      .catch((err) => err);
  };

  const setTargetConversation = (id) => setConversationId(id);
  const setConversationRecipent = (name) => setRecipentName(name);
  const showPopUp = () => setShowConversation(true);
  const hidePopUp = () => setShowConversation(false);
  const deleteHandler = () => {
    if (selectedArray.length < 1) return ;
    axios
      .post(
        `${process.env.REACT_APP_DB_HOST}/api/messages/deletemessages`,
        { selectedArray },
        {
          headers: {
            "x-auth-token": localStorage.getItem("c2c-token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) getMessages();
      })
      .catch((err) => props.history.push("/signin"));
  };

  const selectOneHandler = (id) => {
    setDeleteAll(false);
    let index = selectedArray.indexOf(id);
    let tempArray = [...selectedArray];

    if (index === -1) {
      tempArray.push(id);
      setSelectedArray(tempArray);
    } else {
      targetArray = [...selectedArray.filter((value) => value !== id)];
      setSelectedArray(targetArray);
    }
  };
  const selectAllHandler = (e) => {
    if (!e.target.checked) {
      setSelectedArray([]);
      setDeleteAll(false);
    } else {
      setSelectedArray(conversations.map((data) => data._id));
      setDeleteAll(true);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <AllConversations
          showPopUp={showPopUp}
          setTargetConversation={setTargetConversation}
          setConversationRecipent={setConversationRecipent}
          deleteHandler={deleteHandler}
          selectAllHandler={selectAllHandler}
          selectOneHandler={selectOneHandler}
          conversations={conversations}
          selectedArray={selectedArray}
          {...props}
        />
      </div>

      {showConversation ? (
        <ActiveConversation
          hidePopUp={hidePopUp}
          conversationId={conversationId}
          {...props}
          recipentName={recipentName}
        />
      ) : null}
      <div></div>
    </div>
  );
};
export default Messages;
