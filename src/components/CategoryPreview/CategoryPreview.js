import React from 'react'
import ProductCard from '../product-card/ProductCard';
import {Link} from 'react-router-dom';

import {CategoryPreviewContainer,Title,Preview} from  './CategoryPreview.styles'

const CategoryPreview = (props) => {
    const {title,products} = props;
    
  return (
    <CategoryPreviewContainer>
        <h2>
            <Title to={title}>{title.toUpperCase()}</Title>
        </h2>
        <Preview>
            {
                products?.filter((_,index) => index < 4)
                .map((product) =>(
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview