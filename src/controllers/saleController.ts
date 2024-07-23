
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getSales = async (req: Request, res: Response, next: any) => {
    try {
        const allSales = await prisma.sale.findMany();
        return res.status(200).json({allSales});
    } catch (error: any) {
        next(error);
    }
};

const getSaleById = async (req: Request, res: Response, next: any) => {
    try {
        const singleSale = await prisma.sale.findUnique({
            where: {
                id: req.params.id,
            },
            // only selective fields from qualified primary sale records
            select: {
                id: true,
                startTime: true,
                endTime: true,
                saleType: true,
                mintSupply: true,
                price: true,
                perWalletLimit: true,
                active: true,
                collectionAddress: true
            }
        });
        return res.status(200).json({singleSale});
    } catch (error: any) {
        next(error);
    }
};

const getSaleWithCollection = async (req:Request, res: Response, next:any) => {
    try {
        const singleSale = await prisma.sale.findUnique({
            where: {
                id: req.params.id,
            },
            include: {
                collection: {
                    select: {
                        id: true,
                        address:true,
                        type: true,
                        metadata: true
                    }
                }
            }
            
        });
        return res.status(200).json({singleSale});
    } catch (error: any) {
        next(error);
    }
};
export {getSales, getSaleById, getSaleWithCollection};