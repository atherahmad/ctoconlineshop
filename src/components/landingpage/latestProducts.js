import React, { useState, useEffect } from "react";
import Products from "../buy/products";
import { Link } from "react-router-dom";

import GET from "../lib/get";

const LatestProduct = (props) => {
  const [latestProducts, setLatestProducts] = useState([]);
  const { favorit, favoritHandler } = props;

  useEffect(() => {
    const getData = async () => {
      let response = await GET(
        `${process.env.REACT_APP_DB_HOST}/api/buy/latestprdoucts`
      );
      if (response.data.status === "success")
        setLatestProducts(response.data.data);
    };
    getData();
  }, []);

  return (
    <div className="popProBox">
      <div className="popProBox-content ">
        <h2>Latest Product</h2>
        <div className="popProBox-cards row ">
          <Products
            products={latestProducts}
            setTargetProduct={props.setTargetProduct}
            favorit={favorit}
            favoritHandler={favoritHandler}
          />
        </div>
        <Link to="/buyitems">
          <button className="btn">More Products >></button>
        </Link>
      </div>
    </div>
  );
};

export default LatestProduct;
