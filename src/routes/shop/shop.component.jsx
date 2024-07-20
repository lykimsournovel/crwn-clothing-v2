import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
// import { fetchCategoriesStart } from '../../store/categories/category.action';
import { fetchCategoriesStart } from "../../store/categories/category.reducer";
import { fetchProductRequest } from "../../store/product/productSlice";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
    dispatch(fetchProductRequest());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
