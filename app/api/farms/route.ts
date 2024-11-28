import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/farms - Obtener todas las fincas
export const GET = async (req: NextRequest) => {
    try {
        const farms = await prisma.farm.findMany({
            include: {
                municipality: {
                    include: {
                        department: true,
                    },
                },
                owner: true,
            },
        });
        return NextResponse.json({ farms });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener las fincas' },
            { status: 500 }
        );
    }
};

// POST /api/farms - Crear una nueva finca
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { ownerId, name, municipalityId, address } = body;

        // Verificar si la finca ya existe
        const existingFarm = await prisma.farm.findFirst({
            where: {
                ownerId,
                name,
            },
        });

        if (existingFarm) {
            return NextResponse.json(
                { message: 'La finca ya existe' },
                { status: 400 }
            );
        }

        const farm = await prisma.farm.create({
            data: {
                ownerId,
                name,
                municipalityId,
                address,
            },
        });

        return NextResponse.json({ farm }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al crear la finca' },
            { status: 500 }
        );
    }
};
