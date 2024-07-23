import express from 'express';

const router = express.Router();

// import controllers
import { getCollections, getCollectionById, getCollectionWithSales, getCollectionWithAssets } from '../controllers/collectionController';

router.route('/collections').get(getCollections);
router.route('/collections/:address').get(getCollectionById);
router.route('/collections/:address/sales').get(getCollectionWithSales);
router.route('/collections/:address/assets').get(getCollectionWithAssets);


export { router as collectionRouter };