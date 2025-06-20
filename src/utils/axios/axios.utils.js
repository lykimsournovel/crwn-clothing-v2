import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseUrl: process.env.REACT_APP_BASH_URL,
});

api.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (error.response.data.message === "refresh_token_expired") {
        removeAllTokenAndCookiesThenLogOut();
      } else {
        console.log(originalRequest);
        originalRequest._retry = true;
        try {
          const authToken = await refreshUserToken("users/token");
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${authToken.token}`;
          return api(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshUserToken = async (apiUrl) => {
  let data = JSON.stringify({
    token: JSON.parse(localStorage.getItem("refreshToken")),
  });
  // let data = JSON.parse(localStorage.getItem("refreshToken"));
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_BASH_URL + apiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("refreshToken")),
    },
    data: data,
  };
  const response = (await api.request(config)).data;
  const authToken = response.authToken;
  if (authToken) {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    Cookies.set("token", authToken.token, {
      secure: true,
    });
    Cookies.set("refreshToken", authToken.refreshToken, {
      secure: true,
    });
  }
  return response.authToken;
};

export const removeAllTokenAndCookiesThenLogOut = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  localStorage.setItem("isAuthenticated", JSON.stringify(false));
  window.location.href = "/";
};

export const axiosPost = async (apiUrl, body) => {
  let data = JSON.stringify(body);
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_BASH_URL + apiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data,
  };
  return await api.request(config);
};

export const axiosGet = async (apiUrl) => {
  console.log(Cookies.get("token"));
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_BASH_URL + apiUrl,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return await api.request(config);
};
