import { get } from "axios";

const CheckAuthentication = async () => {
  if (localStorage.getItem("c2c-token")) {
    const token = localStorage.getItem("c2c-token");
    let response = await get(
      `${process.env.REACT_APP_DB_HOST}/api/auth/authenticated`,
      {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.data.status !== "success") {
          localStorage.removeItem("c2c-token");
          localStorage.removeItem("c2c-profile");
        }
        return res;
      })
      .catch((err) => {
        localStorage.removeItem("c2c-token");
        localStorage.removeItem("c2c-profile");
        return { data: { status: "failed" } };
      });
    return response;
  } else return { data: { status: "failed" } };
};

const IfAuthenticated = async ({ children }) => {
  const token = localStorage.getItem("c2c-token");
  if (token) {
    let response = await get(
      `${process.env.REACT_APP_DB_HOST}/api/auth/authenticated`,
      {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => JSON.parse(res))
      .catch((err) => {
        localStorage.removeItem("c2c-token");
        localStorage.removeItem("c2c-profile");
      });
    console.log("response in authentication", response);
    if (response.data.status === "success") return children;
  }

  return null;
};
const IfNotAuthenticated = async (props) => {
  const token = localStorage.getItem("c2c-token");
  if (token) {
    let response = await get(
      `${process.env.REACT_APP_DB_HOST}/api/auth/authenticated`,
      {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res)
      .catch((err) => {
        localStorage.removeItem("c2c-token");
        localStorage.removeItem("c2c-profile");
      });
    console.log(response);
    return null;
  }
  console.log("accessed not authenticated");
  return props.children;
};

export { IfAuthenticated, IfNotAuthenticated, CheckAuthentication };
