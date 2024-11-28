import React from 'react';
import { SimpleGrid } from '@mantine/core';
import ProductCard from './ProductCard';

interface Product {
    id: number;
    // ... otros campos necesarios
}

interface ProductGalleryProps {
    products: Product[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
    return (
        <SimpleGrid
            type="container"
            cols={3}
            spacing={{ base: 10, '300px': 'xl' }}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </SimpleGrid>
    );
};

export default ProductGallery;
