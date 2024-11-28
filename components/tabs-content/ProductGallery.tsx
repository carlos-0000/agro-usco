// @ts-nocheck
import React from 'react';
import ProductCard from './ProductCard';

interface Product {
    id: number;
    // ... otros campos necesarios
}

interface ProductGalleryProps {
    products: Product[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
    console.log('productsssss', products);
    return (
        <div
            style={{
                display: 'grid',
                gap: '48px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                padding: '20px',
                marginTop: '2rem',
            }}
        >
            {products.map((product) => (
                <div
                    key={product.id}
                    style={{
                        minWidth: '290px',
                        maxWidth: '290px',
                        margin: 'auto',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                    }}
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductGallery;
