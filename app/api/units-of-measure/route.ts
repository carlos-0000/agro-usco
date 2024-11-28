import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/units-of-measure - Obtener todas las unidades de medida
export const GET = async (req: NextRequest) => {
    try {
        const unitsOfMeasure = await prisma.unitOfMeasure.findMany();
        return NextResponse.json({ unitsOfMeasure });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener las unidades de medida' },
            { status: 500 }
        );
    }
};
