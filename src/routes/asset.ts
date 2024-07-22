import express from 'express';

const router = express.Router();

// import controllers
import { getAssets } from '../controllers/assetController';

router.route('/assets').get(getAssets);

export { router as assetRouter };
