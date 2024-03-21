import { takeLatest, put, all, call } from "redux-saga/effects";
import { axiosGet, axiosPost } from "../../utils/axios/axios.utils";
import Cookies from "js-cookie";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import { signUp, login, checkout } from "./user1.reducer";

export function* onSignUp({ payload: { email, password, displayName } }) {
  try {
    const body = {
      email: email,
      role: "admin",
      password: password,
      confirmPassword: password,
    };
    console.log(body);
    const user = yield axiosPost("users/register", body);
    Cookies.set("token", user.data.authToken.token, {
      expires: 365,
      secure: true,
    });
    Cookies.set("refreshToken", user.data.authToken.refreshToken, {
      expires: 365,
      secure: true,
    });
    yield put(signUp(user.data.user));
  } catch (error) {
    console.log(error);
    alert(error.response.data.message[0].msg);
  }
}

export function* onLogin({ payload: { email, password } }) {
  try {
    const body = {
      email: email,
      password: password,
    };
    const user = yield axiosPost("users/login", body);
    console.log(user.data.authToken);
    Cookies.set("token", user.data.authToken.token, {
      secure: true,
      expires: 365,
    });
    Cookies.set("refreshToken", user.data.authToken.refreshToken, {
      secure: true,
      expires: 365,
    });
    yield put(login(user.data.user));
  } catch (error) {
    alert(error.response.data.message);
  }
}

export function* checkoutStart() {
  try {
    const paymentSession = yield axiosGet("api/products/checkout");
    console.log(paymentSession);
    yield put(checkout(paymentSession.data.sessionId));
  } catch (error) {
    alert(error.response.data.error);
  }
}

export function* onSignUpStart() {
  yield takeLatest("user1/userSignUpStart", onSignUp);
}

export function* onLoginStart() {
  yield takeLatest("user1/loginStart", onLogin);
}

export function* onCheckout() {
  yield takeLatest("user1/checkoutStart", checkoutStart);
}

export function* user1Sagas() {
  yield all([call(onSignUpStart), call(onLoginStart), call(onCheckout)]);
}
