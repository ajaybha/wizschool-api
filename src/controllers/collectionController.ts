import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();

const getCollections = async (req: Request, res: Response, next: any) => {
    try {
        const allCollections = await prisma.collection.findMany();
        return res.status(200).json({allCollections});
    } catch (error: any) {
        next(error);
    }
};

const getCollectionById = async (req: Request, res: Response, next: any) => {
    try {
        const singleCollection = await prisma.collection.findUnique({
            where: {
                address: req.params.address,
            },
        });
        return res.status(200).json({singleCollection});
    } catch (error: any) {
        next(error);
    }
};

const getCollectionWithSales = async (req:Request, res: Response, next: any) => {
    try {
        const currentTime = new Date();
        const collectionWithSales = await prisma.collection.findUnique({
            where: {
                address: req.params.address,
            },
            include: {
                primarySale: {
                    // condition for slicing the related primary sale records
                    where: {
                        active: true, 
                        startTime: {
                            lt: currentTime,
                        },
                        endTime: {
                            gt: currentTime
                        },   
                    },
                    orderBy: {
                        startTime: 'asc',
                    },
                    // only selective fields from qualified primary sale records
                    select: {
                        startTime: true,
                        endTime: true,
                        mintSupply: true,
                        price: true,
                        perWalletLimit: true
                    }
                }
            }
        });
        return res.status(200).json({collectionWithSales});
    } catch (error: any) {
        next(error);
    }
};

export { getCollections, getCollectionById, getCollectionWithSales };
