import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/farms/:id - Obtener una finca por ID
export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = params;

        const farm = await prisma.farm.findUnique({
            where: { id: parseInt(id) },
            include: {
                municipality: {
                    include: {
                        department: true,
                    },
                },
                owner: true,
            },
        });

        if (!farm) {
            return NextResponse.json(
                { message: 'Finca no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json({ farm });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al obtener la finca' },
            { status: 500 }
        );
    }
};

// PATCH /api/farms/:id - Actualizar una finca existente
export const PATCH = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = params;
        const body = await req.json();
        const { name, municipalityId, address } = body;

        const farm = await prisma.farm.update({
            where: { id: parseInt(id) },
            data: {
                name,
                municipalityId,
                address,
            },
        });

        return NextResponse.json({ farm });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al actualizar la finca' },
            { status: 500 }
        );
    }
};

// DELETE /api/farms/:id - Eliminar una finca
export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = params;

        await prisma.farm.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json(
            { message: 'Finca eliminada exitosamente' },
            { status: 204 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Ocurrió un error al eliminar la finca' },
            { status: 500 }
        );
    }
};
