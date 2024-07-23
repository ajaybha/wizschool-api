import express from 'express';

const router = express.Router();

// import controllers
import { getSales, getSaleById, getSaleWithCollection } from '../controllers/saleController';

router.route('/sales').get(getSales);
router.route('/sale/:id').get(getSaleById);
router.route('/sale/:id/collection').get(getSaleWithCollection);

export { router as saleRouter };