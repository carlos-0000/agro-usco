import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[categoryId] - Obtener productos por categoría
export const GET = async (
    req: NextRequest,
    { params }: { params: { categoryId: string } }
) => {
    try {
        const { categoryId } = params;

        // Validar que `categoryId` sea un número válido
        const categoryIdNumber = parseInt(categoryId);
        if (isNaN(categoryIdNumber)) {
            return NextResponse.json(
                { message: 'El ID de la categoría debe ser un número válido' },
                { status: 400 }
            );
        }
        console.log('categoryIdNumber', categoryIdNumber);

        // Obtener los productos que pertenecen a la categoría
        const products = await prisma.product.findMany({
            where: { categoryId: categoryIdNumber },
            include: {
                seller: true,
                farm: true,
                category: true,
                cultivationType: true,
                unitOfMeasure: true,
                priceRanges: true,
                productPhotos: true,
            },
        });

        if (!products || products.length === 0) {
            return NextResponse.json(
                { message: 'No se encontraron productos para esta categoría' },
                { status: 404 }
            );
        }

        return NextResponse.json({ products });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener los productos por categoría' },
            { status: 500 }
        );
    }
};
