// components/PlazaContent.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import ProductGallery from '@/components/tabs-content/ProductGallery';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  badge?: string;
}

const PlazaContent = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = [
        {
          id: 1,
          name: 'Manzanas Orgánicas',
          image: 'https://areajugones.sport.es/wp-content/uploads/2023/04/rowlet.png.webp',
          description: 'Manzanas frescas y orgánicas cultivadas localmente.',
          price: 2.5,
          badge: 'Nuevo',
        },
        {
          id: 2,
          name: 'Tomates Rojos',
          image: 'https://areajugones.sport.es/wp-content/uploads/2023/04/rowlet.png.webp',
          description: 'Tomates maduros perfectos para ensaladas.',
          price: 1.8,
        },
        // Agrega más productos según sea necesario
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <ProductGallery products={products} />
    </Container>
  );
};

export default PlazaContent;
