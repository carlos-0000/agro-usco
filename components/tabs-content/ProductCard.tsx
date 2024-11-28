'use client';

import React, { useState, useEffect, useContext } from 'react';
import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Stack,
    Modal,
    NumberInput,
    Table,
    Divider,
} from '@mantine/core';


import { useRouter } from 'next/navigation';
import { IconShoppingCart } from '@tabler/icons-react';
import { CartContext } from '@/contexts/CartContext';
import { Carousel } from '@mantine/carousel';

interface PriceRange {
    id: number;
    minQuantity: number;
    unitPrice: string;
    totalPrice: string;
}

interface ProductPhoto {
    id: number;
    url: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    stockAvailable: number;
    category: {
        id: number;
        name: string;
        parentId?: number;
    };
    cultivationType: {
        id: number;
        name: string;
    };
    unitOfMeasure: {
        id: number;
        name: string;
        abbreviation: string;
    };
    priceRanges: PriceRange[];
    productPhotos: ProductPhoto[];
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    const { cartItems, addToCart } = useContext(CartContext)!;

    const [modalOpened, setModalOpened] = useState(false);
    const [quantity, setQuantity] = useState<number>(0);
    const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);

    const handleCardClick = () => {
        router.push(`/product/${product.id}`);
    };

    const handleBuyClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setModalOpened(true);
    };

    // Ordenar los rangos de precios por minQuantity en orden ascendente
    const sortedPriceRanges = product.priceRanges.sort((a, b) => a.minQuantity - b.minQuantity);

    // Obtener la cantidad mínima requerida
    const minQuantity = sortedPriceRanges[0]?.minQuantity || 1;

    // Función para determinar el rango de precios aplicable según la cantidad
    const getPriceRange = (quantity: number): PriceRange | null => {
        // Ordenar los rangos de precios por minQuantity en orden descendente
        const rangesDesc = product.priceRanges.sort((a, b) => b.minQuantity - a.minQuantity);
        // Encontrar el primer rango donde minQuantity <= quantity
        return rangesDesc.find((range) => quantity >= range.minQuantity) || null;
    };

    useEffect(() => {
        if (quantity >= minQuantity) {
            const applicableRange = getPriceRange(quantity);
            setSelectedPriceRange(applicableRange);
        } else {
            setSelectedPriceRange(null);
        }
    }, [quantity, minQuantity]);

    const handleAddToCart = () => {
        if (quantity < minQuantity) {
            alert(`La cantidad mínima es ${minQuantity}.`);
            return;
        }

        if (quantity > product.stockAvailable) {
            alert('La cantidad solicitada supera el stock disponible.');
            return;
        }

        if (!selectedPriceRange) {
            alert('No hay un rango de precios aplicable para la cantidad seleccionada.');
            return;
        }

        const totalPrice = quantity * parseFloat(selectedPriceRange.unitPrice);

        const newCartItem = {
            productId: product.id,
            productName: product.name,
            quantity: quantity,
            unitPrice: parseFloat(selectedPriceRange.unitPrice),
            totalPrice: totalPrice,
            unitOfMeasure: product.unitOfMeasure.abbreviation,
        };

        addToCart(newCartItem);
        // Resetear cantidad y rango de precio seleccionado
        setQuantity(minQuantity);
        setSelectedPriceRange(getPriceRange(minQuantity));
    };

    const handleProceedToCheckout = () => {
        // Lógica para proceder a la compra (en desarrollo)
        alert('Procediendo a la compra. Funcionalidad en desarrollo.');
        // Cerrar el modal
        setModalOpened(false);
    };

    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                onClick={handleCardClick}
                style={{ cursor: 'pointer' }}
            >
                {/* Sección de imágenes */}
                <Card.Section>
                    {product.productPhotos.length > 1 ? (
                        <Carousel withIndicators loop>
                            {product.productPhotos.map((photo) => (
                                <Image key={photo.id} src={photo.url} height={160} alt={product.name} />
                            ))}
                        </Carousel>
                    ) : (
                        <Image
                            src={product.productPhotos[0]?.url || '/images/placeholder.png'}
                            height={160}
                            alt={product.name}
                        />
                    )}
                </Card.Section>

                <Stack spacing="xs" mt="md">
                    <Group position="apart">
                        <Text weight={500}>{product.name}</Text>
                        <Badge color="green" variant="light">
                            {product.category.name}
                        </Badge>
                    </Group>

                    <Text size="sm" color="dimmed" lineClamp={2}>
                        {product.description}
                    </Text>

                    {/* Mostrar solo el primer rango de precios en la tarjeta */}
                    <Text size="sm" mt="sm">
                        <strong>Rango de Precio:</strong>
                    </Text>
                    {sortedPriceRanges.slice(0, 1).map((range) => (
                        <Text key={range.id} size="sm" color="dimmed">
                            Desde {range.minQuantity} unidades: ${range.unitPrice} por{' '}
                            {product.unitOfMeasure.abbreviation}
                        </Text>
                    ))}
                </Stack>

                <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    leftSection={<IconShoppingCart size={16} />}
                    onClick={handleBuyClick}
                >
                    Comprar
                </Button>
            </Card>

            {/* Modal para agregar al carrito */}
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={`Agregar "${product.name}" al Carrito`}
                size="lg"
            >
                <Stack spacing="md">
                    <Text>Selecciona la cantidad para agregar al carrito.</Text>

                    {/* Mostrar los rangos de precios */}
                    <Table>
                        <thead>
                        <tr>
                            <th>Cantidad Mínima</th>
                            <th>Precio Unitario</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedPriceRanges.map((range) => (
                            <tr key={range.id}>
                                <td>{range.minQuantity}</td>
                                <td>${parseFloat(range.unitPrice).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <NumberInput
                        label={`Cantidad (${product.unitOfMeasure.abbreviation})`}
                        placeholder="Ingresa la cantidad"
                        value={quantity}
                        onChange={(value) => setQuantity(value || minQuantity)}
                        min={minQuantity}
                        max={product.stockAvailable}
                        withAsterisk
                    />

                    {selectedPriceRange && (
                        <Stack spacing="xs">
                            <Text>
                                <strong>Precio Unitario:</strong> ${selectedPriceRange.unitPrice}
                            </Text>
                            <Text>
                                <strong>Precio Total:</strong> $
                                {quantity && selectedPriceRange
                                    ? (quantity * parseFloat(selectedPriceRange.unitPrice)).toFixed(2)
                                    : '0.00'}
                            </Text>
                        </Stack>
                    )}

                    <Group position="right" mt="md">
                        <Button onClick={handleAddToCart}>Agregar</Button>
                    </Group>

                    {/* Mostrar los ítems en el carrito */}
                    {cartItems.length > 0 && (
                        <>
                            <Divider my="sm" />
                            <Text weight={500}>Carrito</Text>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Precio Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>
                                            {item.quantity} {item.unitOfMeasure}
                                        </td>
                                        <td>${item.unitPrice.toFixed(2)}</td>
                                        <td>${item.totalPrice.toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>

                            <Group position="apart" mt="md">
                                <Button variant="default" onClick={() => setModalOpened(false)}>
                                    Seguir comprando
                                </Button>
                                <Button onClick={handleProceedToCheckout}>Comprar</Button>
                            </Group>
                        </>
                    )}
                </Stack>
            </Modal>
        </>
    );
};

export default ProductCard;
