// components/ProductGallery.tsx

import React from 'react';
import { SimpleGrid } from '@mantine/core';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  badge?: string;
}

interface ProductGalleryProps {
  products: Product[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
  return (
    <SimpleGrid
      cols={3}
      spacing="lg"
      breakpoints={[
        { maxWidth: 'md', cols: 2, spacing: 'md' },
        { maxWidth: 'sm', cols: 1, spacing: 'sm' },
      ]}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductGallery;
