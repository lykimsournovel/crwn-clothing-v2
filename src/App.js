import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/user.action";
// import { selectAuthenticated } from "./store/user/user.selector";
import { selectAuthenticated } from "./store/user/user1.selector";
import { axiosGet, axiosPost } from "./utils/axios/axios.utils";
import { combineSlices } from "@reduxjs/toolkit";
import { signout } from "./store/user/user1.reducer";

// const App = () => {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector(selectAuthenticated);
//   useEffect(() => {
//     dispatch(checkUserSession());
//   }, []);

//   if (isAuthenticated) {
//     return (
//       <Routes>
//         <Route path="/" element={<Navigation />}>
//           <Route index element={<Home />} />
//           <Route path="shop/*" element={<Shop />} />
//           <Route path="auth" element={<Authentication />} />
//           <Route path="checkout" element={<Checkout />} />
//         </Route>
//       </Routes>
//     );
//   } else {
//     return <Authentication />;
//   }
// };

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  const checkIfLogin = JSON.parse(localStorage.getItem("isAuthenticated"));
  if (!checkIfLogin) {
    console.log("logout");
    dispatch(signout());
  }

  useEffect(() => {}, []);

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          {/* <Route path="auth" element={<Authentication />} /> */}
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    );
  } else {
    return <Authentication />;
  }
};

export default App;
