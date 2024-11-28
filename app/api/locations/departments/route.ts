import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/locations/departments - Obtener todos los departamentos
export const GET = async (req: NextRequest) => {
    try {
        const departments = await prisma.department.findMany();
        return NextResponse.json({ departments });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener los departamentos' },
            { status: 500 }
        );
    }
};
