import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products - Obtener todos los productos
export const GET = async (req: NextRequest) => {
    try {
        const products = await prisma.product.findMany({
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
        return NextResponse.json({ products });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener los productos' },
            { status: 500 }
        );
    }
};

// POST /api/products - Crear un nuevo producto
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const {
            sellerId,
            farmId,
            name,
            categoryId,
            cultivationTypeId,
            description,
            unitOfMeasureId,
            stockAvailable,
            availableDate,
            priceRanges,
            productPhotos,
        } = body;

        // Verificar si la finca existe
        const farm = await prisma.farm.findUnique({
            where: { id: farmId },
        });

        if (!farm) {
            return NextResponse.json(
                { message: 'La finca no existe' },
                { status: 400 }
            );
        }

        // Crear el producto
        const product = await prisma.product.create({
            data: {
                sellerId,
                farmId,
                name,
                categoryId,
                cultivationTypeId,
                description,
                unitOfMeasureId,
                stockAvailable,
                availableDate: new Date(availableDate),
                priceRanges: {
                    create: priceRanges,
                },
                productPhotos: {
                    create: productPhotos,
                },
            },
        });

        return NextResponse.json({ product }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al crear el producto' },
            { status: 500 }
        );
    }
};
