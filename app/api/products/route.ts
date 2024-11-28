import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const body = await req.json();

        const nationalId = body.nationalId;

        const user = await prisma.user.findUnique({
            where: { nationalId },
        });

        if (!user) {
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
        }

        const sellerId = user.id;

        const {
            farmId,
            newFarm,
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

        let finalFarmId;

        if (newFarm) {
            // Crear nueva finca
            const createdFarm = await prisma.farm.create({
                data: {
                    ownerId: sellerId,
                    name: newFarm.name,
                    municipalityId: newFarm.municipalityId,
                    address: newFarm.address,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            finalFarmId = createdFarm.id;
        } else if (farmId) {
            // Verificar si la finca existe y pertenece al vendedor
            const farm = await prisma.farm.findUnique({
                where: { id: farmId },
            });

            if (!farm) {
                return NextResponse.json({ message: 'La finca no existe' }, { status: 400 });
            }

            if (farm.ownerId !== sellerId) {
                return NextResponse.json(
                    { message: 'No autorizado para usar esta finca' },
                    { status: 403 }
                );
            }

            finalFarmId = farmId;
        } else {
            return NextResponse.json(
                { message: 'Debe proporcionar un farmId o newFarm' },
                { status: 400 }
            );
        }

        // Crear el producto
        const product = await prisma.product.create({
            data: {
                sellerId,
                farmId: finalFarmId,
                name,
                categoryId,
                cultivationTypeId,
                description,
                unitOfMeasureId,
                stockAvailable,
                availableDate: new Date(availableDate),
                createdAt: new Date(),
                updatedAt: new Date(),
                priceRanges: {
                    create: priceRanges.map((range) => ({
                        minQuantity: range.minQuantity,
                        unitPrice: range.unitPrice,
                        totalPrice: range.totalPrice,
                    })),
                },
                productPhotos: {
                    create: productPhotos.map((photo) => ({
                        url: photo.url,
                        photoOrder: photo.photoOrder,
                        createdAt: new Date(),
                    })),
                },
            },
            include: {
                priceRanges: true,
                productPhotos: true,
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
