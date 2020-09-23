import React, { useState, useEffect, useContext } from "react";
import LastSeen from "./lastseen";
import GET from "../lib/get";
import SlideShow from "../buy/slideShow";
import "../styles/main.css";
import LatestProducts from "./latestProducts";
import ProductDetails from "../buy/productDetails";
import MyFooter from "../footer/footer";
import { GlobalContextContext } from "../Context/contextApi";
import axios from "axios";

const Home = (props) => {
  const [profile, setProfile] = useContext(GlobalContextContext);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [lastSeenProducts, setLastSeenProducts] = useState([]);
  const [favToPass, setFavToPass] = useState([]);
  const setTargetProduct = (id) => {
    setShowModal(true);
    setProductId(id);
  };

  const handleClose = () => {
    setShowModal(false);
    getFavorities();
  };
  const unAuthenticated = () =>
    setProfile({
      ...profile,
      auth: false,
      userId: false,
      favorities: [],
      name: false,
      admin: false,
    });
  const getFavorities = async () => {
    if (!localStorage.getItem("c2c-token")) return;
    let response = await GET(
      `${process.env.REACT_APP_DB_HOST}/api/account/getfavoritelist`
    );
    if (response.data.status === "success")
      setProfile({ ...profile, favorities: response.data.favourities });
  };
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
    else props.history.push("/");
  }, []);

  const getLastSeen = async () => {
    let response = await GET(
      `${process.env.REACT_APP_DB_HOST}/api/account/lastseen`
    );
    if (response.data.status === "success")
      setLastSeenProducts(response.data.data);
    else {
      localStorage.removeItem("c2c-token");
      localStorage.removeItem("c2c-profile");
      unAuthenticated();
    }
  };

  const favoritHandler = async () => {
    let response = await GET(
      `${process.env.REACT_APP_DB_HOST}/api/account/getfavoritelist`
    );
    if (response.data.status === "success")
      setProfile({ ...profile, favorities: response.data.favourities });
  };

  return (
    <div>
      {showModal ? (
        <ProductDetails
          showModel={showModal}
          handleClose={handleClose}
          getLastSeen={getLastSeen}
          id={productId}
          {...props}
        />
      ) : (
        <div>
          <div className="fixedBackground">
            <div className="container">
              <h1>
                WelcomE To <span className="c">C</span>-To-
                <span className="c">C</span> OnlinE ShoP
              </h1>
              <h3>With Us - Take The BesT</h3>
            </div>
          </div>

          <div className="homeCard">
            <div className="leftCard">
              <LatestProducts
                setTargetProduct={setTargetProduct}
                favorit={profile.favorities}
                favoritHandler={favoritHandler}
              />
            </div>

            <div className="rightCard">
              <LastSeen
                auth={profile.auth}
                setTargetProduct={setTargetProduct}
                favorit={profile.favorities}
                favoritHandler={favoritHandler}
                unAuthenticated={unAuthenticated}
                lastSeenProducts={lastSeenProducts}
                getLastSeen={getLastSeen}
              />
            </div>
          </div>

          <div className="homeBanner"></div>

          <div className="darkWhite p-5">
            <h2 className="mb-5"> See What We Have In Categories</h2>
            <div className="container">
              <SlideShow />
            </div>
          </div>

          <MyFooter />
        </div>
      )}
    </div>
  );
};
export default Home;
