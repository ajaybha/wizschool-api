import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { equal } from 'assert';



const prisma = new PrismaClient();

const getAssets = async (req: Request, res: Response, next: any) => {
    try {
        if(req.query.minted) {
            const mintedFlag:Boolean = Boolean(req.query.minted === 'true');
            if(mintedFlag) {
                const mintedAssets = await prisma.asset.findMany({
                    where: {
                        minted: true,
                    }
                });
                return res.status(200).json(mintedAssets);
            }
            else {
                const unmintedAssets = await prisma.asset.findMany({
                    where: {
                        minted: false,
                    }
                });
                return res.status(200).json(unmintedAssets);
            }
        }
        else {
            const allAssets = await prisma.asset.findMany();
            return res.status(200).json({allAssets});
        }
    } catch (error: any) {
        next(error);
    }
};
const getAssetsByAddress = async (req: Request, res: Response, next: any) => {
    try {
        const myAssets = await prisma.asset.findMany({
            where: {
                ownerAddress: req.params.address,
            },
        });
        return res.status(200).json({myAssets});
    } catch (error: any) {
        next(error);
    }
};
const getAssetById = async (req: Request, res: Response, next: any) => {
    try {
        const singleAsset = await prisma.asset.findUnique({
            where: {
                tokenId: req.params.tokenId,
            },
        });
        return res.status(200).json({singleAsset});
    } catch (error: any) {
        next(error);
    }
};

const getAssetWithUser = async (req: Request, res: Response, next: any) => {
    try {
        const singleAsset = await prisma.asset.findUnique({
            where: {
                tokenId: req.params.tokenId,
            },
            include:{
                owner: {
                    select: {
                        name:true,
                        address:true,
                        walletType: true
                    }
                }
            }
        });
        return res.status(200).json({singleAsset});
    } catch (error: any) {
        next(error);
    }
};
export { getAssets, getAssetsByAddress, getAssetById, getAssetWithUser };
