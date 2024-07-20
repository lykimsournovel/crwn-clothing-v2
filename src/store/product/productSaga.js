// features/product/productSaga.js
import { call, put, takeLatest, all } from "redux-saga/effects";
import { axiosGet } from "../../utils/axios/axios.utils";
import axios from "axios";
import {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
} from "./productSlice";

function* fetchProductSaga() {
  try {
    const response = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/users/1"
    );

    console.log(response.data);
    yield put(fetchProductSuccess(response.data));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}

export function* onFetchProductStart() {
  yield takeLatest(fetchProductRequest.type, fetchProductSaga);
}

export function* productSaga() {
  yield all([call(onFetchProductStart)]);
}
