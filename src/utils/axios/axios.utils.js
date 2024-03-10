import axios from "axios";
import Cookies from "js-cookie";
const api = axios.create({
  baseUrl: process.env.REACT_APP_BASH_URL,
});
// console.log(api);

api.interceptors.request.use(
  (config) => {
    console.log(config);
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
    if (error.response && error.response.status === 401) {
      // const newToken = await generateNewtoken();
      // localStorage.setItem("token", newToken);
      // return api.request(error.config);
    }
    console.log(error);
    return Promise.reject(error);
  }
);

const generateNewtoken = () => {};
export const axiosPost = async (apiUrl, body) => {
  let data = JSON.stringify(body);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_BASH_URL + apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return await api.request(config);
};

export const axiosGet = async (apiUrl) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_BASH_URL + apiUrl,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
  };

  return await api.request(config);
};
