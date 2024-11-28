import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/cultivation-types - Obtener todos los tipos de cultivo
export const GET = async (req: NextRequest) => {
    try {
        const cultivationTypes = await prisma.cultivationType.findMany();
        return NextResponse.json({ cultivationTypes });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener los tipos de cultivo' },
            { status: 500 }
        );
    }
};
