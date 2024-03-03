import { takeLatest, put, all, call } from "redux-saga/effects";
import { axiosPost } from "../../utils/axios/axios.utils";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import axios from "axios";
import { signUp } from "./user1.reducer";

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
    yield put(signUp(user.data.user));
  } catch (error) {
    console.log(error);
    alert(error.response.data.message[0].msg);
  }
}

export function* onSignUpStart() {
  console.log("tokenSignup");
  yield takeLatest("user1/userSignUpStart", onSignUp);
}

export function* user1Sagas() {
  console.log("user1111");
  yield all([call(onSignUpStart)]);
}
