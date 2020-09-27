import React, { useState } from "react";
import SellItems from "../../sell/sellitems";
import axios from "axios";

function EditProduct(props) {
  const id = props.match.params.id;

  const editHandler = async (product, oldImages, newImages) => {
    let blob = await fetch("/avatars/a1589803503629.jpeg").then((r) =>
      r.blob()
    );
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("c2c-token"),
        "Content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();

    if (newImages.length > 0) {
      newImages.forEach((value) => {
        if (
          value.image.type === "image/jpeg" ||
          value.image.type === "image/png"
        )
          formData.append("images", value.image, value.id);
      });
    }

    Object.keys(product).forEach((key) => {
      if (key === "creator") formData.append(key, id);
      else formData.append(key, product[key]);
    });
    formData.append(
      "oldImages",
      JSON.stringify(oldImages.map((data) => data.image))
    );

    axios
      .post(
        `${process.env.REACT_APP_DB_HOST}/api/uploads/editproduct`,
        formData,
        config
      )
      .then((res) => {
        if (res.data.status === "success") {
          props.history.push({ pathname: "/account", mykey: "activities" });
        }
      })
      .catch((err) => err);
  };

  return (
    <div>
      <SellItems id={id} {...props} editHandler={editHandler} />
    </div>
  );
}

export default EditProduct;
