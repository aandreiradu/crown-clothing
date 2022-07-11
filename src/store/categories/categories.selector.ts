import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoriesState } from "./categories.reducer";
import { CategoryItem } from "./categories.types";
import { CategoryMap } from "./categories.types";



const selectCategoryReducer = (state : RootState): CategoriesState => state.categories;


// declare memoized selector
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, categories) : CategoryMap => {
      const { title, items } = categories;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);


export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)