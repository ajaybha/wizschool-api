import { Request, response, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { request } from 'http';

const prisma = new PrismaClient();

/***************************************
 * Get 
 **************************************/
const getUsers = async (req: Request, res: Response, next: any) => {
    try {
        const allUsers = await prisma.user.findMany();
        return res.status(200).json({allUsers});
    } catch (error: any) {
        next(error);
    }
};

const getUserByAddress = async (req: Request, res: Response, next: any) => {
    try {
        const singleUser = await prisma.user.findUnique({
            where: {
                address: req.params.address,
            },
        });
        return res.status(200).json({singleUser});
    } catch (error: any) {
        next(error);
    }
};

const getUserWithAssets = async (req:Request, res: Response, next: any) => {
    try {        
        const userWithAssets = await prisma.user.findUnique({
            where: {
                address: req.params.address,
            },
            include: {
                assets: {
                    // condition for slicing the related primary sale records
                    where: {
                        ownerAddress: req.params.address  
                    },
                    orderBy: {
                        updatedAt: 'desc',
                    },
                    // only selective fields from qualified primary sale records
                    select: {
                        tokenId: true,
                        minted: true,
                        ownerAddress: true,
                        collectionAddress: true,
                        name:true,
                        description:true,
                        image: true,
                        external_url:true,
                        attributes:true
                    }
                }
            }
        });
        return res.status(200).json({userWithAssets});
    } catch (error: any) {
        next(error);
    }
};

/***************************************
 * Create & Update
 **************************************/
const createUser = async (req:Request, res: Response, next: any ) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                ...req.body
            }
        });
        return res.status(200).json(newUser);
    }
    catch(error: any) {
        next(error);
    }
};
export { getUsers, getUserByAddress, getUserWithAssets, createUser};
