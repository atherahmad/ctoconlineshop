import React, { useEffect, useState } from "react";
import Zoom from "react-reveal/Zoom";
import Products from "../../buy/products";
import axios from "axios";

function SoldProducts(props) {
  const { setTargetProduct, favoritHandler, favorit } = props;
  const [soldProducts, setSoldProducts] = useState("");
  useEffect(() => {
    let config;
    if (localStorage.getItem("c2c-token"))
      config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("c2c-token"),
        },
      };
    else props.history.push("/signin");
    axios
      .get(`${process.env.REACT_APP_DB_HOST}/api/account/soldproducts`, config)
      .then((res) => setSoldProducts(res.data.products))
      .catch((err) => err);
  }, []);

  return (
    <Zoom>
      <Products
        products={soldProducts}
        setTargetProduct={setTargetProduct}
        url={`${process.env.REACT_APP_DB_HOST}/api/account/soldproductdetails`}
        favorit={favorit}
        favoritHandler={favoritHandler}
        status="sold"
      />
    </Zoom>
  );
}

export default SoldProducts;
