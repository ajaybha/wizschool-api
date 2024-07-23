import express from 'express';

const router = express.Router();

// import controllers
import { getAssets, getAssetsByAddress, getAssetById, getAssetWithUser } from '../controllers/assetController';

router.route('/assets').get(getAssets);
router.route('/assets/:address').get(getAssetsByAddress);
router.route('/asset/:tokenId').get(getAssetById);
router.route('/asset/:tokenId/user').get(getAssetWithUser);

export { router as assetRouter };
