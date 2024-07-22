import express from 'express';

const router = express.Router();

// import controllers
import { getSales, getSaleById, getSaleWithCollection } from '../controllers/saleController';

router.route('/sales').get(getSales);
router.route('/sales/:id').get(getSaleById);
router.route('/sales/:id/collection').get(getSaleWithCollection);

export { router as saleRouter };