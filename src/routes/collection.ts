import express from 'express';

const router = express.Router();

// import controllers
import { getCollections, getCollectionById, getCollectionWithSales } from '../controllers/collectionController';

router.route('/collections').get(getCollections);
router.route('/collections/:address').get(getCollectionById);
router.route('/collections/:address/sale').get(getCollectionWithSales);

export { router as collectionRouter };