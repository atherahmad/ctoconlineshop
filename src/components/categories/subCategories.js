import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../lib/categories";
import "../styles/main.css";
import SearchBar from "../searchBar/searchbar";
import FilterBar from "../filterBar/filterBar";
import Products from "../buy/products";
import GET from "../lib/get";
import ProductDetails from "../buy/productDetails";

function SubCategories(props) {
  const type = props.match.params.type;
  const title = Categories.filter((data) => data.linkName === type)[0].value;
  const categoryName = Categories.filter((data) => data.linkName === type)[0]
    .id;

  const [products, setProducts] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState("");
  const [showMainComponent, setShowMainComponents] = useState(true);
  const [favorit, setFavorit] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DB_HOST}/api/buy/categories/${categoryName}`
      )
      .then((res) => {
        if (res.data.success) setProducts(res.data.products);
      })
      .catch((err) => err);
  }, []);

  const searchHandler = (text, category) => {
    setFilteredProducts(false);
    if (!text)
      axios
        .get(
          `${process.env.REACT_APP_DB_HOST}/api/buy/categories/${category}`,
          {
            params: {
              text: text,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setProducts(res.data.products);
          }
        })
        .catch((err) => err);
    else
      axios
        .get(
          `${process.env.REACT_APP_DB_HOST}/api/buy/categoriessearch/${category}`,
          {
            params: {
              text: text,
            },
          }
        )
        .then((res) => {
          if (res.data.success) setProducts(res.data.products);
        })
        .catch((err) => err);
  };

  const favoritHandler = async () => {
    let response = await GET(
      `${process.env.REACT_APP_DB_HOST}/api/account/getfavoritelist`
    );
    if (response.data.status === "success")
      setFavorit(response.data.favourities);
  };
  const filterHandler = (e) => {
    e.preventDefault();
    let colorValue = parseInt(e.target.color.value);
    let conditionValue = parseInt(e.target.condition.value);
    let priceValue = parseInt(e.target.price.value);
    setFilteredProducts(
      products
        .filter((product) => {
          if (colorValue !== 0) return product.color === colorValue;
          else return true;
        })
        .filter((product) => {
          if (conditionValue !== 0) return product.condition === conditionValue;
          else return true;
        })
        .filter((product) => {
          if (priceValue !== 0) return product.priceRange === priceValue;
          else return true;
        })
    );
  };

  const setTargetProduct = (id) => {
    setShowMainComponents(false);
    setShowModal(true);
    setProductId(id);
  };

  return (
    <div>
      {showMainComponent ? (
        <>
          <div className="container">
            <div className="active-message-head"></div>
            <div className="active-message-text">
              <h1>{title}</h1>
            </div>
          </div>
          <SearchBar
            category={props.history.location.id}
            products={filteredProducts ? filteredProducts : products}
            {...props}
            searchHandler={searchHandler}
          />
          <FilterBar filterHandler={filterHandler} />

          <div className=" ">
            <Products
              products={filteredProducts ? filteredProducts : products}
              setTargetProduct={setTargetProduct}
              favorit={favorit}
              favoritHandler={favoritHandler}
            />
          </div>
        </>
      ) : null}
      {showModal ? (
        <ProductDetails
          showModel={showModal}
          handleClose={() => {
            setShowModal(false);
            setShowMainComponents(true);
          }}
          id={productId}
          {...props}
        />
      ) : null}
    </div>
  );
}

export default SubCategories;
