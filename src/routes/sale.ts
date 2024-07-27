import express from 'express';

const router = express.Router();

// import controllers
import { getSales, getActiveSale, getSaleById, getSaleWithCollection, updateSale } from '../controllers/saleController';

router.route('/sales').get(getSales);
// sale or sale?collection=<collection-address>
router.route('/sale').get(getActiveSale);
router.route('/sale/:id').get(getSaleById);
router.route('/sale/:id/collection').get(getSaleWithCollection);
// patch
router.route('/sale/:id').patch(updateSale);

export { router as saleRouter };