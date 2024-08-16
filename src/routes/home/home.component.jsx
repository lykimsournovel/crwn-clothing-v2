import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";
import { useEffect } from "react";
import { axiosGet } from "../../utils/axios/axios.utils";

const Home = () => {
  const getProducts = async () => {
    const response = await axiosGet("api/products");
    console.log(response);
  };
  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      // console.log(error);
    }
  }, []);
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
