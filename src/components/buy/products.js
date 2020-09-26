import React, { useContext, useEffect } from "react";
import "../styles/main.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import ItemCard from "../landingpage/itemCard";
import { GlobalContextContext } from "../Context/contextApi";
import axios from "axios";

export default function Products(props) {
  const { favoritHandler, products, setTargetProduct, url, status } = props;
  const [profile, setProfile] = useContext(GlobalContextContext);

  useEffect(() => {
    if (localStorage.getItem("c2c-token"))
      axios
        .get(`${process.env.REACT_APP_DB_HOST}/api/auth/authenticated`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("c2c-token"),
          },
        })
        .then((res) => {
          if (res.data.status === "success")
            setProfile({
              ...profile,
              auth: true,
              userId: res.data.data._id,
              name: res.data.data.firstName,
              favorities: res.data.data.liked,
              email: res.data.data.email,
              admin: res.data.data.admin,
            });
          else {
            props.history.push("/signin");
            setProfile({
              ...profile,
              auth: false,
              userId: false,
              favorities: [],
              name: false,
              email: false,
              admin: false,
            });
          }
        })
        .catch((err) => err);
  }, []);
  return (
    <div className="container">
      <div className="myWrap">
        {products
          ? products.map((product) => (
              <ItemCard
                setTargetProduct={setTargetProduct}
                title={product.title}
                price={product.price}
                id={product._id}
                images={product.images.length > 0 ? product.images[0] : null}
                url={
                  url
                    ? url
                    : `${process.env.REACT_APP_DB_HOST}/api/buy/activeproductdetails`
                }
                favoritHandler={favoritHandler}
                status={status}
              />
            ))
          : null}
      </div>
    </div>
  );
}
