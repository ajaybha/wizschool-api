import { Request, Response } from 'express';

const getAssets = async (req: Request, res: Response, next: any) => {
    try {
        return res.status(200).json('get-all-assets');
    } catch (error: any) {
        next(error);
    }
};

export { getAssets };
