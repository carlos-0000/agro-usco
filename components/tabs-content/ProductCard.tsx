// components/ProductCard.tsx

import React from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    badge?: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={product.image} height={160} alt={product.name} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text fw={500}>{product.name}</Text>
        {product.badge && <Badge color="pink">{product.badge}</Badge>}
      </Group>

      <Text size="sm" color="dimmed">
        {product.description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Comprar por ${product.price}
      </Button>
    </Card>
  );
};

export default ProductCard;
