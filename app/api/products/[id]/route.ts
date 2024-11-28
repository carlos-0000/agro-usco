
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/:id - Obtener un producto por ID
export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = params;

        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
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

        if (!product) {
            return NextResponse.json(
                { message: 'Producto no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json({ product });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener el producto' },
            { status: 500 }
        );
    }
};

// PATCH /api/products/:id - Actualizar un producto existente
export const PATCH = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = params;
        const body = await req.json();
        const {
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

        // Actualizar el producto
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                categoryId,
                cultivationTypeId,
                description,
                unitOfMeasureId,
                stockAvailable,
                availableDate: new Date(availableDate),
                // Nota: Actualizar priceRanges y productPhotos puede requerir lógica adicional
            },
        });

        return NextResponse.json({ product });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al actualizar el producto' },
            { status: 500 }
        );
    }
};

// DELETE /api/products/:id - Eliminar un producto
export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = params;

        await prisma.product.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json(
            { message: 'Producto eliminado exitosamente' },
            { status: 204 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al eliminar el producto' },
            { status: 500 }
        );
    }
};
