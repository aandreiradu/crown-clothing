import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  setCategories,
  fetchCategoriesAsync,
  fetchCategoriesStart
} from "../../store/categories/categories.actions";

import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";

import "./shop.scss";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // without redux
    // const getCategoriesMap = async () => {
    //   // const categoryMap = await getCategoriesAndDocuments();
    //   const categoryArray = await getCategoriesAndDocuments();

    //   dispatch(setCategories(categoryArray));
    // };
    // getCategoriesMap();

    // with thunk
    // dispatch(fetchCategoriesAsync());


    // with saga
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
