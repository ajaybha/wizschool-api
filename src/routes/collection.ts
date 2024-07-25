import express from 'express';

const router = express.Router();

// import controllers
import { getCollections, getCollectionById, getCollectionMetadataById, getCollectionWithSales, getCollectionWithAssets } from '../controllers/collectionController';

router.route('/collections').get(getCollections);
router.route('/collection/:address').get(getCollectionById);
router.route('/collection/:address/metadata').get(getCollectionMetadataById);
router.route('/collection/:address/sales').get(getCollectionWithSales);
router.route('/collection/:address/assets').get(getCollectionWithAssets);


export { router as collectionRouter };