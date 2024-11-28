import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/locations/municipalities - Obtener todos los municipios
export const GET = async (req: NextRequest) => {
    try {
        const municipalities = await prisma.municipality.findMany({
            include: {
                department: true,
            },
        });
        return NextResponse.json({ municipalities });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener los municipios' },
            { status: 500 }
        );
    }
};
