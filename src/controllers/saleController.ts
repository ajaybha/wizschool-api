
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getSales = async (req: Request, res: Response, next: any) => {
    try {
        if(req.query.collection) {
            const collAddr:string =req.query.collection.toString();
            if(collAddr) {
                return res.status(200).json(
                    await prisma.sale.findMany({
                        where: {
                            collectionAddress: collAddr
                        }
                    })
                );
            }
        }
        return res.status(200).json(await prisma.sale.findMany());
    } catch (error: any) {
        next(error);
    }
};
/** get active sale by collection-address */
const getActiveSale = async (req: Request, res: Response, next: any) => {
    try {
        const currentTime = new Date();
        if(req.query.collection) {
            const collAddr:string =req.query.collection.toString();
            if(collAddr) {
                return res.status(200).json(
                    await prisma.sale.findFirst({
                        where: {
                            collectionAddress: collAddr,
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
                            saleType: true,
                            mintSupply: true,
                            price: true,
                            currencySymbol:true,
                            currencyDecimals:true,
                            perWalletLimit: true,
                            mintedCount: true,
                            active: true
                        }
                    })
                );
            }
        }
        return res.status(200).json(
            await prisma.sale.findFirst({
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
                    saleType: true,
                    mintSupply: true,
                    price: true,
                    currencySymbol:true,
                    currencyDecimals:true,
                    perWalletLimit: true,
                    mintedCount: true,
                    active: true
                }
            })
        );
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
                currencySymbol:true,
                currencyDecimals:true,
                perWalletLimit: true,
                mintedCount:true,
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
                        name:true,
                        description:true,
                        image: true,
                        external_link:true,
                    }
                }
            }
            
        });
        return res.status(200).json({singleSale});
    } catch (error: any) {
        next(error);
    }
};

/***************************************
 * Create & Update
 **************************************/
const updateSale = async (req:Request, res: Response, next: any ) => {
    try {
        const updatedSale = await prisma.sale.update({
            where: {
                id: req.params.id
            },
            data: {                
                mintedCount: {
                    increment: req.body.newlyMinted
                }
            }
        });
        return res.status(200).json(updatedSale);
    }
    catch(error: any) {
        next(error);
    }
};
export {getSales, getActiveSale, getSaleById, getSaleWithCollection, updateSale};