import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import NoImage from "../../images/noimage.png";

import "../styles/main.css";

const ImageCard = (props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(props.image);
  }, []);

  const fileSelectedHandler = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setImage(reader.result);
    };
    props.imageChangeHandler({ image: e.target.files[0], id: e.target.id });
  };
  const inputHandler = (e) => {
    document.getElementById(props.id).click();
  };

  return (
    <div
      className="boxes m-1"
      style={{
        backgroundImage: `url(${
          image ? image : props.image ? `${props.image}` : NoImage
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ height: "70%", width: "100%" }}>
        <Form.File
          style={{ height: "100%", width: "100%" }}
          id="formcheck-api-custom"
          custom
        >
          <Form.File.Input
            id={props.id}
            style={{ display: "none" }}
            name="imageFiles"
            onChange={fileSelectedHandler}
          />
        </Form.File>
      </div>
      <div className="text-center" name="button holder">
        <button
          className={
            props.image
              ? "myRedCircleButton fa fa-pencil"
              : "myRedCircleButton fa fa-plus"
          }
          onClick={inputHandler}
          type="button"
        />
      </div>
    </div>
  );
};
export default ImageCard;
