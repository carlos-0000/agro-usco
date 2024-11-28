import { useRouter } from 'next/navigation';
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import { Text, Image, Badge, Stack, Button, Group } from '@mantine/core';

interface ProductPageProps {
    product: any; // Puedes tipar esto según tu modelo
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    const router = useRouter();

    const handleBuyClick = () => {
        // Lógica para agregar al carrito
        alert('Producto agregado al carrito');
    };

    return (
        <div>
            <Button variant="subtle" onClick={() => router.back()}>
                Volver
            </Button>

            <Group align="start" spacing="xl" mt="md">
                <Image
                    src={product.productPhotos[0]?.url || '/images/placeholder.png'}
                    width={400}
                    alt={product.name}
                />

                <Stack spacing="md">
                    <Text size="xl" weight={700}>
                        {product.name}
                    </Text>

                    <Badge color="green" variant="light">
                        {product.category.name}
                    </Badge>

                    <Text size="md">
                        <strong>Descripción:</strong> {product.description}
                    </Text>

                    <Text size="md">
                        <strong>Tipo de Cultivo:</strong> {product.cultivationType.name}
                    </Text>

                    <Text size="md">
                        <strong>Unidad de Medida:</strong> {product.unitOfMeasure.name}
                    </Text>

                    <Text size="md">
                        <strong>Stock Disponible:</strong> {product.stockAvailable}
                    </Text>

                    <Text size="md">
                        <strong>Rangos de Precios:</strong>
                    </Text>
                    {product.priceRanges.map((range: any) => (
                        <Text key={range.id} size="md" color="dimmed">
                            Desde {range.minQuantity} unidades: ${range.unitPrice} por unidad
                        </Text>
                    ))}

                    <Button variant="filled" color="blue" onClick={handleBuyClick}>
                        Comprar
                    </Button>
                </Stack>
            </Group>
        </div>
    );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    // Obtener el producto desde la base de datos
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            category: true,
            cultivationType: true,
            unitOfMeasure: true,
            priceRanges: true,
            productPhotos: true,
        },
    });

    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
};
