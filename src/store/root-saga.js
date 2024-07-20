import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";
import { user1Sagas } from "./user/user1.saga";
import { productSaga } from "./product/productSaga";
export function* rootSaga() {
  yield all([
    call(categoriesSaga),
    call(userSagas),
    call(user1Sagas),
    call(productSaga),
  ]);
}
