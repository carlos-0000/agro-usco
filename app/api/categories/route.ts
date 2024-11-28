import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/categories - Obtener todas las categorías
export const GET = async (req: NextRequest) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                subcategories: true,
            },
        });
        return NextResponse.json({ categories });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener las categorías' },
            { status: 500 }
        );
    }
};

// POST /api/categories - Crear una nueva categoría
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { name, parentId } = body;

        const category = await prisma.category.create({
            data: {
                name,
                parentId,
            },
        });

        return NextResponse.json({ category }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al crear la categoría' },
            { status: 500 }
        );
    }
};
