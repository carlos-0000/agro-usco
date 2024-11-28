'use client';

import React, { useState, useEffect } from 'react';
import { Container, Loader, Alert } from '@mantine/core';
import ProductGallery from '@/components/tabs-content/ProductGallery';
import { api } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  badge?: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const CategoryContent: React.FC<{ selectedCategory: number }> = ({ selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>('Todas');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = selectedCategory === 0
            ? '/products' // Endpoint para obtener todos los productos
            : `/products/${selectedCategory}`; // Endpoint para obtener productos por categoría
        console.log('endpoint', endpoint);

        const { data } = await api.get(endpoint);

        if (!data.products || data.products.length === 0) {
            throw new Error('No se encontraron productos para esta categoría');
        } // Si tu API devuelve un array vacío

        setProducts(data.products); // Suponiendo que la respuesta tiene un array de productos
        setCategoryName(
            selectedCategory === 0
                ? 'Todas'
                : data.categoryName || 'Categoría desconocida' // Si tu API devuelve el nombre de la categoría
        );
      } catch (err: any) {
        setError(err.message || 'Ocurrió un error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) {
    return (
        <Container>
          <Loader />
          <p>Cargando productos...</p>
        </Container>
    );
  }

  if (error) {
    return (
        <Container>
          <Alert color="red">{error}</Alert>
        </Container>
    );
  }

  return (
      <Container>
        <h2>{categoryName}</h2>
        <ProductGallery products={products} />
      </Container>
  );
};

export default CategoryContent;
