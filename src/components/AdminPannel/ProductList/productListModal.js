import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/main.css";
import NoImage from "../../../images/noimage.png";

function ProductListModal({ closeHandler, productId, getProducts }) {
  const [product, setProduct] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DB_HOST}/api/admin/productdetails/${productId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("c2c-token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.success);
          setImages(res.data.success.images);
        }
      })
      .catch((err) => err);
  }, []);

  const updateHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_DB_HOST}/api/admin/blockproduct`,
        { id: productId },
        {
          headers: {
            "x-auth-token": localStorage.getItem("c2c-token"),
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        if (res.data.success) {
          getProducts("activeproducts");
          closeHandler();
        }
      })
      .catch((err) => err);
  };

  return (
    <div className="adminRedBox">
      <div className="adminRedBox-head"></div>
      <div className="active-message-text">
        <h1>{product.title}</h1>
      </div>
      <div style={{ height: "200px" }}>
        {images.length > 0 ? (
          images.map((key) => (
            <img
              width="180px"
              height="200px"
              className="modalImageShadow"
              src={`${key}`}
              alt="No Image"
            />
          ))
        ) : (
          <img
            width="180px"
            height="200px"
            className="modalImageShadow"
            src={NoImage}
            alt="No Image"
          />
        )}
      </div>

      <div className="adminPopupContent">
        <div className="bg-gray m-1">
          <strong>Product-ID:</strong> {product.refId}
        </div>
        <div className="bg-gray m-1">
          <strong>Creator-ID:</strong> {product.creator}
        </div>

        <div className="bg-gray m-1">
          <strong>Price:</strong> {product.price} €
        </div>
        <div className="bg-gray m-1 mb-2">
          {product.blocked ? (
            <input
              id="exampleCheck1"
              type="checkbox"
              className="form-check-input"
              checked={true}
              disabled={true}
            />
          ) : product.active ? (
            <input
              id="exampleCheck2"
              type="checkbox"
              className="form-check-input"
              onChange={() => {
                setShowUpdate(true);
              }}
            />
          ) : (
            <input
              id="exampleCheck2"
              type="checkbox"
              className="form-check-input"
              disabled={true}
            />
          )}

          <strong>Block It.</strong>
        </div>
      </div>

      <div className="bg-gray mb-5">
        <strong>Description:</strong> <br /> {product.description}
      </div>

      <button
        style={{ float: "center" }}
        onClick={closeHandler}
        className="myRedButton-lg m-1"
      >
        Close
      </button>
      {showUpdate ? (
        <button
          style={{ float: "center" }}
          onClick={updateHandler}
          className="myOrabgeButton-lg m-1"
        >
          Update
        </button>
      ) : null}
    </div>
  );
}

export default ProductListModal;
