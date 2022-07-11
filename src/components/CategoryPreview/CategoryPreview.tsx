import React,{FC} from "react";
import ProductCard from "../product-card/ProductCard";

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./CategoryPreview.styles";

import { CategoryItem } from "../../store/categories/categories.types";

type CategoryPreviewProps = {
  title: string,
  products: CategoryItem[]
}

const CategoryPreview : FC<CategoryPreviewProps> = (props) => {
  const { title, products } = props;

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          ?.filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
