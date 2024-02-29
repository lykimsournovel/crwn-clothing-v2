import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { setCategories } from "./category.reducer";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  console.log("catagories fetch asunce");
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(setCategories(categoriesArray));
    // yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  // console.log(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
  // yield takeLatest(
  //   CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
  //   fetchCategoriesAsync
  // );
  yield takeLatest("categories/fetchCategoriesStart", fetchCategoriesAsync);
}

export function* categoriesSaga() {
  console.log("categorie");
  yield all([call(onFetchCategories)]);
}
